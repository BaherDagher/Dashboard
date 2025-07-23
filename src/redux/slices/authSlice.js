import { auth } from "@/firebase/firebaseConfiguration";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { addNewUser } from "../../firebase/userServices.js";

const provider = new GoogleAuthProvider();

const filterUserData = (user) => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  photoURL: user.photoURL || null,
});

const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      await updateProfile(auth.currentUser, { displayName: name.trim() });
      await addNewUser(userCredentials.user.uid, name.trim(), email.trim());
      return filterUserData(userCredentials.user);
    } catch (error) {
      const errorMessage = handleAuthError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      return filterUserData(userCredentials.user);
    } catch (error) {
      const errorMessage = handleAuthError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const userCredentials = await signInWithPopup(auth, provider);
      await addNewUser(
        userCredentials.user.uid,
        userCredentials.user.displayName,
        userCredentials.user.email
      );
      return filterUserData(userCredentials.user);
    } catch (error) {
      const errorMessage = handleAuthError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      const errorMessage = handleAuthError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return true;
    } catch (error) {
      const errorMessage = handleAuthError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

const handleAuthError = (error) => {
  if (!error?.code) return "Unexpected error occurred.";
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email is already registered.";
    case "auth/invalid-email":
      return "Invalid email format.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/too-many-requests":
      return "Too many requests, try again later";
    default:
      return error.message;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    isGoogleLoading: false,
    error: null,
    isAppReady: false,
    showForgotPassword: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAppReady: (state, action) => {
      state.isAppReady = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setShowForgotPassword: (state, action) => {
      state.showForgotPassword = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Sign In With Google
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.isGoogleLoading = true;
      state.error = null;
    });
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
      state.isGoogleLoading = false;
      state.user = action.payload;
    });
    builder.addCase(signInWithGoogle.rejected, (state, action) => {
      state.isGoogleLoading = false;
      state.error = action.payload;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });

    // Reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setUser, setIsAppReady, clearAuthError, setShowForgotPassword } =
  authSlice.actions;

export {
  register,
  login,
  logout,
  signInWithGoogle,
  filterUserData,
  resetPassword,
};

export default authSlice.reducer;
