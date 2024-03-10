import dotenv from "dotenv";
import express from "express";
import { createExpressServer, useExpressServer } from "routing-controllers";
import { routes } from "./src/controllers/index";
import { middlewaresList } from "./src/middleware/index";
import { context } from "./src/models/db-context";
import { authCheck } from "./src/middleware/auth-check";

dotenv.config();
const port = process.env.PORT || 5000;

function start() {
    try {
        const app: express.Express = createExpressServer({
            authorizationChecker: authCheck
        });

        app.use(express.json());

        useExpressServer(app, {
            controllers: routes,
            middlewares: middlewaresList,
            defaultErrorHandler: false,
        });

        context.authenticate()
            .then(() => {
                console.log("DATABASE CONNECTED");
            });

        context.sync()
            .then(() => {
                console.log("DATABASE SYNCHRONIZED")
            });

        app.listen(port, () => console.log(`Running on port ${port}`));
    } catch (err) {
        console.log(err.message);
    }
}

start();