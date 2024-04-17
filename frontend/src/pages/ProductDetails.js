import React, {useState, useEffect} from "react";
import tw from "twin.macro";
import {css} from "styled-components/macro"; //eslint-disable-line

import {PrimaryButton as PrimaryButtonBase} from "../components/misc/Buttons.js";
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Header from "../components/headers/light";
import Footer from "../components/footers/MiniCenteredFooter.js";
import {useParams} from "react-router-dom";
import CarService from "../Service/CarService";
import {ReactComponent as CloseIcon} from "feather-icons/dist/icons/x.svg";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation} from "swiper/modules";

import "../css/productdetails.css"
import styled from "styled-components";
import ReactModalAdapter from "../helpers/ReactModalAdapter";

export default () => {
    const {carId} = useParams();
    const [carDetails, setCarDetails] = useState(null);

    // const imageCss = tw`rounded-4xl`;

    const StyledModal = styled(ReactModalAdapter)`
      &.mainHeroModal__overlay {
        ${tw`fixed inset-0 z-50`}
      }

      &.mainHeroModal__content {
        width: 500px;
        height: 400px;
        ${tw`xl:mx-auto m-4 sm:m-16 absolute inset-0 flex justify-center items-center rounded-lg bg-white outline-none`} /* Removed fixed sizing */
      }

      .content {
        ${tw`max-w-md lg:p-8 p-4 relative`} /* Responsive sizing with max-width */ box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
      }

      address {
        ${tw`block mt-4 p-2 bg-gray-100 rounded-md`} /* Adding padding and background color */
      }

      .highlight {
        ${tw`text-primary-500 font-bold`} /* Applying a bold font and a custom color */
      }

    `;

    const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500`;


    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await CarService.getCarById(carId); // Assuming you have this function in CarService
                setCarDetails(response);
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        };

        fetchCarDetails();
    }, [carId]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [carResponse, setCarResponse] = useState(false);

    const toggleModalClose = () => setModalIsOpen(!modalIsOpen);

    const toggleModal = async () => {
        try {

            const response = await CarService.buyVehicle(carId);
            console.log(response);
            if (response.status === true) {
                // Set the car response state to true
                setCarResponse(true);

                // Once the purchase is successful, set the selected car and open the modal
                setSelectedCar(carDetails);
                setModalIsOpen(!modalIsOpen);
            } else {
                setCarResponse(false);
                // You may want to handle the error or display a message to the user
                console.error("Error buying car:", response.message);
            }
        } catch (error) {
            // If there was an error with the API call, set the car response state to false
            setCarResponse(false);
            console.error("Error buying car:", error);
        }
    };

    return (
        <AnimationRevealPage>
            <Header/>

            {carDetails ? (
                <div className="main">
                    {/* Slider Section */}
                    <Swiper
                        rewind={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {/* Replace with your dynamic image rendering */}
                        <SwiperSlide>
                            {/*<img src={carDetails.images[0]} alt="Car" />*/}
                            <img src="https://images8.alphacoders.com/568/568490.jpg" alt="Car" loading="lazy"/>
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            {/*<img src={carDetails.images[1]} alt="Car" />*/}
                            <img src="https://i.pinimg.com/originals/07/8c/71/078c71955fe352c544e395fbafddf82c.jpg"
                                 alt="Car" loading="lazy"/>
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://w0.peakpx.com/wallpaper/324/853/HD-wallpaper-dodge-challenger-blue-blue-car-car-charger-sport-sport-car-sports-car-thumbnail.jpg"
                                alt="Car" loading="lazy"/>
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtVq8aUGc4d_GvvJeI5WPL88U32EYwZ77qBn-BdEuriLhmN8ljtPTGqRgb4SuMsLuR3RA&usqp=CAU"
                                alt="Car" loading="lazy"/>
                            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </SwiperSlide>
                        {/* ... Add more SwiperSlides for additional images */}
                    </Swiper>

                    {/* Car Information with Styling */}
                    <div tw="container mx-auto py-8">
                        <h2 tw="text-2xl font-bold mb-2">{carDetails.make} {carDetails.model}</h2>
                        <p tw="text-gray-700">{carDetails.color}</p>
                        <p tw="text-xl font-semibold mt-4">{carDetails.price}</p>

                        {/* Enhanced Buy Now Button */}
                        <PrimaryButtonBase tw="mt-6" onClick={toggleModal}>Buy Now</PrimaryButtonBase>
                    </div>

                    {/* Reuse your existing modal component here */}
                </div>
            ) : (
                <p>Loading car details...</p>
            )}

            <StyledModal
                closeTimeoutMS={300}
                className="mainHeroModal"
                isOpen={modalIsOpen}
                onRequestClose={toggleModalClose}
                shouldCloseOnOverlayClick={true}
            >
                <CloseModalButton onClick={toggleModalClose}>
                    <CloseIcon tw="w-6 h-6"/>
                </CloseModalButton>
                <div className="content">
                    {carResponse ? (
                        <>
                            <h2 className="text-xl font-bold text-center mb-4">Congratulations 🎉</h2>
                            <p>
                                Your reservation for <span className="highlight">{selectedCar?.make}</span> <span
                                className="highlight">{selectedCar?.model}</span> with
                                color <span className="highlight"> {selectedCar?.color} </span> is done.
                            </p>
                            <p className="mb-2">Come to the following store for further process:</p>
                            <address>480 University Ave Suite 1500, Toronto, ON M5G 1V2</address>
                            <a href="/orders" className="text-primary-500 hover:underline">
                                Check your order status here
                            </a>
                        </>
                    ) : (
                        <p className="text-center">Vehicle not found. Sorry!</p>
                    )}
                </div>
            </StyledModal>

            <Footer/>
        </AnimationRevealPage>
    );
};
