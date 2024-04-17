import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro";
import {Container, ContentWithPaddingXl} from "../misc/Layouts.js";
import {SectionHeading} from "../misc/Headings.js";
import {ReactComponent as SvgDecoratorBlob1} from "../../images/svg-decorator-blob-5.svg";
import {ReactComponent as SvgDecoratorBlob2} from "../../images/svg-decorator-blob-7.svg";
import CarService from "../../Service/CarService";
import {Link} from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

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

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [priceFilter, setPriceFilter] = useState([0, 100000]);
    const [kmsFilter, setKmsFilter] = useState([0, 100000]);

    const fetchCars = async () => {
        try {
            const response = await CarService.getCars();
            setCars(response); // Set the fetched cars data to the state
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    useEffect(() => {

        fetchCars();
    }, [priceFilter, kmsFilter]);

    const filteredCars = cars.filter(car => {
        return (
            car.price >= priceFilter[0] &&
            car.price <= priceFilter[1] &&
            car.KMs >= kmsFilter[0] &&
            car.KMs <= kmsFilter[1]
        );
    });

    const handlePriceChange = value => {
        if (value === 0) {
            setPriceFilter([0, Infinity]);
        } else {
            setPriceFilter([0, value]);
        }
    };

    const handleKmsChange = value => {
        if (value === 0) {
            setKmsFilter([0, Infinity]);
        } else {
            setKmsFilter([0, value]);
        }
    };

    const priceTipFormatter = value => `$${value}`;
    const kmsTipFormatter = value => `${value} Kms`;

    return (
        <Container>
            <ContentWithPaddingXl>
                <HeaderRow>
                    <Header>#Trending <HighlightedText>Cars</HighlightedText></Header>
                </HeaderRow>

                <div tw="flex flex-col sm:flex-row justify-between mb-6">
                    <div style={{width: '350px'}}>
                        <h4 tw="text-gray-800">Price</h4>
                        <Tooltip
                            placement="top"
                            overlay={priceTipFormatter}
                        >
                            <Slider
                                min={0}
                                max={100000}

                                onChange={handlePriceChange}
                                allowCross={false}

                            />
                        </Tooltip>
                    </div>
                    <div style={{width: '350px'}}>
                        <h4 tw="text-gray-800">Kilometers</h4>
                        <Tooltip
                            placement="top"
                            overlay={kmsTipFormatter()}
                        >
                            <Slider
                                min={0}
                                max={100000}
                                onChange={handleKmsChange}
                                allowCross={false}
                                trackStyle={[{backgroundColor: '#5e72e4'}]}
                                handleStyle={[{borderColor: '#5e72e4'}, {borderColor: '#5e72e4'}]}
                                railStyle={{backgroundColor: '#d8d8d8'}}
                            />
                        </Tooltip>
                    </div>
                </div>

                <TabContent>
                    {filteredCars.map((car, index) => (
                        <CardContainer key={index}>
                            <Link to={`/product-details/${car._id}`}>
                                <Card initial="rest" whileHover="hover" animate="rest">
                                    <CardImageContainer imageSrc={car.imageSrc}>
                                        <CardRatingContainer>
                                            <CardRating>{car.year}</CardRating>
                                        </CardRatingContainer>
                                    </CardImageContainer>
                                    <CardText>
                                        <CardTitle>{car.make}</CardTitle>
                                        <CardContent>{car.model}</CardContent>
                                        <CardContent>{car.color}</CardContent>
                                        <CardPrice>{car.price}</CardPrice>
                                        <CardPrice>Kms: {car.KMs}</CardPrice>
                                    </CardText>
                                </Card>
                            </Link>
                        </CardContainer>
                    ))}
                </TabContent>
            </ContentWithPaddingXl>
            <DecoratorBlob1/>
            <DecoratorBlob2/>
        </Container>
    );
};

export default CarList;
