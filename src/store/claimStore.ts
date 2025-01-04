import { create } from 'zustand';
import { IClaim } from '../types/predictions';

interface ClaimStore {
  claims: IClaim[];
  addClaim: (claim: IClaim) => void;
  selectedCodes: string[];
  setSelectedCodes: (codes: string[]) => void;
}

export const useClaimStore = create<ClaimStore>((set) => ({
  claims: [],
  addClaim: (claim) => set((state) => ({ 
    claims: [claim, ...state.claims] 
  })),
  selectedCodes: [],
  setSelectedCodes: (codes) => set({ selectedCodes: codes }),
}));