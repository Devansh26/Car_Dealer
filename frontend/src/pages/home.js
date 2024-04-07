import React from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "../components/hero/TwoColumnWithVideo.js";
import Features from "../components/features/ThreeColSimple.js";
import MainFeature from "../components/features/TwoColSingleFeatureWithStats.js";
import SliderCard from "../components/cards/ThreeColSlider.js";
import TrendingCard from "../components/cards/TwoTrendingPreviewCardsWithImage.js";
import Blog from "../components/blogs/PopularAndRecentBlogPosts.js";
import Testimonial from "../components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "../components/faqs/SimpleWithSideImage.js";
import SubscribeNewsLetterForm from "../components/forms/SimpleSubscribeNewsletter.js";
import Footer from "../components/footers/MiniCenteredFooter.js";
import tw from "twin.macro";

import "../css/home.css"

export default () => {

    const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
    const imageCss = tw`rounded-4xl`;
    const imageWidth = tw`w-96`;
    const imageHeight = tw`h-96`;

    return (

        <AnimationRevealPage>
            <Hero
                heading={<>Best & Affordable <HighlightedText>Cars for You.</HighlightedText></>}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                imageSrc="https://i.pinimg.com/originals/80/8a/00/808a004f4663801c74e3a41d233db7ee.jpg"
                imageCss={[imageCss, imageWidth, imageHeight]}
                imageDecoratorBlob={true}
                primaryButtonText="Rent Now"
            />
            <Features/>
            <SliderCard/>
            <TrendingCard/>
            <MainFeature/>
            <Blog/>
            <Testimonial textOnLeft={true}/>
            <FAQ/>
            <SubscribeNewsLetterForm/>
            <Footer/>
        </AnimationRevealPage>
    );
}
