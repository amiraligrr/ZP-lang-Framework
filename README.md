# ZP-lang-Framework

Build your own programming language using your mother tongue. Then share it.

Status: Under active development. Version 0.1 is being built right now.

## What is this?

ZP is a framework that lets anyone create a custom programming language with their own native language keywords. The code you write in your language gets translated to Python and runs.

No English required. No compiler experience needed.

## How it works (planned)

Your Language Code → ZP Parser → Python Code → Executes

1. You define your language grammar
2. ZP builds a translator
3. You write code in your language
4. ZP translates to Python
5. Python runs it

## Current status

Basic parser - Building
Grammar definition format - Designing
Persian language demo - Planned
Python code generator - Planned
CLI tool - Planned
Documentation - Planned
Version 0.1 release - Working on it

We are in early stages. First release coming soon.

## What you will be able to do

Define keywords in Persian, Arabic, Spanish, or any language
Map them to Python equivalents (print, if, for, while)
Write and run code bilingually
Share your language with others
Use languages other people built

## Example

Define a Persian language:

{
  "بنویس": "print",
  "اگر": "if",
  "باشد": ":"
}

Write code:

بنویس "سلام دنیا"

Gets translated to:

print("سلام دنیا")

And runs.

## Tech stack

Language: Python 3.12+
Parsing: Lark or PLY (to be decided)
Target: Python AST
Execution: Python interpreter

## Roadmap

v0.1 (in progress)
- Basic grammar parser
- Single language support (Persian demo)
- Simple CLI

v0.2
- Multiple language definitions
- JSON-based grammar files
- Better error messages

v0.3
- ZP Store concept
- Package manager for languages
- Documentation site

v0.4 and beyond
- Advanced language features
- Performance improvements
- Community contributions

## Contributing

You can help once v0.1 is out:
- Test the framework
- Add support for your native language
- Write documentation
- Report bugs
- Share the project

## License

MIT - free for everyone.

## Links

GitHub: https://github.com/amiraligrr/ZP-lang-Framework
Issues: https://github.com/amiraligrr/ZP-lang-Framework/issues

## Clone and watch the progress

git clone https://github.com/amiraligrr/ZP-lang-Framework
cd ZP-lang-Framework

Version 0.1 coming soon.

Built by a 15-year-old from Iran. For everyone, everywhere.
https://amiraligrr,ir
