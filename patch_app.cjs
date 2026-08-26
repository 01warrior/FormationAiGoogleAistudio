const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add import
code = code.replace("import { Flashcards } from './Flashcards';", "import { Flashcards } from './Flashcards';\nimport { Videos } from './Videos';");

// 2. Add to Tab type
code = code.replace("type Tab = 'home' | 'learn' | 'verbs' | 'chat' | 'flashcards';", "type Tab = 'home' | 'learn' | 'verbs' | 'chat' | 'flashcards' | 'videos';");

// 3. Add to switch statement
code = code.replace("case 'flashcards': return <Flashcards />;", "case 'flashcards': return <Flashcards />;\n      case 'videos': return <Videos />;");

// 4. Add Desktop NavItem
code = code.replace("<NavItem tab=\"flashcards\" icon=\"style\" label=\"Flashcards\" activeTab={activeTab} onClick={setActiveTab} />", "<NavItem tab=\"flashcards\" icon=\"style\" label=\"Flashcards\" activeTab={activeTab} onClick={setActiveTab} />\n          <NavItem tab=\"videos\" icon=\"smart_display\" label=\"Videos\" activeTab={activeTab} onClick={setActiveTab} />");

// 5. Add MobileNavItem
code = code.replace("<MobileNavItem tab=\"flashcards\" icon=\"style\" label=\"Flashcards\" activeTab={activeTab} onClick={setActiveTab} />", "<MobileNavItem tab=\"flashcards\" icon=\"style\" label=\"Flashcards\" activeTab={activeTab} onClick={setActiveTab} />\n        <MobileNavItem tab=\"videos\" icon=\"smart_display\" label=\"Videos\" activeTab={activeTab} onClick={setActiveTab} />");

fs.writeFileSync('src/App.tsx', code);
console.log('patched app');
