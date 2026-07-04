# ZP-lang Framework

Build your own programming language using your mother tongue. Then share it.

Status: Under active development. Version 0.1 is the first public release goal.
Current internal version: 0.0.04 (Kernel rewrite in progress).

Each version is stored in a separate folder so you can track progress.
Example: 0-0-01 (first prototype), 0-0-02 (multi-language support),
0-0-03 (Web IDE + API server).

Official Website: https://zp.amiraligrr.ir
GitHub: https://github.com/amiraligrr/zp-lang-framework


## What is ZP?

ZP is a framework that lets anyone create a custom programming language
using their own native language keywords. The code you write gets translated
to Python and runs.

No English required. No compiler experience needed.


## What does ZP stand for?

ZP stands for Zereshk Polo (زرشک پلو) — a traditional Persian dish made with
rice, barberries, and chicken.

Why name a programming framework after food?
Because like a good meal, a programming language should feel familiar, warm,
and accessible to everyone. Zereshk Polo is a dish many Iranians grow up with.
Similarly, ZP aims to make programming feel like something you already know
by letting you code in your mother tongue.

Some people might find the name unusual or funny. That is exactly the point.
Programming should not feel like a serious, exclusive club. It should be for everyone.
The name helps break the ice and reminds people that technology can be warm and human too.


## How Version 0.0.03 Works (Current Stable)

### Architecture Overview

ZP consists of three main components:

1. ZP Core – Python framework that loads language files and processes commands
2. Flask API Server – REST API that exposes ZP functionality over HTTP
3. Web IDE – Next.js frontend that communicates with the API server

### Language File Format

Each language is a separate Python file named: lang-zp-{language_name}.py

Each language file must contain:

- name – display name shown to users
- version – language version number
- author – creator name
- process(command, variables) function

### The Process Function

The process function receives:
- command: user input as a string (example: بنویس سلام)
- variables: a dictionary containing all previously defined variables

It must return:
- status: either "OK" or "ERROR"
- message: the output text to show the user
- updated_variables: the variables dictionary (may be unchanged or modified)

### Special Test Command

Every language file must respond to the "test" command. This is used by
ZP Core to verify the language works.

### Keywords in Version 0.0.03

Persian:
- بنویس – print / output text
- متغیر – variable assignment (form: متغیر name = value)

English:
- say – print / output text
- set – variable assignment (form: set name = value)

Note: More keywords (if, while, for, functions) will be added in version 0.0.04.


## Complete Workflow (with Web IDE)

1. Backend: Flask API server runs on localhost:5000 with ZP Core loaded
2. Frontend: Next.js IDE runs on localhost:3000
3. User writes code in the Persian language editor
4. Click Run → Frontend sends POST request to /run endpoint
5. Backend processes commands through ZP Core and returns results
6. Frontend displays output in the terminal panel

### API Endpoints (v0.0.03)

POST /run – Execute commands (send JSON with commands)
POST /reset – Reset all variables
GET /languages – List available languages
POST /reload – Reload language files


## Running the Project

### Backend (Flask API)

python zp_api.py

The server will start on http://localhost:5000

### Frontend (Next.js IDE)

cd zp-web
npm install
npm run dev

The IDE will be available at http://localhost:3000

### Using the IDE

1. Write Persian code in the editor
2. Click the Run button or type اجرا in the terminal
3. View output in the terminal panel
4. Click Details to see per-command execution results


## Adding a New Language (v0.0.03)

1. Create a file named lang-zp-yourlanguage.py
2. Define name, version, and author variables
3. Define a process(command, variables) function
4. Support the "test" command (must return OK)
5. Implement your language's keywords and logic
6. Place the file in the same folder as zp_api.py
7. Restart the Flask server or call the /reload endpoint

No changes to ZP Core are required. This plugin architecture makes it easy
to add, share, and download language files.


## Limitations of Version 0.0.03

The current version only handles single commands line by line.
It does not yet support:

- Multi-line programs
- Nested commands (if statements containing print)
- Loops (while, for)
- Functions
- Code blocks with indentation
- File input/output

Also, the Web IDE currently only works with Persian. Other languages can be
used through the API or terminal, but the IDE interface (suggestions, buttons,
labels) is Persian-specific. Dynamic IDE support is coming in future versions.


## Version History

### 0-0-01 (First Prototype)
- Basic single-language interpreter for Persian
- Hard-coded commands (no plugin system)
- Variables supported
- Terminal-based interaction
- Proof of concept

### 0-0-02 (Multi-Language Support)
- Multi-language plugin system
- Auto-discovery of language files
- Language menu for user selection
- Test command for validation
- Persian and English language files included
- Clean separation between core and languages
- Easy to add new languages without modifying core code

