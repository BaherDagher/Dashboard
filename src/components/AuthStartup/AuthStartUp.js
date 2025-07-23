"use client";

import { auth } from "@/firebase/firebaseConfiguration";
import {
  filterUserData,
  setIsAppReady,
  setUser,
} from "@/redux/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthStartUp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser(filterUserData(firebaseUser)));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setIsAppReady(true));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthStartUp;
