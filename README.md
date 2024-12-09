# Advent of Code 2024 Solutions

A collection of solutions for Advent of Code 2024 implemented using Deno and TypeScript.

> [!IMPORTANT]
> All solutions in this repository are created entirely by human without any AI assistance, respecting the spirit of Advent of Code and its competitive leaderboard. This aligns with [the creator's request to maintain fair competition and genuine learning experience](https://adventofcode.com/2024/about).

## Features

- 🚀 Powered by Deno runtime
- 📝 Automatic daily puzzle input fetching
- 🔄 Automatic solution template generation
- ⚡ TypeScript type support
- 🛠️ Optimized VSCode development environment

## Prerequisites

- [Deno 2.x](https://deno.com/)
- Valid [Advent of Code](https://adventofcode.com/) account
- [Visual Studio Code](https://code.visualstudio.com/) or compatible editor

## Installation

1. Clone the repository or download the source code.

2. Obtain your Advent of Code session token:
   - Log in to the [Advent of Code website](https://adventofcode.com/).
   - Open your browser's developer tools (usually by pressing F12 or right-clicking and selecting "Inspect").
   - Go to the "Application" tab and find the "Cookies" section.
   - Locate the cookie named `session` and copy its value.

3. Copy the environment template file `.env.example` and rename it to `.env`. Then edit the `.env` file, replacing `your_session_token_here` with your actual AOC session token.

## Usage

This repository provides a set of commands to test your solutions on example inputs and solve the puzzle on the actual input.

```bash
deno task test --day <day_number> --year <year_number>
deno task solve --day <day_number> --year <year_number>
```

For example, to test and solve day 1 for 2024:

```bash
deno task test --day 1 --year 2024
deno task solve --day 1 --year 2024
```

The default day is 1 and the default year is 2024 if not specified.

The commands will automatically:

1. Generate a new solution template file (if it doesn't exist)
2. Download the puzzle input for that day (if it doesn't exist)
3. Generate a new test file (if it doesn't exist)

This allows you to quickly start working on new daily challenges without manual setup.

What you need to do is:

1. Implement the solution in the solution file
2. Implement the test cases in the test file
3. Run the `test` command to test your solution on the example input
4. Run the `solve` command to solve the puzzle on the actual input

## License

MIT License - See [LICENSE](LICENSE) file for details
