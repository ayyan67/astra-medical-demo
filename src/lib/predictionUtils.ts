import { mockPredictions } from './mockData';
import { ICodePrediction } from '../types/predictions';

/**
 * Advanced text analysis for medical code prediction
 * This is a more sophisticated version that uses multiple techniques
 * to improve accuracy of the mock prediction system
 */
export const predictCodes = (text: string): ICodePrediction[] => {
  if (!text) return [];
  
  const predictions: ICodePrediction[] = [];
  const lowerText = text.toLowerCase();
  
  // Track matches to avoid duplicates and apply weighting
  const matchScores: Record<string, number> = {};
  
  // First pass: Find keyword matches
  mockPredictions.forEach(prediction => {
    let score = 0;
    
    // Check for keyword matches with varying weights
    prediction.keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      
      // Direct match gets higher weight
      if (lowerText.includes(keywordLower)) {
        // Count occurrences for additional weighting
        const occurrences = (lowerText.match(new RegExp(keywordLower, 'g')) || []).length;
        
        // Exact phrase matches get higher weight
        const exactPhraseBonus = new RegExp(`\\b${keywordLower}\\b`, 'i').test(text) ? 0.2 : 0;
        
        // Position bias - earlier mentions might be more important
        const firstPosition = lowerText.indexOf(keywordLower);
        const positionBonus = firstPosition > -1 ? Math.max(0, (1 - (firstPosition / lowerText.length)) * 0.1) : 0;
        
        score += 0.1 + (occurrences * 0.05) + exactPhraseBonus + positionBonus;
      }
    });
    
    // Only include predictions that have some relevance
    if (score > 0) {
      matchScores[prediction.code] = score;
    }
  });
  
  // Apply context-based adjustments (for demonstration)
  // For example, if text mentions "type 2 diabetes" and "kidney", boost E112 code
  if (lowerText.includes('diabetes') && lowerText.includes('kidney')) {
    matchScores['E112'] = (matchScores['E112'] || 0) + 0.3;
  }
  
  // Convert scores to predictions, applying a confidence formula
  Object.entries(matchScores).forEach(([code, score]) => {
    const predictionTemplate = mockPredictions.find(p => p.code === code);
    if (predictionTemplate) {
      // Calculate confidence as a combination of base confidence and match score
      // Cap at 0.98 to avoid false certainty
      const adjustedConfidence = Math.min(0.98, predictionTemplate.confidence * (1 + score));
      
      predictions.push({
        code: code,
        description: predictionTemplate.description,
        confidence: adjustedConfidence
      });
    }
  });
  
  // Sort by confidence
  return predictions.sort((a, b) => b.confidence - a.confidence);
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