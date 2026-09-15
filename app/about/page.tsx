import { aboutBlocks } from "@/lib/i18n/about";

export const metadata = {
  title: "About",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      <div className="mx-auto max-w-lg px-6 py-10">
        <h1 className="mb-6 text-2xl font-bold text-white">About</h1>

        {aboutBlocks.map((block, i) => {
          if (block.kind === "quote") {
            return (
              <blockquote
                key={i}
                className="my-6 border-l-4 border-indigo-500 pl-4 text-gray-400 italic"
              >
                {block.text}
              </blockquote>
            );
          }
          if (block.kind === "attribution") {
            return (
              <p key={i} className="mb-8 text-right text-sm text-gray-500">
                {block.text}
              </p>
            );
          }
          return (
            <p
              key={i}
              className={
                block.emphasis === "lead"
                  ? "mb-4 leading-relaxed"
                  : block.emphasis === "small"
                    ? "mb-4 text-sm leading-relaxed text-gray-400"
                    : "mb-4 leading-relaxed text-gray-300"
              }
            >
              {block.text}
            </p>
          );
        })}

        <div className="flex gap-3">
          <a
            href="https://github.com/bloodline0902"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700"
          >
            GitHub
          </a>
          <a
            href="https://stackoverflow.com/users/4172900/tony"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm text-white transition-colors hover:bg-orange-500"
          >
            Stack Overflow
          </a>
        </div>
      </div>
    </div>
  );
}
