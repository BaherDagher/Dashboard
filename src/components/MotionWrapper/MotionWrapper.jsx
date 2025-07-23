"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

function MotionWrapper({ children }) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col bg-gray-50"
        >
            <main className="flex-1 flex flex-col">{children}</main>

        </motion.div>
    );
}
export default MotionWrapper;