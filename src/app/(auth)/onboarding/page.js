"use client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <section
        className="flex flex-1 items-center w-full justify-center text-white px-6 "
        style={{
          background:
            "linear-gradient(135deg, #0a5dc1ff 0%, #0f61c6ff 50%, #0db596ff 100%)",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-8 md:px-24">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left ">
            <h1 className="text-4xl md:text-7xl font-bold mb-2">
              Welcome to Your
            </h1>
            <h1
              style={{
                background:
                  "linear-gradient(to right, #00e5ff6c, #00d0cc, #00c6a2)",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block",
              }}
              className="text-4xl md:text-7xl font-bold mb-10 -mt-2"
            >
              Dashboard
            </h1>
            <p className="text-white/80 text-base md:text-xl max-w-2xl pr-2 mx-auto md:mx-0 mb-10">
              Manage data, visualize metrics, and streamline operations with
              ease. Start your dashboard experience now.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center space-x-6">
              <button
                onClick={() => router.push("/login")}
                className="bg-white text-[#0072ff] font-semibold py-2 px-6 rounded-lg shadow flex-1 w-full cursor-pointer "
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="bg-white text-[#0072ff] font-semibold py-2 px-6 rounded-lg shadow flex-1 w-full cursor-pointer "
              >
                Register
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <Image
              src="/HeroImage.png"
              alt="Dashboard Preview"
              width={600}
              height={600}
              className="rounded-xl object-contain"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
