"use client";

import { aboutBlocks } from "@/lib/i18n/about";

export default function AboutApp() {
  return (
    <div className="h-full overflow-y-auto bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="mx-auto max-w-lg px-6 py-8">
        {aboutBlocks.map((block, i) => {
          if (block.kind === "quote") {
            return (
              <blockquote
                key={i}
                className="my-6 border-l-4 border-indigo-500 pl-4 text-gray-600 italic dark:text-gray-400"
              >
                {block.text}
              </blockquote>
            );
          }
          if (block.kind === "attribution") {
            return (
              <p key={i} className="mb-8 text-right text-sm text-gray-500 dark:text-gray-500">
                {block.text}
              </p>
            );
          }
          // This window presents the greeting as its heading, where /about/ uses
          // a paragraph under an "About" title. Presentation stays local.
          if (block.emphasis === "lead") {
            return (
              <h1 key={i} className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                {block.text}
              </h1>
            );
          }
          return (
            <p
              key={i}
              className={
                block.emphasis === "small"
                  ? "mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                  : "mb-4 leading-relaxed text-gray-700 dark:text-gray-300"
              }
            >
              {block.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
