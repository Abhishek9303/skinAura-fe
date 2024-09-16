import { create } from "zustand";

// Define the Zustand store for user data
const adminStore = create((set) => ({
  admin: {
    name: "",
    emailId: "",
    mobileNo: "",
    role: "",
    isAuthorized: false,
    token: "",
  },
  // Actions to modify user data
  setAdmin: (newUser) =>
    set((state) => ({
      admin: { ...state.admin, ...newUser },
    })),
  clearAdmin: () =>
    set(() => ({
      admin: {
        name: "",
        emailId: "",
        mobileNo: "",
        role: "",
        isAuthorized: false,
        token:""
      },
    })),
}));

export default adminStore;
