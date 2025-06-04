import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import itemsRoutes from "./routes/items.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from './routes/order.routes.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use('/user',authRoutes);
app.use('/items',itemsRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);


export default app;