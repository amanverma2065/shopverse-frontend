import dummyAddress from "./dummyAddress";
import { dummyProduct } from "./dummyProduct";

const dummyOrders = [
    {
        _id: "69bahbsahghajbjshkahkjhfkhjash",
        userId: "69ncuhdafhjbdhfdgu",
        items: [
            {
                product: dummyProduct[3],
                quantity: 2,
                _id: 3
            },
        ],
        amount: 89,
        address: dummyAddress[0],
        status: "Order Placed",
        paymentType: "Online",
        isPaid: true,
        createdAt: "2025-03-25T07:18:46.018z",
        updatedAt: "2025-03-25T07:19:46.018z",
    },
    {
        _id: "70bahbsahghajbjshkahkjhfkhjash",
        userId: "70ncuhdafhjbdhfdgu",
        items: [
            {
                product: dummyProduct[5],
                quantity: 4,
                _id: 5
            },
            {
                product: dummyProduct[6],
                quantity: 2,
                _id: 6
            },
        ],
        amount: 69,
        address: dummyAddress[1],
        status: "Order Placed",
        paymentType: "COD",
        isPaid: false,
        createdAt: "2025-03-25T07:20:46.018z",
        updatedAt: "2025-03-25T07:21:46.018z",
    }
]

export default dummyOrders;