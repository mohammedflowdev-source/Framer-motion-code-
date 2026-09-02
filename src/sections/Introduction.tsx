"use client";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";

import Tag from "@/components/Tag";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const text = `You're racing to create exceptional work, but traditional design tools slow you down with unnecessary complexity and steep learning curves.`;
const words = text.split(' ');

export default function Introduction() {
    const scrolTarget = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: scrolTarget, offset: ['start end', 'end end'] })
    const [currentWord, setCurrentWord] = useState(0)
    const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

    useMotionValueEvent(wordIndex, "change", (latest) => {
        setCurrentWord(latest);
    });

    return <section className="py-28 lg:py-40">
        <div className="container">
            <div className="sticky top-20">
                <div className="flex justify-center">
                    <Tag>Introducing Layers</Tag>
                </div>
                <div className="text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10">
                    <span>Your creative process deserve better.</span>{" "}
                    <span className="">
                        {words.map((word, wordIndex) => (
                            <span key={wordIndex} className={twMerge("transition duration-500 text-white/15", wordIndex < currentWord && 'text-white')}>{`${word} `}</span>
                        ))}
                    </span>
                    <span className="text-lime-400 block">That&apos;s why we build Layers.</span>
                </div>
            </div>
            <div className="h-[150vh]" ref={scrolTarget}></div>
        </div>
    </section>;
}
