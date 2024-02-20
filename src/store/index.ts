import { create } from "zustand";
import { BeerStore } from "../common/interface";

export const useBeerStore = create<BeerStore>((set) => ({
  beers: [],
  setBeers: (beers) => set({ beers }),
}));
