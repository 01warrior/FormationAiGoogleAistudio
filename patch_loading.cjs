const fs = require('fs');
let code = fs.readFileSync('src/Videos.tsx', 'utf8');

const loadingState = `
        {loading ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-center p-8 text-on-surface-variant font-label-bold">
            Loading latest stories from YouTube...
          </div>
        ) : (
          videos.map((video) => (
`;

code = code.replace('{videos.map((video) => (', loadingState);
code = code.replace('</h4>\n            </button>\n          ))}', '</h4>\n            </button>\n          ))\n        )}');

fs.writeFileSync('src/Videos.tsx', code);
console.log('patched loading');
