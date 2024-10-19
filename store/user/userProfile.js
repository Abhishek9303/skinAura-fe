import { create } from "zustand";

// Define the Zustand store for user data
const useUserStore = create((set) => ({
  user: {
    name: "",
    emailId: "",
    mobileNo: "",
    role: "",
    isAuthorized: false,
    authToken : "",
    currentCart : "",
  },
  // Actions to modify user data
  setUser: (newUser) =>
    set((state) => ({
      user: { ...state.user, ...newUser },
    })),
  clearUser: () =>
    set(() => ({
      user: { name: "", emailId: "", mobileNo: "", role: "" , isAuthorized: false },
    })),
}));

export default useUserStore;
