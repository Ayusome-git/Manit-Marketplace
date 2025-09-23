import { create } from "zustand"

type Section = "users" | "products" | "notifications" | null

interface AdminSectionState {
 openSection: Section
 setSection: (section: Section) => void
 toggleSection: (section: Section) => void
}

export const useAdminSectionStore = create<AdminSectionState>((set, get) => ({
 openSection: null, // null = dashboard
 setSection: (section) => set({ openSection: section }),
 toggleSection: (section) => {
  set({
   openSection: get().openSection === section ? null : section,
  })
 },
}))

export type { Section }