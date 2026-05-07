# ZP-lang-Framework

Build your own programming language using your mother tongue. Then share it.

Status: Under active development. Version 0.1 is the first public release goal. Current internal version is 0.0.03.

Each version is stored in a separate folder so you can track progress. For example: 0-0-01 (first working prototype), 0-0-02 (multi-language support), 0-0-03 (web IDE + API server). Version 0.1 will be the first release shared online to get help from other developers.

Official Website: zp.amiraligrr.ir – A modern, bilingual (Persian/English) website showcasing the framework, demo, developers, and contribution guide.

zp-webshte : http://zp.amiraligrr.ir

---

## What is ZP?

ZP is a framework that lets anyone create a custom programming language using their own native language keywords. The code you write in your language gets translated to Python and runs.

No English required. No compiler experience needed.

---

## What does ZP stand for?

ZP stands for Zereshk Polo – a traditional Persian dish made with rice, barberries, and chicken.

Why name a programming framework after food? Because like a good meal, a programming language should feel familiar, warm, and accessible to everyone. Zereshk Polo is a dish many Iranians grow up with. Similarly, ZP aims to make programming feel like something you already know by letting you code in your mother tongue.

Some people might find the name unusual or funny. That is exactly the point. Programming should not feel like a serious exclusive club. It should be for everyone. The name helps break the ice and reminds people that technology can be warm and human too.

---

## How Version 0.0.03 Works (Current)

### Architecture Overview

ZP now consists of three main components:

1. ZP Core – Python framework that loads language files and processes commands
2. Flask API Server – REST API that exposes ZP functionality over HTTP
3. Web IDE – Next.js frontend that communicates with the API server

### Important Note About Current IDE

In the current version (0.0.03), the Web IDE is specifically built for the Persian language only. The editor, suggestions, and terminal interface are hardcoded for Persian keywords.

However, in future versions, we will make the IDE fully dynamic. The language package itself will control everything about the IDE – from the run commands to the suggestion lists, syntax highlighting rules, and the entire terminal behavior. Each language will be able to define its own IDE experience, and ZP Core will load and apply those settings automatically.

This means that when you create a new language package, you will not just define keywords. You will also define how the IDE should behave for your language. The IDE becomes an extension of the language itself. This feature is planned for versions after 0.1.

### Current State of Web Version

We are actively working on building the experimental web version. The full online demo is under development and will be available soon at http://zp.amiraligrr.ir. Currently, the website shows the framework information, but the live demo environment is still in progress.

---

## Core Concept

ZP Core scans the current directory for language files. Each language is a separate Python file with a specific naming format: lang-zp-{language_name}.py

### Language File Requirements

Each language file must contain:
- name (display name shown to users)
- version (language version number)
- author (creator name)
- process(command, variables) function

### The Process Function

The process function is the heart of each language. It receives:
- command: the user input as a string (example: بنویس سلام)
- variables: a dictionary containing all previously defined variables

It must return:
- status: either OK or ERROR
- message: the output text to show the user
- updated_variables: the variables dictionary (may be unchanged or modified)

### Special Test Command

Every language file must respond to the test command. This is used by ZP Core to verify the language works.

---

## Complete Workflow (with Web IDE)

1. Backend: Flask API server runs on localhost:5000 with ZP Core loaded
2. Frontend: Next.js IDE runs on localhost:3000
3. User writes code in the Persian language editor
4. Click Run → Frontend sends POST request to /run endpoint
5. Backend processes commands through ZP Core and returns results
6. Frontend displays output in the terminal panel

### API Endpoints

POST /run - Execute commands (send JSON with commands)
POST /reset - Reset all variables
GET /languages - List available languages
POST /reload - Reload language files

---

## Important Syntax Note

In the current version (0.0.03), variable assignment uses متغیر (Persian for variable) followed by the name and value with an equals sign. Example: متغیر نام = امیرعلی

The word متغیر itself is the command. The name and value come after it. This means متغیر plays the role of set or var in other languages.

### Current keyword support

Persian:
- بنویس - print / output text
- متغیر - variable assignment (form: متغیر name = value)

English:
- say - print / output text
- set - variable assignment (form: set name = value)

More keywords like if, while, for, and function definitions will be added in future versions.

---

## Adding a New Language

To add a new language to ZP:

1. Create a new file named lang-zp-yourlanguage.py
2. Define name, version, and author variables
3. Define a process(command, variables) function
4. Support the test command (must return OK)
5. Implement your language's keywords and logic
6. Place the file in the same folder as zp_api.py
7. Restart the Flask server or call the /reload endpoint

No changes to ZP Core are required. This plugin architecture makes it easy to add, share, and download language files.

---

## Future: Dynamic IDE Controlled by Language Packages

Currently, the IDE is built specifically for Persian. But our vision for future versions (after 0.1) is much bigger:

