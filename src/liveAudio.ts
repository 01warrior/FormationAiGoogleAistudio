export function pcmToBase64(pcmData: Float32Array): string {
  const buffer = new ArrayBuffer(pcmData.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < pcmData.length; i++) {
    let s = Math.max(-1, Math.min(1, pcmData[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

let nextStartTime = 0;
export function playAudioChunk(ctx: AudioContext, base64Audio: string) {
  const binaryString = atob(base64Audio);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const buffer = bytes.buffer;
  const audioData = new Int16Array(buffer);
  const float32Data = new Float32Array(audioData.length);
  for (let i = 0; i < audioData.length; i++) {
    float32Data[i] = audioData[i] / 32768.0;
  }

  const audioBuffer = ctx.createBuffer(1, float32Data.length, 24000);
  audioBuffer.getChannelData(0).set(float32Data);

  const source = ctx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(ctx.destination);
  
  const currentTime = ctx.currentTime;
  if (nextStartTime < currentTime) {
    nextStartTime = currentTime + 0.1; // Add small buffer
  }
  
  source.start(nextStartTime);
  nextStartTime += audioBuffer.duration;
  
  return source;
}

export function resetAudioQueue() {
  nextStartTime = 0;
}
