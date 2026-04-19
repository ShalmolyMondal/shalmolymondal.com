'use client';

import { useEffect } from 'react';
import { motion, useAnimate } from 'motion/react';

export default function TextGenerateEffect({
    words,
    className = '',
    delay = 0,
}: {
    words: string;
    className?: string;
    delay?: number;
}) {
    const [scope, animate] = useAnimate();
    const wordsArray = words.split(' ');

    useEffect(() => {
        animate(
            'span',
            {
                opacity: 1,
                filter: 'blur(0px)',
            },
            {
                duration: 2,
                delay: (i) => i * 0.15 + delay, // Staggered delay + initial delay
            }
        );
    }, [scope.current, animate, delay]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className={`opacity-0 blur-sm inline-block mr-2 ${className}`}
                        >
                            {word}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return <div className={className}>{renderWords()}</div>;
}
