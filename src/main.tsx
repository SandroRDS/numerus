import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './reset.css';

// import TipsGenerator from './adapters/TipsGenerator.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
// const tipsGenerator = new TipsGenerator();
// tipsGenerator.requestChatGPT();

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();