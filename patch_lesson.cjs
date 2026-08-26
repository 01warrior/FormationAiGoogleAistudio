const fs = require('fs');
let code = fs.readFileSync('src/LessonSession.tsx', 'utf8');

const validationRegex = /const acceptedAnswers = expectedStr\.split\(\',\'\)\.map\(s => s\.trim\(\)\.toLowerCase\(\)\);\s*if \(acceptedAnswers\.includes\(input\.trim\(\)\.toLowerCase\(\)\)\) \{/;

const betterValidation = `const normalizeStr = (str: string) => str.trim().toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
    const acceptedAnswers = expectedStr.split(/[,\\/]/).map(normalizeStr);
    
    if (acceptedAnswers.includes(normalizeStr(input))) {`;

code = code.replace(validationRegex, betterValidation);

fs.writeFileSync('src/LessonSession.tsx', code);
console.log('patched validation');
