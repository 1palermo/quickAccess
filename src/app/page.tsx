"use client";
import { motion } from "framer-motion";
import Upload from "@/components/Upload";
import { AnimatedShinyTextDemo } from "@/components/CreatorButton";
import Link from "next/link";
import Image from "next/image";
import Cards from "@/components/Card2";
export const runtime = "edge";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden ">
      {/* Top Radial Gradient */}
      <div className="absolute -top-96 left-1/2 transform -translate-x-1/2 w-[1200px] h-[900px] rounded-full bg-gradient-to-b from-emerald-500/30 to-transparent blur-3xl" />

      <header className="mt-2 mx-4 relative py-6 px-4 sm:px-6 lg:px-8 flex justify-between bg-secondary/15 shadow-lg shadow-neutral-600/5 backdrop-blur-2xl border border-green-400/20 p-6 rounded-2xl">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-600 to-green-700 animate-pulse inline-block">
          Flash
          <span className="bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
            Share
          </span>
        </h1>

        {/* Lightning bolt decorative element */}
        <div className="absolute top-3 left-5 text-green-400 text-lg animate-bounce">
          <Image src={"/bolt.png"} width={20} height={20} alt="bolt image" />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-16 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <Upload />
        </div>

        <div className="lg:w-1/2 text-center lg:text-left order-1 lg:order-2 bg-black p-8 rounded-lg shadow-lg">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-green-400 to-gray-900/80 bg-clip-text text-center lg:text-left text-4xl sm:text-5xl lg:text-7xl font-semibold leading-tight lg:leading-none text-transparent max-w-full lg:max-w-2xl mx-auto lg:mx-0"
          >
            Lightning-Fast<br></br>File Transfers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 lg:mb-10 max-w-md lg:max-w-lg mx-auto lg:mx-0 glow-effect"
          >
            Upload, generate a QR code, and share files instantly across
            devices.
          </motion.p>
          <style jsx>{`
            .glow-effect {
              text-shadow: 0 0 6px rgba(72, 255, 99, 0.7),
                0 0 12px rgba(72, 255, 99, 0.5);
              transition: text-shadow 0.3s ease-in-out;
            }
            .glow-effect:hover {
              text-shadow: 0 0 10px rgba(72, 255, 99, 1),
                0 0 20px rgba(72, 255, 99, 0.8);
            }
          `}</style>
        </div>
      </main>

      {/* Cards Section */}
      <div className="container mx-auto px-4">
        <Cards />
      </div>

      {/* Fixed button in the bottom right corner */}
      <div className="fixed bottom-4 right-4">
        <Link href="https://github.com/Rohitk131">
          <AnimatedShinyTextDemo />
        </Link>
      </div>
  
      {/* Bottom Hemisphere Gradient */}
      <div className=" absolute -bottom-36 left-1/2 transform -translate-x-1/2 w-[1400px] h-[600px] rounded-t-full bg-gradient-to-t from-emerald-500/30 to-transparent blur-3xl" />
    </div>
  );
}
