# the-floor

A simple terminal chatbot powered by the Anthropic Claude API.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get an API key from [console.anthropic.com](https://console.anthropic.com) and set it in your environment:
   ```bash
   export ANTHROPIC_API_KEY=your_key_here
   ```

## Usage

```bash
# Show help
node chatbot.js --help

# Use the default system prompt
node chatbot.js

# Use a custom system prompt
node chatbot.js "You are a pirate."
```

Type your messages and press Enter. Claude will respond with streaming output. Type `exit` to quit.

## Features

- Streaming responses
- Conversation history (Claude remembers previous messages)
- Configurable system prompt via CLI argument (default: "You are a helpful assistant.")
