import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IClaim } from '../types/predictions';

interface ClaimStore {
  claims: IClaim[];
  addClaim: (claim: IClaim) => void;
  updateClaim: (id: string, updates: Partial<IClaim>) => void;
  removeClaim: (id: string) => void;
  selectedCodes: string[];
  setSelectedCodes: (codes: string[]) => void;
}

export const useClaimStore = create<ClaimStore>()(
  persist(
    (set) => ({
      claims: [],
      addClaim: (claim) => set((state) => ({ 
        claims: [claim, ...state.claims] 
      })),
      updateClaim: (id, updates) => set((state) => ({
        claims: state.claims.map(claim => 
          claim.id === id ? { ...claim, ...updates } : claim
        )
      })),
      removeClaim: (id) => set((state) => ({
        claims: state.claims.filter(claim => claim.id !== id)
      })),
      selectedCodes: [],
      setSelectedCodes: (codes) => set({ selectedCodes: codes }),
    }),
    {
      name: 'astra-claims-storage',
    }
  )
);