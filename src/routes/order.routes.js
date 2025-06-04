import express from "express";
import * as orderController from "../controllers/order.controllers.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";


const orderRoutes = express.Router();

orderRoutes.get('/',
     authMiddleware.checkToken,
    orderController.getOrder
);

orderRoutes.post('/',
    authMiddleware.checkToken,
    orderController.createOrder
);

orderRoutes.patch('/',
     authMiddleware.checkToken,
    orderController.changeStatusOrder
);

export default orderRoutes;
