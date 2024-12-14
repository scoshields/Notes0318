import { basePromptTemplate, formatResponse } from './basePrompt';
import { modalityPrompts } from './modalityPrompts';
import type { PromptType } from './index';

export function buildPrompt(promptType: PromptType, customInstructions?: string): string {
  // Start with the base template
  let finalPrompt = basePromptTemplate;

  // Add modality-specific instructions if they exist
  if (modalityPrompts[promptType]) {
    finalPrompt += `\n\nModality-Specific Requirements:${modalityPrompts[promptType]}`;
  }

  // Add custom instructions if provided
  if (customInstructions?.trim()) {
    finalPrompt += `\n\nAdditional Custom Requirements:\n${customInstructions.trim()}`;
  }

  // Add the response format at the end
  finalPrompt += `\n\n${formatResponse}`;

  return finalPrompt;
}