import express, { Application, Request, Response } from "express";
import cors from "cors";
import cockieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandlers";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
import passport from "../src/app/middleware/passport";

const app: Application = express();

// parser
app.use(express.json());
app.use(cockieParser());
app.use(passport.initialize());
// const allowedOrigins = [ "http://localhost:3000"]
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));


app.set('view engine', 'ejs')

// application routes
app.use("/", router);

// Test route
app.get("/", async (req: Request, res: Response) => {
  const message = "Auth Pay server is running";
  res.send(message);
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
