"use client";
import React from "react";
import { motion } from "motion/react";

export const CodeWindow = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative w-full max-w-lg mx-auto lg:mr-0"
        >
            <div className="relative rounded-xl bg-[#1e1e2e]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-xs text-white/30 font-mono">stream_processor.py</div>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-xs md:text-sm leading-relaxed text-blue-200/80 overflow-x-auto">
                    <pre className="whitespace-pre">
                        <code>
                            {[
                                { line: 1, content: <><span className="text-purple-400">from</span> <span className="text-white">pyspark.sql</span> <span className="text-purple-400">import</span> <span className="text-yellow-300">SparkSession</span></> },
                                { line: 2, content: <><span className="text-purple-400">from</span> <span className="text-white">pyspark.sql.functions</span> <span className="text-purple-400">import</span> <span className="text-white">*</span></> },
                                { line: 3, content: <br /> },
                                { line: 4, content: <><span className="text-white">spark</span> <span className="text-cyan-400">=</span> <span className="text-white">SparkSession.builder \</span></> },
                                { line: 5, content: <><span className="pl-8 text-white">.appName(</span><span className="text-green-400">"IoT-Stream"</span><span className="text-white">).getOrCreate()</span></> },
                                { line: 6, content: <br /> },
                                { line: 7, content: <><span className="text-white">df</span> <span className="text-cyan-400">=</span> <span className="text-white">spark.readStream \</span></> },
                                { line: 8, content: <><span className="pl-8 text-white">.format(</span><span className="text-green-400">"kafka"</span><span className="text-white">) \</span></> },
                                { line: 9, content: <><span className="pl-8 text-white">.option(</span><span className="text-green-400">"subscribe"</span><span className="text-white">, </span><span className="text-green-400">"sensors"</span><span className="text-white">).load()</span></> },
                                { line: 10, content: <br /> },
                                { line: 11, content: <><span className="text-white">query</span> <span className="text-cyan-400">=</span> <span className="text-white">df.groupBy(</span><span className="text-green-400">"sensor_id"</span><span className="text-white">) \</span></> },
                                { line: 12, content: <><span className="pl-8 text-white">.agg(avg(</span><span className="text-green-400">"temp"</span><span className="text-white">).alias(</span><span className="text-green-400">"avg_t"</span><span className="text-white">)) \</span></> },
                                { line: 13, content: <><span className="pl-8 text-white">.writeStream.start()</span></> },
                            ].map((item, idx) => (
                                <div key={idx} className="flex">
                                    <span className="w-8 text-white/20 select-none text-right mr-4">{item.line}</span>
                                    <span className="block">{item.content}</span>
                                </div>
                            ))}
                        </code>
                    </pre>
                </div>

                {/* Animated Glow Behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/10 blur-3xl -z-10 animate-pulse"></div>
            </div>

            {/* Decorative Elements */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-600/20 rounded-full blur-2xl"
            />
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-6 -top-6 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"
            />
        </motion.div>
    );
};
