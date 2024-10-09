import { useState, useEffect } from 'react';
import { format } from 'date-fns'; // For date formatting
import { gsap } from 'gsap';
import './style.modules.scss';

const DateTimeComponent = () => {
    // const [currentTime, setCurrentTime] = useState(new Date());

    // useEffect(() => {
    //     // Function to update the time every second
    //     const intervalId = setInterval(() => {
    //     setCurrentTime(new Date());
    //     }, 1000);

    //     // GSAP animation on component mount
    //     gsap.fromTo(
    //     ".version-heading",
    //     { opacity: 0, y: -20 },
    //     { opacity: 1, y: 0, duration: 1 }
    //     );

    //     return () => clearInterval(intervalId); // Cleanup interval on unmount
    // }, []);
    const [currentTime, setCurrentTime] = useState(null); // Set to `null` initially for SSR

    useEffect(() => {
        // Function to update the time every second
        const updateTime = () => {
        setCurrentTime(new Date());
        };
        updateTime(); // Set initial time on mount

        const intervalId = setInterval(updateTime, 1000); // Update every second

        // GSAP animation on component mount
        gsap.fromTo(
        ".version-heading",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1 }
        );

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    // If `currentTime` is null, return null or loading indicator
    if (!currentTime) {
        return null; // Prevents SSR mismatch by rendering nothing on the server
    }

    return (
        <div className="datetime-container">
            <span>
                <h3 className="version-heading">Version</h3>
                <p>{format(currentTime, 'yyyy')} © Edition</p>
            </span>
            <span>
                <h3 className="version-heading">Time</h3>
                <p>{format(currentTime, 'hh:mm:ss a zzz')}</p>
            </span>
        </div>
    );
};

export default DateTimeComponent;
