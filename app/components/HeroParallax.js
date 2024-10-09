'use client'
import styles from './HeoParallax.module.scss'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
// import { slideUp } from './animation';
import { motion } from 'framer-motion';

import { useRef, useEffect, useState, useLayoutEffect,  } from "react";

const slideUp = {
    initial: {
        y: 300
    },
    enter: {
        y: 0,
        transition: {duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 2.5}
    }
}

function Parallax() {

    const [background, setBackground] = useState(20)

    const parallaxRef = useRef(null);
    const mountain3 = useRef(null);
    const mountain2 = useRef(null);
    const mountain1 = useRef(null);
    const cloudsBottom = useRef(null);
    const cloudsLeft = useRef(null);
    const cloudsRight = useRef(null);
    const stars = useRef(null);
    const sun = useRef(null);
    const copy = useRef(null);
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);
            var tl = gsap.timeline({
                defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: parallaxRef.current,
                    start: "top top",
                    end: "5000 bottom",
                    scrub: true,
                    pin: true,
                    onUpdate: (self) => {
                        setBackground(Math.ceil(self.progress * 100 + 20))
                    },
                },
            });
            tl.to(
                mountain3.current,
                {
                    y: "-=80",
                },
                0
            );
            tl.to(
                mountain2.current,
                {
                    y: "-=30",
                },
                0
            );
            tl.to(
                mountain1.current,
                {
                    y: "+=50",
                },
                0
            );
            tl.to(
                stars.current,
                {
                    top: 0,
                },
                0.5
            );
            tl.to(
                cloudsBottom.current,
                {
                    opacity: 0,
                    duration: 0.5
                },
                0
            );
            tl.to(
                cloudsLeft.current,
                {
                    x: "-20%",
                    opacity: 0,
                },
                0
            );
            tl.to(
                cloudsRight.current,
                {
                    x: "20%",
                    opacity: 0,
                },
                0
            );
            tl.to(
                sun.current,
                {
                    y: "+=210",
                },
                0
            );
            tl.to(
                copy.current,
                {
                    y: "-100%",
                    opacity: 1
                },
                0
            );
        });
        return () => ctx.revert();
    }, []);

    let xPercent = 0;
    let direction = -1;

    useLayoutEffect( () => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(slider.current, {
        scrollTrigger: {
            trigger: document.documentElement,
            scrub: 0.25,
            start: 0,
            end: window.innerHeight,
            onUpdate: e => direction = e.direction * -1
        },
        x: "-500px",
        })
        requestAnimationFrame(animate);
    }, [])

    const animate = () => {
        if(xPercent < -100){
        xPercent = 0;
        }
        else if(xPercent > 0){
        xPercent = -100;
        }
        gsap.set(firstText.current, {xPercent: xPercent})
        gsap.set(secondText.current, {xPercent: xPercent})
        requestAnimationFrame(animate);
        xPercent += 0.1 * direction;
    }

    return (
        <motion.main className="parallax-outer">
            <div ref={parallaxRef} style={{ background: `linear-gradient(#0F2B9C, #673D7D ${background}%, #A74A67, #EDFC54 )` }} className='parallax'>
                <img ref={mountain3} className='mountain-3' src="/parallax/mountain-3.svg" alt='parallax-mountain3' />
                <img ref={mountain2} className='mountain-2' src="/parallax/mountain-2.svg" alt='parallax-mountain2' />
                <img ref={mountain1} className='mountain-1' src="/parallax/mountain-1.svg" alt='parallax-mountain1' />
                <img ref={sun} className='sun' src="/parallax/sun.svg" alt='parallax-sun' />
                <img ref={cloudsBottom} className='clouds-bottom' src="/parallax/cloud-bottom.svg" alt='parallax-cloudbottom' />
                <img ref={cloudsLeft} className='clouds-left' src="/parallax/clouds-left.svg" alt='parallax-clouds-left' />
                <img ref={cloudsRight} className='clouds-right' src="/parallax/clouds-right.svg" alt='parallax-clouds-right' />
                <img ref={stars} className='stars' src="/parallax/stars.svg" alt='parallax-stars' />
                <div ref={copy} className="copy">
                    <h1>Code is like humor. When you have to explain it, it’s bad. – Cory House</h1>
                    <h1>I’m not a great programmer; I’m just a good programmer with great habits. ― Kent Beck</h1>
                </div>
            </div>
            <div className={styles.sliderContainer}>
                <div ref={slider} className={styles.slider}>
                    <p className='gradient-text' ref={firstText}>Engineer & Developer -</p>
                    <p className='gradient-text' ref={secondText}>Engineer & Developer -</p>
                </div>
            </div>
        </motion.main>
    )
}

export default Parallax