import React, { useState } from 'react';
import { ScrollText, RefreshCw } from 'lucide-react';
import { PROMPT_OPTIONS, DEFAULT_PROMPT_TYPE, FORMAT_LABELS } from '../utils/prompts';
import type { NoteFormData } from '../types';

interface NoteInputProps {
  onSubmit: (data: NoteFormData) => void;
  isProcessing: boolean;
}

export function NoteInput({ onSubmit, isProcessing }: NoteInputProps) {
  const [content, setContent] = useState('');
  const [promptType, setPromptType] = useState(DEFAULT_PROMPT_TYPE);
  const [customInstructions, setCustomInstructions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({ content, promptType, customInstructions: customInstructions.trim() || undefined });
    }
  };

  const handleClear = () => {
    setContent('');
    setPromptType(DEFAULT_PROMPT_TYPE);
    setCustomInstructions('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
          <ScrollText className="w-6 h-6" />
          <h2>Clinical Session Notes</h2>
        </div>
        <button
          type="button"
          onClick={handleClear}
          disabled={isProcessing || !content.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Clear Notes
        </button>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="promptType" className="block text-sm font-medium text-gray-700">
          Documentation Format
        </label>
        <select
          id="promptType"
          value={promptType}
          onChange={(e) => setPromptType(e.target.value as keyof typeof PROMPT_OPTIONS)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isProcessing}
        >
          {Object.entries(FORMAT_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="customInstructions" className="block text-sm font-medium text-gray-700">
          Additional Instructions (Optional)
        </label>
        <textarea
          id="customInstructions"
          value={customInstructions}
          onChange={(e) => setCustomInstructions(e.target.value)}
          className="w-full h-24 p-4 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Enter any additional instructions for processing your notes..."
          disabled={isProcessing}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Session Notes
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-48 p-4 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
          placeholder="Enter your session notes here..."
          disabled={isProcessing}
        />
      </div>

      <button
        type="submit"
        disabled={isProcessing || !content.trim()}
        className="w-full px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Processing Notes...' : 'Process Clinical Notes'}
      </button>
    </form>
  );
}