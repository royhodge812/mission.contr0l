
import React, { useState } from 'react';
import { ClipboardCheckIcon, ClipboardIcon } from './Icons';

interface GeneratedContentProps {
  htmlContent: string;
}

export const GeneratedContent: React.FC<GeneratedContentProps> = ({ htmlContent }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full text-left bg-gray-900/50 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-800/60 border-b border-gray-700 flex justify-between items-center">
        <div>
            <h3 className="text-lg font-semibold text-gray-100">Mission Page Generated</h3>
            <p className="text-sm text-gray-400">Copy this code into your GitHub Page 'index.html' file.</p>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition-colors"
        >
          {copied ? <ClipboardCheckIcon className="h-5 w-5 mr-2" /> : <ClipboardIcon className="h-5 w-5 mr-2" />}
          {copied ? 'Copied!' : 'Copy HTML'}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-300 overflow-x-auto bg-[#0d1117]">
        <code className="language-html">{htmlContent}</code>
      </pre>
    </div>
  );
};
