import { create } from 'zustand'

type PortfolioStore = {
  selectedCategory: string
  rotation: number
  setSelectedCategory: (category: string) => void
  setRotation: (rotation: number) => void
}

const usePortfolioStore = create<PortfolioStore>((set) => ({
  selectedCategory: 'all',
  rotation: 0,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setRotation: (rotation) => set({ rotation }),
}))

export default usePortfolioStore
