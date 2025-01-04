import { mockPredictions } from './mockData';
import { ICodePrediction } from '../types/predictions';

export const predictCodes = (text: string): ICodePrediction[] => {
  const predictions: ICodePrediction[] = [];
  const lowerText = text.toLowerCase();

  mockPredictions.forEach(prediction => {
    // Check if any keywords match the input text
    const hasMatch = prediction.keywords.some(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );

    if (hasMatch) {
      predictions.push({
        code: prediction.code,
        description: prediction.description,
        confidence: prediction.confidence
      });
    }
  });

  return predictions;
};

export const generateClaimId = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
  });
};