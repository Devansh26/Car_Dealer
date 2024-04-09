import http from "../http-common";

const token = localStorage.getItem("token");

const login = (loginData) => {
    return http.post("auth/login", loginData);
};

const signup = (signUpData) => {
    return http.post("auth/signup", signUpData);
};


const getCars = async () => {
    try {
        // Set the authorization header with the token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        // Make the GET request to the /vehicles endpoint
        const response = await http.get("/vehicles", config);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle any errors
        console.error("Error fetching cars:", error);
        throw error;
    }
};

const getOrders = async () => {
    try {
        // Set the authorization header with the token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        // Make the GET request to the /vehicles endpoint
        const response = await http.get("/orders/my-orders", config);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle any errors
        console.error("Error fetching cars:", error);
        throw error;
    }
};

const buyVehicle = async (carId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        // Make the POST request to the /buy/:id endpoint
        const response = await http.post(`/vehicles/buy/${carId}`,{} , config);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle any errors
        console.error("Error buying car:", error);
        throw error;
    }
};

const CarService = {
    login,
    signup,
    getCars,
    buyVehicle,
    getOrders,
};

export default CarService;
