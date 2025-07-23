import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import AnimatedWrapper from "@/components/MotionWrapper/MotionWrapper";
import ClientLayout from "@/components/ClientLayout/ClientLayout";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard Created By Baher Osama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ReduxProvider>
          <ClientLayout>
            <Navbar />
            <AnimatedWrapper>{children}</AnimatedWrapper>
            <Footer />
            <ToastContainer />
          </ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
