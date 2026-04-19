"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
                className
            )}
        >
            <div className="absolute inset-0 bg-fixed bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <motion.div
                animate={{
                    x: ["0%", "100%"],
                    y: ["0%", "100%"],
                }}
                transition={{
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute left-0 top-0 h-[20rem] w-[20rem] rounded-full bg-purple-500/20 blur-[6rem]"
            ></motion.div>
            <motion.div
                animate={{
                    x: ["100%", "0%"],
                    y: ["0%", "100%"],
                }}
                transition={{
                    duration: 45,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute right-0 top-0 h-[25rem] w-[25rem] rounded-full bg-indigo-500/20 blur-[6rem]"
            ></motion.div>
            <motion.div
                animate={{
                    x: ["100%", "0%"],
                    y: ["100%", "0%"],
                }}
                transition={{
                    duration: 50,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-blue-500/20 blur-[6rem]"
            ></motion.div>
        </div>
    );
};
