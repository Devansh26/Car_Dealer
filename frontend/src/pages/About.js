import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Team from "../components/cards/ProfileThreeColGrid"

import Footer from "../components/footers/MiniCenteredFooter.js";
import Header from "../components/headers/light";
const About = () => {



    return (
        <AnimationRevealPage>
            <Header/>
                <Team/>
            <Footer />
        </AnimationRevealPage>
    );
};

export default About;

