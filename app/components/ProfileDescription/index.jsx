import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
import { WobbleCard } from '@/app/common/WobbleCard';

const SUMMARY_EXPERTISE = [
    "Contributing to impactful projects that enhance user experiences.",
    "Expertise across the Software Development Lifecycle (SDLC).",
    "Involvement in requirement analysis, documentation, coding, testing, and maintenance.",
    "Thriving in dynamic environments with strong analytical skills.",
    "Effective collaboration with cross-functional teams through strong communication."
]

export default function ProfileDescription() {

    const phrase1 = "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <section className='w-full' style={{background: "linear-gradient(to bottom right, rgba(236, 72, 153, 0.2), rgba(99, 102, 241, 0.2))"}}>
            <div ref={description} className={styles.description}>
                <div className={styles.body}>
                    <p>
                    {
                        phrase1.split(" ").map( (word, index) => {
                            return <span key={index} className={styles.mask}><motion.span className='gradient-text' variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                        })
                    }
                    </p>
                    <div data-scroll data-scroll-speed={0.1}>
                        <Rounded className={styles.button}>
                            <p>About me</p>
                        </Rounded>
                    </div>
                    <motion.p className='gradient-text'  variants={opacity} animate={isInView ? "open" : "closed"}>The combination of my passion for design, code & interaction positions me in a unique place in the web design world.</motion.p>
                </div>
            </div>
            <div ref={description} style={{marginTop: '150px'}} className={styles.description}>
                <div className={styles.body}>
                <WobbleCard>
                    <SummaryComponent isInView={isInView}/>
                </WobbleCard>
                </div>
            </div>
        </section>
    )
}

const SummaryComponent = ({isInView}) => {

    const getReplaceWords = (text) => {
        return text.replace(/[""]/g,'').replace('[','').replace(']','').replace('.,','. ')
    }
    return (
        <div className="summary-container">
            <h2 className="summary-title max-w-full text-center text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-violet-600">Summary of My Expertise</h2>
            <div className='max-w-full flex gap-3 flex-col'>
            <p>
            {
                JSON.stringify(SUMMARY_EXPERTISE).split(" ").map( (word, index) => {
                    return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open": "closed"} key={index}>{getReplaceWords(word)}</motion.span></span>
                })
            }
            </p>
            </div>
        </div>
    );
};
