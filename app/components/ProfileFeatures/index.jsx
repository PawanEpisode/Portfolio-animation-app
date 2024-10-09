import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Make sure to register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const FeatureCard = ({ title, description, icon, technologies, delay }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
        controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.5, delay }}
        >
        <Card className="h-full">
            <CardHeader>
            <div className="text-4xl mb-4">{icon}</div>
            <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
            <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">
                    {tech}
                </Badge>
                ))}
            </div>
            </CardFooter>
        </Card>
        </motion.div>
    );
};

const FeaturesSection = () => {
    const sectionRef = useRef(null);

    const features = [
        {
        title: "Full Stack Expertise",
        description:
            "3 years of professional and 5 years of technical experience in modern web technologies.",
        icon: "💻",
        technologies: ["ReactJS", "TypeScript", "Node.js", "Python", "AWS"],
        },
        {
        title: "ML Platform Development",
        description:
            "Built a Low-Code ML feature platform for data scientists and engineers from scratch.",
        icon: "🧠",
        technologies: ["Custom Components", "Frontend Architecture", "DSA"],
        },
        {
        title: "Performance Optimization",
        description:
            "Improved SPA pages and augmented conversion rate by 25% through collaboration with UX/UI teams.",
        icon: "📈",
        technologies: ["SPA", "UX/UI", "Performance Optimization"],
        },
    ];

    useEffect(() => {
        const section = sectionRef.current;

        gsap.fromTo(
        section.querySelectorAll(".feature-card"),
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            },
        }
        );

        return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
            Key Features & Accomplishments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <div key={index} className="feature-card">
                <FeatureCard {...feature} delay={index * 0.2} />
                </div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default FeaturesSection;
