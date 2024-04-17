import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";

import Contact from "../components/forms/TwoColContactUsWithIllustrationFullForm"

import Footer from "../components/footers/MiniCenteredFooter.js";
import Header from "../components/headers/light";
const Contactus = () => {



    return (
        <AnimationRevealPage>
            <Header/>
                <Contact/>
            <Footer />
        </AnimationRevealPage>
    );
};

export default Contactus;

