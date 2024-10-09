import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';

const testimonials1 = [
    {
    name: "Honey Sharma",
    text: "Amazing work! The website exceeded our expectations.",
    },
    {
    name: "Soumanta Das",
    text: "Amazing work! The website exceeded our expectations.",
    },
    {
    name: "Akash Sharma",
    text: "Highly skilled developer. Would definitely work with again.",
    },
    {
    name: "Usman Ali",
    text: "Delivered the project on time with excellent quality.",
    },
    {
    name: "Jitendra Pathak",
    text: "Highly skilled developer. Would definitely work with again.",
    },
    {
    name: "Sakshi Mehra",
    text: "Delivered the project on time with excellent quality.",
    },
];

const testimonials2 = [
    {
    name: "Soumanta Das",
    text: "Amazing work! The website exceeded our expectations.",
    },
    {
    name: "Akash Sharma",
    text: "Highly skilled developer. Would definitely work with again.",
    },
    {
    name: "Jitendra Pathak",
    text: "Highly skilled developer. Would definitely work with again.",
    },
    {
    name: "Sakshi Mehra",
    text: "Delivered the project on time with excellent quality.",
    },
    {
    name: "Usman Ali",
    text: "Delivered the project on time with excellent quality.",
    },
];

export default function index() {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

    return (
        <div ref={container} className={styles.slidingImages}>
            <motion.div style={{x: x1}} className={styles.slider}>
                    {
                        testimonials1.map( (project, index) => {
                            return <div key={index} className={styles.project} >
                                <div className=" bg-sky-100 text-sky-700 p-8 rounded-lg shadow-md max-w-lg text-center">
                                    <p className="text-lg mb-4">
                                        "{project.text}"
                                    </p>
                                    <p className="font-semibold">
                                        {project.name}
                                    </p>
                                </div>
                            </div>
                        })
                    }
            </motion.div>
            <motion.div style={{x: x2}} className={styles.slider}>
                {
                    testimonials2.map( (project, index) => {
                        return <div key={index} className={styles.project} >
                            <div className="bg-cyan-100 text-cyan-700 p-8 rounded-lg shadow-md max-w-lg text-center">
                                <p className="text-lg mb-4">
                                    "{project.text}"
                                </p>
                                <p className="font-semibold">
                                    {project.name}
                                </p>
                            </div>
                        </div>
                    })
                }
            </motion.div>
            <motion.div style={{height}} className={styles.circleContainer}>
                <div className={styles.circle}></div>
            </motion.div>
        </div>
    )
}