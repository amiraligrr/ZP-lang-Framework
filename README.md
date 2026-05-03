# ZP-lang-Framework

**Build your own programming language using your mother tongue. Then share it.**

> **Status:** Under active development. Version 0.1 is the first public release goal. Current internal version is 0.0.02.

Each version is stored in a separate folder so you can track progress. For example: `0-0-01` (first working prototype), `0-0-02` (multi-language support). Version 0.1 will be the first release shared online to get help from other developers.

**🌐 Official Website:** [zp.amiraligrr.ir](https://zp.amiraligrr.ir) – A modern, bilingual (Persian/English) website showcasing the framework, demo, developers, and contribution guide.

---

## What is ZP?

ZP is a framework that lets anyone create a custom programming language using their own native language keywords. The code you write in your language gets translated to Python and runs.

**No English required. No compiler experience needed.**

---

## What does ZP stand for?

ZP stands for **"Zereshk Polo"** – a traditional Persian dish made with rice, barberries, and chicken.

Why name a programming framework after food? Because like a good meal, a programming language should feel familiar, warm, and accessible to everyone. Zereshk Polo is a dish many Iranians grow up with. Similarly, ZP aims to make programming feel like something you already know by letting you code in your mother tongue.

Some people might find the name unusual or funny. That is exactly the point. Programming should not feel like a serious exclusive club. It should be for everyone. The name helps break the ice and reminds people that technology can be warm and human too.

---

## How Version 0.0.02 Works

### Core Concept

ZP Core scans the current directory for language files. Each language is a separate Python file with a specific naming format: `lang-zp-{language_name}.py`

### Language File Requirements

Each language file must contain:
- `name` (display name shown to users)
- `version` (language version number)
- `author` (creator name)
- `process(command, variables)` function

### The Process Function

The `process` function is the heart of each language. It receives:
- `command`: the user input as a string (example: "بنویس سلام")
- `variables`: a dictionary containing all previously defined variables

It must return:
- `status`: either "OK" or "ERROR"
- `message`: the output text to show the user
- `updated_variables`: the variables dictionary (may be unchanged or modified)

### Special Test Command

Every language file must respond to the `"test"` command. This is used by ZP Core to verify the language works before letting the user select it. The test command should return `"OK"` along with a confirmation message.

### Complete Workflow

1. ZP Core scans the current folder for all files named `lang-zp-*.py`
2. It imports each file as a Python module
3. It checks that each module has a `name` attribute (otherwise it skips that file)
4. A numbered list of available languages is shown to the user
5. User types a number to select a language
6. ZP Core sends a `"test"` command to the selected language module
7. If the test passes, an interactive shell opens
8. User types commands one by one
9. Each command is sent to the language module's `process` function
10. The result is displayed to the user
11. Variables are preserved between commands
12. Type `exit` to quit the shell

### Example Session

📚 Available languages:

فارسی

English

👉 Choose a language (1-2): 1
✅ Language فارسی is ready.

🚀 Working with فارسی (type 'exit' to quit):

بنویس سلام
سلام
متغیر نام = امیرعلی
✅ متغیر نام = امیرعلی
بنویس متغیر نام
امیرعلی
exit

---

## Important Syntax Note

In the current version (0.0.02), variable assignment uses `متغیر` (Persian for "variable") followed by the name and value with an equals sign. Example: `متغیر نام = امیرعلی`

The word `متغیر` itself is the command. The name and value come after it. This means `متغیر` plays the role of `set` or `var` in other languages.

In future versions, we plan to introduce `ست` (Persian for "set") as a shorter alternative. Both forms may be supported during a transition period, but the standard going forward will be `ست` for variable assignment.

For the English language, `set` is used for variable assignment.

Current keyword support:

Persian:
- `بنویس` - print / output text
- `متغیر` - variable assignment (form: `متغیر name = value`)

English:
- `say` - print / output text
- `set` - variable assignment (form: `set name = value`)

More keywords like `if`, `while`, `for`, and function definitions will be added in future versions.

---

## Current Language Files

### Persian Language (`lang-zp-persian.py`)

The Persian language file defines:
- `name = "فارسی"`
- Commands: `بنویس` (print), `متغیر` (variable)
- `process` function recognizes the `test` command, `بنویس`, and `متغیر`

When `بنویس` is used, anything after it is printed directly. If `بنویس متغیر` is used followed by a variable name, it prints that variable's value.

When `متغیر` is used, it expects an equals sign separating name and value. Example: `متغیر x = 5`

### English Language (`lang-zp-english.py`)

The English language file mirrors the Persian one with English keywords:
- `name = "English"`
- Commands: `say` (print), `set` (variable)
- Same behavior patterns as Persian

---

## Adding a New Language

To add a new language to ZP:

1. Create a new file named `lang-zp-yourlanguage.py`
2. Define `name`, `version`, and `author` variables
3. Define a `process(command, variables)` function
4. Support the `"test"` command (must return `"OK"`)
5. Implement your language's keywords and logic
6. Place the file in the same folder as `zp_core.py`
7. Run ZP Core. Your language will appear in the menu automatically

No changes to ZP Core are required. This plugin architecture makes it easy to add, share, and download language files.

---

## Version History

### 0-0-01 (First prototype)
- Basic single-language interpreter for Persian
- Hard-coded commands (no plugin system)
- Variables supported
- Terminal-based interaction
- Proof of concept

### 0-0-02 (Current version)
- Multi-language plugin system
- Auto-discovery of language files
- Language menu for user selection
- Test command for validation
- Persian and English language files included
- Clean separation between core and languages
- Variables preserved between commands
- Easy to add new languages without modifying core code

### 0.1 (First public release goal)
- Publish online for community use
- Invite contributors to add more languages
- Basic grammar parser for more complex commands
- Better error handling
- Documentation website

### Future Versions (0.2 and beyond)
- JSON-based grammar definitions (no Python coding required for new languages)
- ZP Store for sharing languages
- Package manager to install languages from the store
- Web-based UI with Next.js for visual coding
- Integration between Python backend and web frontend
- Full programming language features (loops, conditionals, functions)
- Performance improvements
- Community contributions

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Core language | Python 3.12+ |
| Parsing (planned) | Lark or PLY |
| Target output | Python AST |
| Execution | Python interpreter |
| Future UI | Next.js / React |
| Future API | Flask / FastAPI |

---

## Limitations of Current Version

The current version (0.0.02) only handles single commands line by line. It does not yet support:

- Multi-line programs
- Nested commands (if statements containing print)
- Loops (while, for)
- Functions
- Code blocks with indentation
- File input/output

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

| Version | Focus |
|---------|-------|
| 0-0-01 | First working prototype (single language) |
| 0-0-02 | Multi-language plugin system (current) |
| 0.1 | First public release – invite contributors |
| 0.2 | JSON language definitions, better errors |
| 0.3 | ZP Store, package manager, docs site |
| 0.4+ | Advanced features, web UI, community growth |

---

## Contributing

You can help once v0.1 is released:
- Test the framework on your system
- Add support for your native language
- Write documentation and examples
- Report bugs and suggest features
- Share the project with others
- Build language files for different use cases

---

## License

MIT – free for everyone, forever.

---

## Links

- **GitHub:** https://github.com/amiraligrr/ZP-lang-Framework
- **Issues:** https://github.com/amiraligrr/ZP-lang-Framework/issues
- **Website:** [zp.amiraligrr.ir](https://zp.amiraligrr.ir) – Main project website (Next.js, bilingual, with demo and developer pages)

---

## Clone and Watch the Progress

```bash
git clone https://github.com/amiraligrr/ZP-lang-Framework
cd ZP-lang-Framework
```
Version 0.1 coming soon.

Built by a 15-year-old from Iran. For everyone, everywhere. 
