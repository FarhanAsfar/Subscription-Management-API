import { Router } from "express";
import { getUserSubscriptions, createSubscription } from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

//api/v1/subscription

subscriptionRouter.post("/", verifyJWT, createSubscription)

subscriptionRouter.get("/", verifyJWT, getUserSubscriptions)



subscriptionRouter.put("/:id", (req, res) => {
    res.send({title: "Update subscriptions"})
})

subscriptionRouter.delete("/:id", (req, res) => {
    res.send({title: "Delete subscriptions"})
})

// subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions)

subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send({title: "Cancel subscriptions"})
})

subscriptionRouter.post("/upcoming-renewals", (req, res) => {
    res.send({title: "GET upcoming Renewals"})
})


export {subscriptionRouter};