import { Router } from "express";
import { getUserSubscriptions, createSubscription, cancelSubscription } from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

//api/v1/subscription

subscriptionRouter.post("/create-subscription", verifyJWT, createSubscription)

subscriptionRouter.get("/", verifyJWT, getUserSubscriptions)

subscriptionRouter.put("/cancel-subscription", verifyJWT, cancelSubscription)

subscriptionRouter.put("/:id", (req, res) => {
    res.send({title: "Update subscriptions"})
})

subscriptionRouter.delete("/:id", (req, res) => {
    res.send({title: "Delete subscriptions"})
})


subscriptionRouter.post("/upcoming-renewals", (req, res) => {
    res.send({title: "GET upcoming Renewals"})
})


export {subscriptionRouter};