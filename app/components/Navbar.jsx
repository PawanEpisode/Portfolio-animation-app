'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Make sure to register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Navbar = () => {
    const navbarRef = useRef(null);

    useEffect(() => {
        const navbar = navbarRef.current;

        // Initial state: navbar is visible
        gsap.set(navbar, { y: 0 });

        // Create the animation
        const tl = gsap.timeline({
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: '+=200',
            scrub: true,
        },
        });

        // Animate navbar out of view
        tl.to(navbar, {
        y: '-100%',
        duration: 0.5,
        ease: 'power2.inOut',
        });

        // Animate navbar back into view when scrolling up
    ScrollTrigger.create({
        trigger: document.body,
        start: 'top top-=100',
        end: 'bottom top-=100',
        onUpdate: (self) => {
            if (self.direction === -1) {
            gsap.to(navbar, {
                y: '0%',
                duration: 0.5,
                ease: 'power2.out',
            });
            } else {
            gsap.to(navbar, {
                y: '-100%',
                duration: 0.5,
                ease: 'power2.in',
            });
            }
        },
    });

    // Clean up
    return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <nav ref={navbarRef} className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-red-600">Animate</div>
            <div className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-blue-600 transition duration-300 text-gray-600">Home</a>
            <a href="#" className="hover:text-blue-600 transition duration-300 text-gray-600">About</a>
            <a href="#" className="hover:text-blue-600 transition duration-300 text-gray-600">Services</a>
            <a href="#" className="hover:text-blue-600 transition duration-300 text-gray-600">Contact</a>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Get Started
            </button>
        </div>
        </nav>
    );
};

export default Navbar;