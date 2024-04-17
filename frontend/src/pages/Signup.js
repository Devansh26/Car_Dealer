import React, { useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import illustration from "../images/signup-illustration.svg";
import logo from "../images/logo.svg";
import CarService from "../Service/CarService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import "../css/signup.css";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8 overflow-hidden`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-20 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col items-center justify-center`;
const LogoLink = tw.a`mt-4`;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-3xl xl:text-4xl font-extrabold mb-4`;
const FormContainer = tw.div`w-full max-w-md`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-base focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;

const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 py-3 px-6 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6`}
  }

  .text {
    ${tw`ml-2`}
  }
`;
const LinksContainer = tw.div`mt-8 text-sm text-gray-600 text-center`;
const Link = tw.a`border-b border-gray-500 border-dotted`;

const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export default ({
                    logoLinkUrl = "#",
                    illustrationImageSrc = illustration,
                    headingText = "Sign Up",
                    submitButtonText = "Sign Up",
                    SubmitButtonIcon = SignUpIcon,
                    tosUrl = "#",
                    privacyPolicyUrl = "#",
                    signInUrl = "/login",
                    homeUrl = "/",
                }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
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
            const response = await CarService.signup(formData);
            if (response.data.status) {
                toast.success(response.data.message);
                // Redirect or perform any other action upon successful signup
                navigate('/login');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("Error during signup");
        }
    };

    return (
        <AnimationRevealPage className="container">
            <Container>
                <Content>
                    <MainContainer>
                        <LogoLink href={logoLinkUrl}>
                            <LogoImage src={logo} alt="Logo"/>
                        </LogoLink>
                        <MainContent>
                            <Heading>{headingText}</Heading>
                            <FormContainer>
                                <Form onSubmit={handleSubmit}>
                                    <Input
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <SubmitButton type="submit">
                                        <SubmitButtonIcon className="icon"/>
                                        <span className="text">{submitButtonText}</span>
                                    </SubmitButton>
                                    <LinksContainer>
                                        <p>
                                            I agree to abide by treact's{" "}
                                            <Link href={tosUrl}>Terms of Service</Link> and its{" "}
                                            <Link href={privacyPolicyUrl}>Privacy Policy</Link>
                                        </p>
                                        <p>
                                            Already have an account?{" "}
                                            <Link href={signInUrl}>Sign In</Link>
                                        </p>
                                        <p>
                                            <a href={homeUrl}>Back to Home</a>
                                        </p>
                                    </LinksContainer>
                                </Form>
                            </FormContainer>
                        </MainContent>
                    </MainContainer>
                    <IllustrationContainer>
                        <IllustrationImage imageSrc={illustrationImageSrc}/>
                    </IllustrationContainer>
                </Content>
            </Container>
        </AnimationRevealPage>
    );
}
