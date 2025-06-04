import express from "express";
import * as  cartController from "../controllers/cart.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const cartRoutes = express.Router();

cartRoutes.get('/',
    authMiddleware.checkToken,
    cartController.getAllItems
);

cartRoutes.post("/",
    authMiddleware.checkToken,
    cartController.addItem
);

cartRoutes.delete('/:id',
    authMiddleware.checkToken,
    cartController.removeItem
);

cartRoutes.patch('/',
    authMiddleware.checkToken,
    cartController.clearCart
);

export default cartRoutes;

