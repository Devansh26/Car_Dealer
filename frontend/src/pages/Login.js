import React, { useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import illustration from "../images/login-illustration.svg";
import logo from "../images/logo.svg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import CarService from "../Service/CarService";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import "../css/login.css"

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-8 sm:p-12 flex flex-col items-center justify-center`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-16 mb-8`;
const MainContent = tw.div`mt-8 w-full flex flex-col items-center`;
const Heading = tw.h1`text-3xl xl:text-4xl font-extrabold text-center mb-4`;
const FormContainer = tw.div`w-full max-w-xs`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 py-3 px-6 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6`}
  }

  .text {
    ${tw`ml-2`}
  }
`;
const LinksContainer = tw.div`mt-4 text-sm text-gray-600 text-center`;

const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

export default ({
                    logoLinkUrl = "#",
                    illustrationImageSrc = illustration,
                    headingText = "Sign In",
                    submitButtonText = "Sign In",
                    SubmitButtonIcon = LoginIcon,
                    forgotPasswordUrl = "#",
                    signupUrl = "/signup",
                    homeUrl = "/",
                }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });



    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await CarService.login(formData);
            //console.log(response.data.status);
            if (response.data.status) {
                //alert("success");
                toast.success("Login successful");

                const { token, firstName, username } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("username", username);

                // Redirect or perform any other action upon successful login
                navigate('/');
            } else {
                toast.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Error during login");
        }
    };

    return (
        <AnimationRevealPage>
            <Container>
                <Content>
                    <MainContainer>
                        <ToastContainer />
                        <LogoLink href={logoLinkUrl}>
                            <LogoImage src={logo} alt="Logo" />
                        </LogoLink>
                        <MainContent>
                            <Heading>{headingText}</Heading>
                            <FormContainer>
                                <Form onSubmit={handleSubmit}>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <SubmitButton type="submit">
                                        <SubmitButtonIcon className="icon" />
                                        <span className="text">{submitButtonText}</span>
                                    </SubmitButton>
                                </Form>
                                <LinksContainer>
                                    <p>
                                        <a href={forgotPasswordUrl}>Forgot Password?</a>
                                    </p>
                                    <p>
                                        Don't have an account?{" "}
                                        <a href={signupUrl}>Sign Up</a>
                                    </p>
                                    <p>
                                        <a href={homeUrl}>Back to Home</a>
                                    </p>
                                </LinksContainer>
                            </FormContainer>
                        </MainContent>
                    </MainContainer>
                    <IllustrationContainer>
                        <IllustrationImage imageSrc={illustrationImageSrc} />
                    </IllustrationContainer>
                </Content>
            </Container>
        </AnimationRevealPage>


    );
};
