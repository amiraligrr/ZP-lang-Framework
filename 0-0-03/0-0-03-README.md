# ZP-lang-Framework – Version 0.0.03

Web IDE + API Server


## What is this version?

Version 0.0.03 introduces a web-based IDE and a Flask API server. You can now write Persian code in a browser editor, send it to the backend, and see the output in a terminal panel.

Current state:
- The IDE interface (buttons, labels, suggestions) is currently Persian-only.
- The core language system supports both Persian and English language files.
- You can test Persian and English commands through the API or terminal, but the web interface is optimized for Persian.
- A fully dynamic, multi-language IDE is planned for future versions.


## How to run

### Backend (Flask API)

python zp_api.py

The server will start on http://localhost:5000

Available endpoints:
POST /run – Execute commands
POST /reset – Reset variables
GET /languages – List available languages
POST /reload – Reload language files

### Frontend (Next.js IDE)

cd zp-web
npm install
npm run dev

The IDE will be available at http://localhost:3000


## How to use the Web IDE

Step 1: Make sure the backend is running
Open a terminal and run python zp_api.py. Keep it running.

Step 2: Open the IDE
Go to http://localhost:3000 in your browser.

Step 3: Write code in Persian
Example:

بنویس "سلام دنیا"
متغیر نام = "امیرعلی"
بنویس متغیر نام

Step 4: Run the code
Click the Run button in the toolbar, or type اجرا in the terminal panel and press Enter.

Step 5: View output
The output will appear in the terminal panel on the right side.

Step 6: See details (optional)
Click the Details button next to any output to see per-command execution results (command, output, status).


## How to use the API directly

You can call the API from any tool:

curl -X POST http://localhost:5000/run -H "Content-Type: application/json" -d '{"commands": ["بنویس سلام", "متغیر x = 5"]}'

The API returns a JSON object with results and the final variable state.


## Language Support

| Language | Terminal | API | Web IDE |
|----------|----------|-----|---------|
| Persian  | Full     | Full | Full (interface in Persian) |
| English  | Full     | Full | Work in progress |

The web IDE currently has Persian labels and suggestions. English commands work through the API or terminal, but the interface is not yet translated. A fully multi-language IDE is coming in version 0.1 and later.


## Adding a New Language

Create a file named lang-zp-yourlanguage.py:

name = "Your Language"
version = "0.1"
author = "Your Name"

def process(command, variables):
    if command == "test":
        return "OK", "Language loaded", variables
    return "ERROR", "Unknown command", variables

Place it next to zp_api.py and restart the server (or call POST /reload). No changes to the core are required. The API will automatically recognize your language.


## Current Limitations

- The Web IDE interface (buttons, help texts, autocomplete suggestions) is Persian-only.
- The IDE only supports single-line commands (no multi-line programs yet).
- Loops and conditionals are not available in the language processor yet (coming in 0.1).
- The live demo at zp.amiraligrr.ir is under construction.


## What is being built right now

We are actively working on:
- A fully multi-language IDE where the interface changes based on the selected language.
- Documentation pages for each language pack, written in that language.
- Complex commands support (if, while, for, functions).
- The experimental web version at zp.amiraligrr.ir.


## Folder Structure (0.0.03)

ZP-lang-Framework/
├── zp_api.py              # Flask backend
├── lang-zp-persian.py     # Persian language
├── lang-zp-english.py     # English language
├── 0-0-01/                # First prototype
├── 0-0-02/                # Multi-language version
└── zp-web/                # Next.js frontend IDE


## Requirements

- Python 3.12+
- Flask, Flask-CORS
- Node.js 18+
- Next.js 16


## License

MIT – free for everyone, forever.


## Links

GitHub: https://github.com/amiraligrr/ZP-lang-Framework
Website: https://zp.amiraligrr.ir (under reconstruction)
My website: https://amiraligrr.ir


Built by a 16-year-old from Iran. For everyone, everywhere.

You learned to code in English. We learned to code in freedom.
