import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import swaggerUi from 'swagger-ui-express';
import { apiSpec } from './docs/openapi.js';

// import { userRouter } from "./routes/user.routes.js";
import { authRouter } from "./routes/auth.routes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("public"));


app.use("/api/v1/auth", authRouter);

// Mount the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

// Redirect root to docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});





export {app};