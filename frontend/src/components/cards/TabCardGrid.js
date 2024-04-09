import React, {useEffect, useState} from "react";

import ReactModalAdapter from "../../helpers/ReactModalAdapter.js";
import {motion} from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro";
import {Container, ContentWithPaddingXl} from "../misc/Layouts.js";
import {SectionHeading} from "../misc/Headings.js";
// import { ReactComponent as StarIcon } from "../../images/star-icon.svg";
import {ReactComponent as CloseIcon} from "feather-icons/dist/icons/x.svg";
import {PrimaryButton as PrimaryButtonBase} from "../misc/Buttons.js";
import {ReactComponent as SvgDecoratorBlob1} from "../../images/svg-decorator-blob-5.svg";
import {ReactComponent as SvgDecoratorBlob2} from "../../images/svg-decorator-blob-7.svg";
import CarService from "../../Service/CarService";

import "../../css/cars.css";


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardButton = tw(PrimaryButtonBase)`text-xs py-3 px-3`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-xl font-semibold mb-2`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

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


const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Fetch cars data from the API

        const fetchCars = async () => {
            try {
                const response = await CarService.getCars();
                setCars(response); // Set the fetched cars data to the state
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        fetchCars();
    }, []);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [selectedCar, setSelectedCar] = useState(null);
    const [carResponse, setCarResponse] = useState(false);

    const toggleModalClose = () => setModalIsOpen(!modalIsOpen);

    const toggleModal = async (car) => {
        try {

            const response = await CarService.buyVehicle(car._id);
            console.log(response);
            if (response.status === true) {
                // Set the car response state to true
                setCarResponse(true);

                // Once the purchase is successful, set the selected car and open the modal
                setSelectedCar(car);
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
        <Container>
            <ContentWithPaddingXl>
                <HeaderRow>
                    <Header>#Trending <HighlightedText>Cars</HighlightedText></Header>
                </HeaderRow>

                <TabContent>
                    {cars.map((car, index) => (
                        <CardContainer key={index}>
                            <Card href={car.url} initial="rest" whileHover="hover" animate="rest">
                                <CardImageContainer imageSrc={car.imageSrc}>
                                    <CardRatingContainer>
                                        <CardRating>
                                            {car.year}
                                        </CardRating>
                                    </CardRatingContainer>
                                </CardImageContainer>
                                <CardText>
                                    <CardTitle>{car.make}</CardTitle>
                                    <CardContent>{car.model}</CardContent>
                                    <CardContent>{car.color}</CardContent>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <CardPrice>{car.price}</CardPrice>
                                        <CardButton onClick={() => toggleModal(car)}>Buy Now</CardButton>
                                    </div>
                                </CardText>
                            </Card>
                        </CardContainer>
                    ))}
                </TabContent>
            </ContentWithPaddingXl>
            <DecoratorBlob1/>
            <DecoratorBlob2/>

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
                                Your reservation for <span className="highlight">{selectedCar?.make}</span> <span className="highlight">{selectedCar?.model}</span> with
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

        </Container>
    );
};

export default CarList;
