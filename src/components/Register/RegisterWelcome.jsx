import React from 'react';

const RegisterWelcome = () => {
    return (
        <div
            style={{
                background:
                    "linear-gradient(135deg, #0a5dc1ff 0%, #0f61c6ff 50%, #0db596ff 100%)",
            }}
            className="flex-1 flex flex-col justify-center items-center text-white px-12 py-4 md:py-0 text-center ">
            <h2 className="text-4xl md:text-7xl font-bold mb-3">
                Start Your Journey
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
                Towards Success
            </h2>
            <p className="mb-1 max-w-xl text-xl text-white/80">
                Create your account today and unlock new possibilities
            </p>
            <p className="max-w-xl text-xl text-white/80">
                Manage your dashboard, track progress, and stay in control
            </p>
        </div>
    );
}

export default RegisterWelcome;