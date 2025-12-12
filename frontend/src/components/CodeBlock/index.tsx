import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// eslint-disable-next-line
export const CodeBlock = ({ className, children, ...props }: any) => {
  const [isCopied, setIsCopied] = useState(false);

  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : null;

  const handleCopy = async () => {
    const textToCopy = String(children).replace(/\n$/, '');
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!match) {
    return (
      <code
        className={`${className || ''} text-pink-500 rounded px-1 italic bg-stone-800`}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="relative group rounded-lg overflow-hidden my-4 bg-[#1E1E1E]">
      <div className="flex justify-between items-center bg-[#2d2d2d] px-4 py-2 text-xs text-gray-400 select-none">
        <span className="uppercase font-bold tracking-wider">{language}</span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors"
          aria-label="Copiar código"
        >
          {isCopied ? (
            <>
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-500">Copiado!</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        {...props}
        PreTag="div"
        language={language}
        style={dracula}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          borderRadius: '0 0 8px 8px',
          fontSize: '0.9rem',
          backgroundColor: 'transparent',
        }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};
