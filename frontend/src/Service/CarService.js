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

const getCarById = async (carId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await http.get(`/vehicles/${carId}`, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching car details:", error);
        throw error; // Re-throw to pass it up to the component
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

const cancelOrder = async (orderId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await http.delete(`/orders/cancel/${orderId}`, config);
        return response.data;
    } catch (error) {
        console.error("Error cancelling order:", error);
        throw error;
    }
};


const CarService = {
    login,
    signup,
    getCars,
    buyVehicle,
    getOrders,
    getCarById,
    cancelOrder,

};

export default CarService;
