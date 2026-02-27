import Anthropic from "@anthropic-ai/sdk";
import * as readline from "readline";

const client = new Anthropic();
const history = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function chat(userMessage) {
  history.push({ role: "user", content: userMessage });

  const stream = client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: history,
  });

  process.stdout.write("\nClaude: ");

  let fullResponse = "";
  for await (const chunk of stream) {
    if (
      chunk.type === "content_block_delta" &&
      chunk.delta.type === "text_delta"
    ) {
      process.stdout.write(chunk.delta.text);
      fullResponse += chunk.delta.text;
    }
  }

  console.log("\n");
  history.push({ role: "assistant", content: fullResponse });
}

async function main() {
  console.log('Chatbot ready. Type "exit" to quit.\n');

  while (true) {
    const input = await prompt("You: ");
    if (input.toLowerCase() === "exit") {
      rl.close();
      break;
    }
    if (input.trim()) {
      await chat(input);
    }
  }
}

main();
