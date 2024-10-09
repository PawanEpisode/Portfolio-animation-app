'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader/index';
import ProfileDescription from './components/ProfileDescription/index';
import SlidingTestimonials from './components/SlidingTestimonials/index';
import Contact from './components/Contact/index';

import PortfolioLandingPage from "./components/PortfolioLanding";
import { StickyScroll } from './components/StickyScrollReveal';
import Skills from './components/Skills';
import CoreSkills from './components/CoreSkills';
import { STICKY_SCROLL_REVEAL_CONTENT } from './utils/constants';

export default function Home() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        (
        async () => {
            const LocomotiveScroll = (await import('locomotive-scroll')).default
            const locomotiveScroll = new LocomotiveScroll();

            setTimeout( () => {
                setIsLoading(false);
                document.body.style.cursor = 'default'
                window.scrollTo(0,0);
            }, 2000)
        }
        )()
    }, [])

    return (
        <main className={styles.main}>
            <AnimatePresence mode='wait'>
                {isLoading && <Preloader />}
            </AnimatePresence>
            <PortfolioLandingPage />
            {/* <Landing /> */}
            <ProfileDescription />
            <div>
            <StickyScroll content={STICKY_SCROLL_REVEAL_CONTENT}/>
            </div>
            <CoreSkills />
            <Skills />
            {/* <Projects /> */}
            <SlidingTestimonials />
            <Contact />
        </main>
    );
}
