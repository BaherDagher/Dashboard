"use client";

import { Provider } from "react-redux";
import store from "@/redux/store/store";
import AuthStartUp from "../AuthStartup/AuthStartUp";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>
    <AuthStartUp />
    {children}
  </Provider>;
}
