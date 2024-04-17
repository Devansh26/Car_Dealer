import React, { useState, useEffect } from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";

import Footer from "../components/footers/MiniCenteredFooter.js";
import Header from "../components/headers/light";

import CarService from "../Service/CarService";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await CarService.getOrders();
                setOrders(ordersData.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await CarService.cancelOrder(orderId);

            // Update the orders state to reflect the canceled order
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.order_id === orderId
                        ? { ...order, order_status: "Canceled" }
                        : order
                )
            );

            console.log(response); // For debugging and/or success message
        } catch (error) {
            console.error("Error canceling order:", error);
            // Handle error (e.g., display an error message to the user)
        }
    };


    return (
        <AnimationRevealPage>
            <Header/>
            <div css={container}>
                <h1>My Orders</h1>
                <table css={table}>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Vehicle Make</th>
                        <th>Vehicle Model</th>
                        <th>Order Status</th>
                        <th>Delivery Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.vehicle.make}</td>
                            <td>{order.vehicle.model}</td>
                            <td>{order.order_status}</td>
                            <td>{order.delivery_date}</td>
                            <td>
                                {order.order_status !== "Canceled" && (
                                    <button onClick={() => handleCancelOrder(order.order_id)}>
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </AnimationRevealPage>
    );
};

export default Orders;

const container = css`
    max-width: 800px;
    margin: auto;
    padding: 20px;
`;

const table = css`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
    }
`;

