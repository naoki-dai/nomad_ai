"use client";

import { useState, useEffect, useRef } from "react";
import { useAgent } from "./hooks/useAgent";
import ReactMarkdown from "react-markdown";

/**
 * Home page for the AgentKit Quickstart
 *
 * @returns {React.ReactNode} The home page
 */
export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isThinking } = useAgent();

  // Ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSendMessage = async () => {
    if (!input.trim() || isThinking) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center text-black dark:text-white w-full h-full overflow-x-hidden">
      <div className="w-full max-w-4xl h-[70vh] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto space-y-3 p-2 flex flex-col">
{messages.length === 0 ? (
  <div className="flex flex-col items-center justify-center text-gray-500 mt-10 space-y-4">
    {/* 画像の表示 */}
    <img
      src="/img/chara.jpeg"
      alt="エコトン"
      className="size-40"
    />
    {/* 案内文 */}
    <p className="text-center">エコトンとの会話がここに表示されるよ！</p>
  </div>
) : (
  messages.map((msg, index) => {
    const isUser = msg.sender === "user";

    return (
      <div key={index} className={`flex items-start space-x-3 ${isUser ? "justify-end" : "justify-start"}`}>
        {/* プロフィール画像（受信側のみ） */}
        {!isUser && (
          <div className="flex flex-col items-center justify-start">
            {/* 丸枠付きアイコン */}
            <div className="w-13 h-13 rounded-full border border-green-500 bg-white flex items-center justify-center mb-1">
              <img
                src="/img/chara.jpeg"
                alt="エコトン"
                className="w-14 h-14 rounded-full"
              />
            </div>
            {/* 名前の表示 */}
            <span className="text-[10px] text-gray-500">エコトン</span>
          </div>
        )}

        {/* メッセージ吹き出し */}
        <div
          className={`bubble p-3 shadow max-w-full break-words relative ${
            isUser
              ? "bg-[#00a63f] text-white bubble-right rounded-md mr-2 " 
              : "bg-white border border-green-500 dark:bg-gray-700 text-left bubble-left rounded-md"
          }`}
        >
          <ReactMarkdown
            components={{
              a: (props) => (
                <a
                  {...props}
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
            }}
          >
            {msg.text}
          </ReactMarkdown>
        </div>
      </div>
    );
  })
)}
          {/* Thinking Indicator */}
          {isThinking && <div className="text-right mr-2 text-gray-500">考え中だトン 💬</div>}

          {/* Invisible div to track the bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            className="flex-grow p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            placeholder={"ここに文字を入力するトン！"}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSendMessage()}
            disabled={isThinking}
          />
          <button
            onClick={onSendMessage}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              isThinking
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-[#2e8f55] hover:bg-[#003ECF] text-white shadow-md"
            }`}
            disabled={isThinking}
          >
            送る
          </button>
        </div>
      </div>
    </div>
  );
}