### 0-0-03 (Current – Web IDE + API)
- Flask REST API server
- Next.js web-based IDE
- Terminal panel with command execution
- Dark/light theme support
- RTL text support for Persian
- Auto-complete for keywords (Persian only)
- Resizable terminal panel
- Output display with execution time
- Detail modal for command results
- Note: IDE is currently Persian-only, dynamic IDE coming in future versions


## What's Coming Next: Version 0.0.04 (Kernel Rewrite)

This is a major update currently in progress. The current core has limits —
it cannot support loops, conditions, or persistent data without becoming messy.
We are rebuilding it from the ground up.

### New Features in 0.0.04

- Loops (for, while) – repeat blocks of code
- Conditions (if, else) – real branching inside your language
- Persistent variables – store data across different runs
- Smarter block handling – the core understands "from line X to line Y"
- Multi-language error messages – each language pack defines its own
- Automated dependency checking – Python version, pip packages, system packages
- Modular kernel architecture – cleaner and more extensible

### What Will NOT Break

- Language packs written for v0.0.02 and v0.0.03 will still work (backward compatibility)
- The current API endpoints (/run, /reset, etc.) will remain the same
- The Web IDE will not change in this version – it stays Persian-only for now

### Folder-Based Language Packs (After 0.0.04)

After the kernel rewrite, we will introduce a new format where each language
pack is a folder containing:
- Core logic (Python)
- Documentation and examples
- Images and assets
- IDE configuration (for future dynamic IDE)

This will come as a separate update after v0.0.04.


## Roadmap Summary

0-0-01: First working prototype (single language)
0-0-02: Multi-language plugin system
0-0-03: Web IDE + API (current — Persian IDE only)
0-0-04: Kernel rewrite (loops, conditions, persistent variables) — in progress
0.1: First public release – invite contributors, experimental web version
0.2: JSON language definitions, dynamic IDE controlled by language packs
0.3: ZP Store, package manager, documentation site
0.4+: Advanced features, community growth


## Development Status (July 2026)

School exams have finished, but upcoming robotics competitions and other
projects may slow down progress. Development continues, but at a steadier pace.

**Current focus:**
- Completing the 0.0.04 kernel rewrite
- Testing block handling and conditionals
- Preparing for the first public release (v0.1)

**Internet situation in Iran is unstable.** GitHub connection drops constantly.
Even installing packages or pushing commits is often impossible. Local development
continues, but syncing with the remote repository happens when the connection allows.

The build never stops. Even if the internet does.


## Online Demo · The Challenge

We want to provide an online demo where users can try ZP directly in their browser.
However, this requires a Python server to run the code and return results.
Setting up a secure, stable server takes time and effort.

We are exploring alternative solutions that would allow users to run the framework
locally with minimal setup. For now, the easiest way is to clone the repository
and run each version folder directly.

For non-technical users who are not familiar with GitHub or terminal, we are
working on making the process simpler in future updates.


## What's Coming in the Future

- Dedicated domain for ZP-lang (Zereshk Polo) – we are securing it
- Full documentation pages (planned for mid-2027)
- Language pack store – share and download languages
- Integrated development environment for ZP languages
- Easier installation for non-technical users
- Community-driven language development


## Tech Stack

Core language: Python 3.12+
API Framework: Flask + Flask-CORS
Web Frontend: Next.js 16 (React)
Styling: Tailwind CSS
Code Editor: Custom textarea with syntax highlighting
Parsing (planned): Lark or PLY
Target output: Python AST
Execution: Python interpreter


## Contributing

You can help once v0.1 is released:

- Test the framework on your system
- Add support for your native language
- Write documentation and examples
- Report bugs and suggest features
- Share the project with others
- Build language files for different use cases
- Help build the dynamic IDE system


## License

MIT – free for everyone, forever.


## Links

GitHub: https://github.com/amiraligrr/ZP-lang-Framework
Issues: https://github.com/amiraligrr/ZP-lang-Framework/issues
Website: https://zp.amiraligrr.ir
My website: https://amiraligrr.ir


## Clone and Watch the Progress

git clone https://github.com/amiraligrr/ZP-lang-Framework
cd ZP-lang-Framework

Version 0.1 coming soon.


## About the Web Code in zp-webcode-backup

Due to ongoing internet instability in Iran, the complete website code cannot
be uploaded in one single commit. Instead, it is being published gradually
and transparently.

Inside the zp-webcode-backup folder, you will find the core pages of the
official ZP website: Homepage, Developers page, Contribute page, Layout
and global styles.

These files represent the current live version at zp.amiraligrr.ir.
The remaining parts will be added step by step as the internet connection permits.

Please visit the live website to see the full design and functionality:
https://zp.amiraligrr.ir


— Amirali Granmayeh, 16, Iran

Still building. One step at a time.
The build never stops. Even if the internet does.

Built by a 16-year-old from Iran. For everyone, everywhere.