Each language package will be able to define:
- The list of keywords for autocomplete suggestions
- The syntax highlighting rules (colors, patterns)
- Special run commands specific to that language
- How the terminal panel behaves
- Error message formats in the native language
- Example codes and snippets

When you switch languages in the IDE, everything will change dynamically – the editor behavior, suggestions, and even the UI text will adapt to that language. The language package will completely control the IDE experience.

This means that as a language creator, you will not just define how your language translates to Python. You will also define how programmers experience your language inside the ZP Web IDE. We are actively working on this feature.

---

## Version History

0-0-01 (First prototype)
- Basic single-language interpreter for Persian
- Hard-coded commands (no plugin system)
- Variables supported
- Terminal-based interaction
- Proof of concept

0-0-02 (Multi-language support)
- Multi-language plugin system
- Auto-discovery of language files
- Language menu for user selection
- Test command for validation
- Persian and English language files included
- Clean separation between core and languages
- Easy to add new languages without modifying core code

0-0-03 (Current version – Web IDE + API)
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

0.1 (First public release goal)
- Publish online for community use
- Invite contributors to add more languages
- Basic grammar parser for more complex commands
- Better error handling
- Complete documentation website
- Experimental web version live on zp.amiraligrr.ir

Future Versions (0.2 and beyond)
- JSON-based grammar definitions (no Python coding required for new languages)
- Fully dynamic IDE controlled by language packages
- ZP Store for sharing languages
- Package manager to install languages from the store
- Full programming language features (loops, conditionals, functions)
- Performance improvements
- Community contributions

---

## Tech Stack

Core language: Python 3.12+
API Framework: Flask + Flask-CORS
Web Frontend: Next.js 16 (React)
Styling: Tailwind CSS
Code Editor: Custom textarea with syntax highlighting
Parsing (planned): Lark or PLY
Target output: Python AST
Execution: Python interpreter

---

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

---

## Limitations of Current Version

The current version only handles single commands line by line. It does not yet support:

- Multi-line programs
- Nested commands (if statements containing print)
- Loops (while, for)
- Functions
- Code blocks with indentation
- File input/output

Also, the Web IDE currently only works with Persian. Other languages can be used through the API or terminal, but the IDE interface (suggestions, buttons, labels) is Persian-specific. Dynamic IDE support is coming in future versions.

These features are planned for future versions.

---

## Why Version 0.1 Matters

Version 0.1 will be the first release shared publicly online. The goal is to get help from other developers. Building ZP alone is possible, but building it with a community is faster and better. Once v0.1 is out, others can:

- Test the framework on different systems
- Add support for their native languages
- Report bugs and suggest improvements
- Write documentation and examples
- Share the project with their networks

This is why reaching v0.1 is an important milestone, even though it will not be perfect.

---

## Roadmap Summary

0-0-01: First working prototype (single language)
0-0-02: Multi-language plugin system
0-0-03: Web IDE + API (current - Persian IDE only)
0.1: First public release – invite contributors, experimental web version live
0.2: JSON language definitions, dynamic IDE controlled by language packages, better errors
0.3: ZP Store, package manager, docs site
0.4+: Advanced features, community growth

---

## Contributing

You can help once v0.1 is released:

- Test the framework on your system
- Add support for your native language
- Write documentation and examples
- Report bugs and suggest features
- Share the project with others
- Build language files for different use cases
- Help build the dynamic IDE system

---

## License

MIT – free for everyone, forever.

---

## Links

GitHub: https://github.com/amiraligrr/ZP-lang-Framework
Issues: https://github.com/amiraligrr/ZP-lang-Framework/issues
Website: http://zp.amiraligrr.ir – Main project website (Next.js, bilingual, with demo and developer pages)
My website: https://amiraligrr.ir

---

## About the Web Code in zp-webcode-backup

Due to ongoing internet instability in Iran, the complete website code cannot be uploaded in one single commit. Instead, it is being published gradually and transparently.

Inside the zp-webcode-backup folder, you will find the core pages of the official ZP website: Homepage, Developers page, Contribute page, Layout and global styles.

These files represent the current live version at zp.amiraligrr.ir. The remaining parts (full static export, images, optimizations) will be added step by step as the internet connection permits.

Why partial uploads? A stable connection is required to push large amounts of code. This incremental approach ensures no work is lost and the project remains visible and usable at all times.

Please visit the live website to see the full design and functionality: https://zp.amiraligrr.ir

---

## We Are Building the Experimental Web Version

We are currently working hard on building the experimental web version of ZP. The online demo environment is under active development. Once ready, you will be able to try ZP directly in your browser without installing anything. Follow the repository and the website for updates.

---

## Clone and Watch the Progress
```bash
git clone https://github.com/amiraligrr/ZP-lang-Framework
cd ZP-lang-Framework
```
Version 0.1 coming soon.

Built by a 16-year-old from Iran. For everyone, everywhere.
