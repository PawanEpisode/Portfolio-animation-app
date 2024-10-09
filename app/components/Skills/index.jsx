import { PROFILE_SKILLS_IMAGE_ARRAY } from '@/app/utils/constants';
import OrbitingCircles from '../OrbitingCircles/index';

const Skills = () => {

    return (
        <div className="w-full flex flex-col bg-gradient-to-r from-emerald-100 to-red-300 pb-20">
        {
            PROFILE_SKILLS_IMAGE_ARRAY.slice(1).map(eachSkill => (
                <OrbitingCircles 
                    key={eachSkill?.category} 
                    skillCategory={eachSkill?.category} 
                    skills={eachSkill?.skills} />
            ))
        }
        </div>
    );
};

export default Skills;