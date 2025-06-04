import express from "express";
import * as itemController from "../controllers/items.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as itemMiddleware from "../middlewares/items..middlrewares.js"


const itemsRoutes = express.Router();

itemsRoutes.get('/',
    itemController.getAll,
);

itemsRoutes.get('/:id',
    itemController.getById,
);

itemsRoutes.post('/',
    itemMiddleware.checkValideItems,
    authMiddleware.checkToken,
    authMiddleware.checkRole("USER"),
    itemController.createItem,
);

itemsRoutes.patch('/:id',
    itemMiddleware.changeValidate,
    authMiddleware.checkToken,
    authMiddleware.checkRole("USER"),
    itemController.updateItem,
);

itemsRoutes.delete('/:id',
    authMiddleware.checkToken,
    authMiddleware.checkRole("USER"),
    itemController.deleteItem,
);

export default itemsRoutes;

