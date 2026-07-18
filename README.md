# Prompter — custom prompt templates

Prompter is an add-on for the [Prompt Storm](https://chrome.google.com/webstore/detail/promptstorm-chatgpt-bard/gkcdaooannhlioejchebhpkllbcackig) Chrome extension that lets you save and reuse your own prompt templates on [Google Gemini](https://gemini.google.com).

## Why

Prompt Storm doesn't support custom, reusable prompt templates out of the box. Prompter adds a "Your Templates" panel on top of it so you can save prompts locally and reuse them without retyping.

## Features

- Add, edit, copy, and delete custom prompt templates directly inside the Prompt Storm panel on Gemini
- Templates are stored locally in the browser — nothing is uploaded to any cloud service
- Auto-restores a template you're editing within a few seconds if you start typing over it, so accidental edits aren't lost before you hit Copy

## Local Setup

1. Install the [Prompt Storm](https://chrome.google.com/webstore/detail/promptstorm-chatgpt-bard/gkcdaooannhlioejchebhpkllbcackig) extension and sign in
2. Clone this repo
3. In Chrome, go to `chrome://extensions`, enable **Developer Mode** (top right)
4. Click **Load Unpacked** and select the cloned `prompter` folder
5. Enable the extension — it's active on [gemini.google.com](https://gemini.google.com)

## Usage

Open the Prompt Storm panel on Gemini (lightning icon) — you'll see a **Your Templates** section added by Prompter.

![Prompt Storm panel with Your Templates section](https://github.com/abz4375/prompter/assets/90337098/fbd36cb5-19f7-45f8-8ee3-0e056e2730ff)

Click **+** to create a new template, write your prompt, and hit **Save**.

![Creating a new prompt template](https://github.com/abz4375/prompter/assets/90337098/ca7ae488-e0b3-4fdd-a4ed-f26b76d7e748)

Copy a saved template anytime with the **Copy** button, or remove one with **Delete**.

![Saved template with copy and delete actions](https://github.com/abz4375/prompter/assets/90337098/e232b793-00e7-4dea-b5d9-18c75251dddb)

![Prompter panel overview](https://github.com/abz4375/prompter/assets/90337098/27c8a60b-5b11-480d-83e6-b0b20cc511bc)

## Tech Stack

JavaScript, Chrome Extension Manifest V3, `chrome.storage.local`

## Future Improvements

- Support for additional Gemini-adjacent tools beyond Prompt Storm
- Import/export templates as JSON for backup or sharing across machines
