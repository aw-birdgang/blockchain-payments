import {useEffect, useState} from 'react';
import {Carousel} from '@material-tailwind/react';

export default function BannerCarousel() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Carousel className="rounded-xl">
            <div className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="h-14 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="h-14 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="h-14 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </Carousel>
    );
}
