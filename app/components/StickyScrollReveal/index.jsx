"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";

export const StickyScroll = ({ content }) => {
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
            return index;
        }
        return acc;
        }, 0);
        setActiveCard(closestBreakpointIndex);
    });

    const backgroundColors = [
        "bg-slate-900",
        "bg-black",
        "bg-neutral-900",
    ];
        const linearGradients = [
            "linear-gradient(to bottom right, rgba(6, 182, 212, 0.8), rgba(16, 185, 129, 0.8))", 
            "linear-gradient(to bottom right, rgba(236, 72, 153, 0.8), rgba(99, 102, 241, 0.8))", 
            "linear-gradient(to bottom right, rgba(249, 115, 22, 0.8), rgba(234, 179, 8, 0.8))", 
        ];

    const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    }, [activeCard]);

    const getGradientStyle = () => {
        return {
            backgroundImage: backgroundGradient,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
        };
    }

    const getGradientStyleByOpacity = (opacity) => {
        return backgroundGradient.replace('0.8', opacity)
    }
    return (
        <motion.div
        ref={containerRef}
        animate={{
            backgroundImage: backgroundColors[activeCard % backgroundColors.length],
        }}
        style={{background: getGradientStyleByOpacity(0.04)}}
        className="relative w-full h-[200vh] flex justify-center space-x-10 rounded-md" // Increased height to allow for scrolling
        >
        <div className=" w-full sticky top-12 flex justify-center h-[80vh] overflow-hidden p-10">
        <div className="w-full">
                {content.map((item, index) => ( activeCard === index ? 
                <div key={item.title + index} ref={contentRef} className="w-full shadow-2xl rounded-3xl 
                flex flex-col justify-center gap-6 items-center px-4 py-10 border-2 border-[rgba(6, 182, 212, 0.8)] ">
                    <h2 style={getGradientStyle(index)} className="w-full text-6xl leading-2 text-center font-bold">{item.title}</h2>
                    <div className="w-full flex justify-center items-center">
                        <motion.div
                        key={item.title + index}
                        initial={{ opacity: 1, y: 0, display: 'block' }}
                        animate={{
                        opacity: activeCard === index ? 1 : 0,
                        y: 0,
                        display: activeCard === index ? 'block' : 'hidden',
                        visibility: activeCard === index ? 'visible' : 'hidden'
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-full mb-20"
                        >
                            {/* <h2 style={getGradientStyle(index)} className="w-full text-6xl leading-2 text-center font-bold">{item.title}</h2> */}
                            <p className="w-full px-10 text-4xl text-black mt-10">{item.description}</p>
                        </motion.div>
                        <motion.div
                            style={{ background: backgroundGradient }}
                            animate={{
                                y: 0,
                                visibility: activeCard === index ? 'visible' : 'hidden'
                            }}
                            transition={{ duration: 0.3 }}
                            className="h-60 w-80  rounded-md flex-shrink-0 overflow-hidden px-10"
                            >
                            <div key={index} className="h-full w-full">
                                {item.content ?? null}
                            </div>
                        </motion.div>
                    </div>
                    </div>: null
                ))}
            </div>
        </div>
        </motion.div>
    );
};
