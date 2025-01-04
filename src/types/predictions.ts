export interface ICodePrediction {
    code: string;
    description: string;
    confidence: number;
  }
  
  export interface IClaim {
    id: string;
    date: string;
    type: string;
    status: string;
    revenue: number;
    insurance: string;
    codes?: string[];
    notes?: string;
  }