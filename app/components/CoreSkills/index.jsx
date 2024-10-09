import { PROFILE_SKILLS_IMAGE_ARRAY } from '@/app/utils/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CoreSkills = () => {
    const coreSkills = [...PROFILE_SKILLS_IMAGE_ARRAY[0]?.['skills']];
    const gradientStyleHeading = {
        backgroundImage: "linear-gradient(to bottom right, rgba(6, 182, 212, 0.8), rgba(16, 185, 129, 0.8))",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
    }

    return (
        <div className='w-full flex flex-col gap-6 justify-start bg-gradient-to-b from-emerald-100 to-purple-300 pt-10'>
            <h1 className="w-full text-6xl leading-2 text-center font-bold" style={gradientStyleHeading}>Core Skills</h1>
            <div className="w-full p-10 flex flex-wrap gap-12 justify-between">
                {coreSkills.map(skill => (
                    <motion.div
                        key={skill}
                        whileHover={{ scale: 1.1 }} // Added scale for a nice effect
                        transition={{ duration: 0.6 }}
                        className="w-60 h-60 flex hover:shadow-2xl hover:border-orange-400 hover:animate-border-pulse transition-all duration-500 justify-center items-center border-2 border-purple-600 bg-gradient-to-r from-emerald-100 to-purple-300 rounded-full overflow-hidden"
                    >
                        <motion.img 
                            whileHover={{ rotate: 360, scale: 1.1 }} // Added scale for a nice effect
                            transition={{ duration: 0.6 }}
                            src={`/skills/${skill}.png`}
                            alt={`${skill} logo`}
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
        
    );
}


export default CoreSkills;