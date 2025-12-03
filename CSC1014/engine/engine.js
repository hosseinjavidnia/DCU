// engine/engine.js

function sanitizeCode(src){ return src.replace(/\r\n?/g, '\n').replace(/\u00A0/g, ' ').replace(/\t/g, '    '); }
function builtinRead(x){ if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) throw "File not found: '" + x + "'"; return Sk.builtinFiles['files'][x]; }

const defaultPlaygroundCode = `# Welcome to the CSC1014 Playground
# Experiment with your Python code here.

def greet(name):
    return f"Hello, {name}!"

students = ["Alice", "Bob", "Charlie"]

print("--- Class Roster ---")
for s in students:
    print(greet(s))

print(f"Total students: {len(students)}")
`;

function initPlayground(id) {
    const section = document.getElementById(id);
    if(!section) return;

    const codeTA = section.querySelector('textarea.code');
    const outputEl = section.querySelector('.output-box');
    const statusEl = section.querySelector('.status-text');
    const dotEl = section.querySelector('.dot');
    
    // 1. Capture HTML code if present
    const htmlCode = codeTA.value.trim();
    const startCode = htmlCode.length > 0 ? codeTA.value : defaultPlaygroundCode;

    // 2. Initialize CodeMirror
    // REMOVED: viewportMargin: Infinity (This caused the scrolling bug)
    const editor = CodeMirror.fromTextArea(codeTA, {
        mode: 'python', theme: 'eclipse',
        lineNumbers: true, matchBrackets: true, indentUnit: 4
    });
    
    editor.setValue(startCode);

    function setStatus(msg, type='idle'){
        if(statusEl) statusEl.textContent = msg;
        if(dotEl) dotEl.className = 'dot ' + (type === 'idle' ? '' : type);
    }

    async function run(){
        const code = sanitizeCode(editor.getValue());
        outputEl.textContent = '';
        setStatus('Running...', 'idle');
        Sk.pre = outputEl;
        Sk.configure({ output: (t) => outputEl.textContent += t, read: builtinRead, __future__: Sk.python3 });

        try {
            await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code, true));
            setStatus('Execution successful', 'ok');
        } catch(err) {
            outputEl.innerHTML += '<span class="stderr">' + err.toString() + '</span>';
            setStatus('Error', 'err');
        }
    }

    if(section.querySelector('.run')) section.querySelector('.run').addEventListener('click', run);
    if(section.querySelector('.clear')) section.querySelector('.clear').addEventListener('click', () => { outputEl.textContent = ''; setStatus('Cleared'); });
    if(section.querySelector('.reset')) section.querySelector('.reset').addEventListener('click', () => { 
        editor.setValue(startCode); 
        setStatus('Reset'); 
    });
}