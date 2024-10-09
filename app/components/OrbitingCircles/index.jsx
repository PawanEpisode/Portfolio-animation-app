import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';

const OrbitingCircles = ({ skills, skillCategory }) => {
    const solarSystemRef = useRef(null);

    useEffect(() => {
        const solarSystem = solarSystemRef.current;
        const orbits = solarSystem.querySelectorAll('.orbit');

        orbits.forEach((orbit, index) => {
        gsap.to(orbit, {
            rotation: 360,
            duration: 10 + Math.random()*20, // Outer orbits are slower
            repeat: -1,
            ease: "linear",
        });
        });
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div ref={solarSystemRef} className="relative w-full h-[800px]">
                <div style={{width: `${200+ skills.length*200}px`}} className={`absolute top-1/2 left-1/2 flex items-center justify-center  rounded-full -translate-x-1/2 -translate-y-1/2 z-10`}>
                    <span className=' w-48 h-48 flex items-center justify-center rounded-full text-slate-600 text-[180px] font-bold opacity-10'>
                    {skillCategory}
                    </span>
                </div>
                {skills?.map((skill, index) => {
                const orbitSize = 200 + index * 200; // Increase orbit size for each skill
                return (
                    <div key={skill} className={`orbit absolute top-1/2 left-1/2 z-${(skills.length - index) * 10} -translate-x-1/2 -translate-y-1/2`} style={{ width: `${orbitSize}px`, height: `${orbitSize}px` }}>
                    <div className="w-full h-full rounded-full border-2 border-gray-900 border-dashed opacity-20" />
                    <motion.div 
                        className="absolute cursor-pointer -top-8 left-1/2 -translate-x-1/2 
                        w-16 h-16 rounded-full bg-white flex items-center justify-center z-[100]"
                    >
                        <motion.span 
                        className="w-full object-cover rounded-full h-full"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        >
                        <Image 
                            fill={true}
                            alt={"image"}
                            src={`/skills/${skill}.png`}
                            className="w-full object-cover p-3 rounded-full h-full"
                        />
                        </motion.span>
                    </motion.div>
                    </div>
                );
                })}
            </div>
        </div>
    );
};

export default OrbitingCircles;