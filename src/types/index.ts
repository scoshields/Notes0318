export interface Note {
  id: string;
  content: string;
  processedContent?: string;
  isProcessing: boolean;
  error?: string;
}

export interface ProcessingOptions {
  prompt: string;
  content: string;
  customInstructions?: string;
}

export interface NoteFormData {
  content: string;
  promptType: keyof typeof import('../utils/prompts').PROMPT_OPTIONS;
  customInstructions?: string;
}