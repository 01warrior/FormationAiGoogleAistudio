import React, { useState, useEffect, useRef } from 'react';
import { pcmToBase64, playAudioChunk, resetAudioQueue } from './liveAudio';

export function Chat() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const startLive = async () => {
    try {
      setConnecting(true);
      setError(null);

      // We need standard HTTP/WS detection
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      const inputAudioCtx = new AudioContext({ sampleRate: 16000 });
      inputAudioCtxRef.current = inputAudioCtx;
      
      const outputAudioCtx = new AudioContext({ sampleRate: 24000 });
      outputAudioCtxRef.current = outputAudioCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const source = inputAudioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;
      
      const processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      
      source.connect(processor);
      processor.connect(inputAudioCtx.destination);

      processor.onaudioprocess = (e) => {
        if (ws.readyState === WebSocket.OPEN) {
          const base64 = pcmToBase64(e.inputBuffer.getChannelData(0));
          ws.send(JSON.stringify({ audio: base64 }));
        }
      };

      ws.onopen = () => {
        setConnected(true);
        setConnecting(false);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.audio) {
          playAudioChunk(outputAudioCtx, msg.audio);
        }
        if (msg.interrupted) {
          resetAudioQueue();
        }
      };

      ws.onerror = (e) => {
        console.error("WebSocket error", e);
        setError("Connection error. Ensure the backend server is running.");
        stopLive();
      };
      
      ws.onclose = () => {
        stopLive();
      };

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to start microphone or connect to server.");
      stopLive();
    }
  };

  const stopLive = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    resetAudioQueue();
    setConnected(false);
    setConnecting(false);
  };

  useEffect(() => {
    return () => {
      stopLive();
    };
  }, []);

  return (
    <main className="flex-grow w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-8 gap-8 pb-[100px] md:pb-8">
      <div className="text-center space-y-4">
        <h2 className="text-headline-md font-display-verb text-primary">Speak</h2>
        <p className="text-body-lg text-on-surface-variant max-w-md mx-auto">
          Practice your spoken English with VerbMaster. Tap the button and start speaking!
        </p>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-xl max-w-md w-full text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-6 mt-8">
        <button
          onClick={connected ? stopLive : startLive}
          disabled={connecting}
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            connected 
              ? 'bg-error text-on-error scale-110 animate-pulse border-4 border-error-container shadow-error/30' 
              : 'bg-primary text-on-primary hover:scale-105 border-4 border-primary-container shadow-primary/30'
          } ${connecting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span className="material-symbols-outlined text-[48px]" style={{fontVariationSettings: "'FILL' 1"}}>
            {connected ? 'stop' : (connecting ? 'hourglass_empty' : 'mic')}
          </span>
        </button>
        
        <div className="text-label-lg font-label-bold text-on-surface-variant h-8">
          {connecting ? 'Connecting...' : (connected ? 'VerbMaster is listening...' : 'Tap to speak')}
        </div>
      </div>
    </main>
  );
}
