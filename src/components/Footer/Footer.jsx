import React from 'react';

const Footer = () => {
    return (
        <footer
            className="w-full h-14 flex items-center justify-center z-50  bg-white"
            style={{
                boxShadow: "0 -4px 6px -1px rgba(0,0,0,0.1), 0 -2px 4px -2px rgba(0,0,0,0.1)",
            }}
        >
            <p>
                Dashboard App © 2025. Created by <span
                    className="font-semibold"
                    style={{
                        background: "linear-gradient(135deg, #0072ff 0%, #00c6a2ff 100%)",
                        backgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    Baher Osama
                </span>
            </p>
        </footer >
    );
};

export default Footer;