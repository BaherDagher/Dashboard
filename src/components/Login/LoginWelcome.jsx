import React from 'react';

const LoginWelcome = () => {
    return (
        <div
            style={{
                background:
                    "linear-gradient(135deg, #0a5dc1ff 0%, #0f61c6ff 50%, #0db596ff 100%)",
            }}
            className="flex-1 flex flex-col justify-center items-center text-white px-12 py-4 md:py-0 text-center ">
            <h2 className="text-4xl md:text-7xl font-bold mb-3">
                Insights That
            </h2>
            <h2
                style={{
                    background:
                        "linear-gradient(to right, #00e5ff6c, #00d0cc, #00c6a2)",
                    backgroundClip: "text",
                    color: "transparent",
                    display: "inline-block",
                }}
                className="text-4xl md:text-7xl font-bold mb-6 ">
                Empower You
            </h2>
            <p className="mb-1 max-w-xl text-xl text-white/80">
                Welcome back to your dashboard control center
            </p>
            <p className="max-w-xl text-xl text-white/80">
                Visualize key metrics and streamline your workflow efficiently
            </p>
        </div>
    );
}

export default LoginWelcome;
