import { Router } from "express";
import { getAllSubscriptions, createSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.post("/", createSubscription)

subscriptionRouter.get("/", getAllSubscriptions)


//subscriptionRouter.post("/", authorize, createSubscription)

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