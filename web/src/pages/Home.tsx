import TopLeft from './TopLeft';

import HomeRowSection from '../features/home/HomeRowSection';
import RecommandVideoView from '../features/home/RecommandVideoView';
import Announcement from '../features/home/Announcement';
import FourColumnGrid from '../features/home/FourColumnGrid';
import TopCenter from '../features/home/TopCenter';
import BannerCarousel from '../features/home/BannerCarousel';
import React from "react";
import TopRight from "./TopRight";

const Home: React.FC = () => {
    return (
        <div>

            <section className="grid grid-cols-1 xl:grid-cols-[1fr_2fr_1fr] gap-4 mb-5">
                <TopCenter className="order-1 xl:order-2" />
                <TopLeft className="order-2 xl:order-1" />
                <TopRight className="order-3 xl:order-3" />
            </section>

            <section className="mb-5">
                <BannerCarousel />
            </section>

            <section className="mb-5">

                <HomeRowSection title={'XXX'}>
                    <FourColumnGrid>
                        <RecommandVideoView />
                    </FourColumnGrid>
                </HomeRowSection>

                <HomeRowSection title={'XXX'}>
                    <Announcement />
                </HomeRowSection>
            </section>

        </div>
    );
};

export default Home;
