import { create } from "zustand";

interface UiState {
  mobileMenuOpen: boolean;
  cartDrawerOpen: boolean;
  searchModalOpen: boolean;
  notificationDropdownOpen: boolean;
  adminSidebarOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCartDrawerOpen: (open: boolean) => void;
  setSearchModalOpen: (open: boolean) => void;
  setNotificationDropdownOpen: (open: boolean) => void;
  setAdminSidebarOpen: (open: boolean) => void;
  toggleAdminSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  cartDrawerOpen: false,
  searchModalOpen: false,
  notificationDropdownOpen: false,
  adminSidebarOpen: true,

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
  setSearchModalOpen: (open) => set({ searchModalOpen: open }),
  setNotificationDropdownOpen: (open) => set({ notificationDropdownOpen: open }),
  setAdminSidebarOpen: (open) => set({ adminSidebarOpen: open }),
  toggleAdminSidebar: () => set((state) => ({ adminSidebarOpen: !state.adminSidebarOpen })),
}));
