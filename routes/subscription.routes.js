import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.send({title: "GET all subscriptions"})
})

subscriptionRouter.get("/:id", (req, res) => {
    res.send({title: "GET subscription details"})
})

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.put("/:id", (req, res) => {
    res.send({title: "Update subscriptions"})
})

subscriptionRouter.delete("/:id", (req, res) => {
    res.send({title: "Delete subscriptions"})
})

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions)

subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.send({title: "Cancel subscriptions"})
})

subscriptionRouter.post("/upcoming-renewals", (req, res) => {
    res.send({title: "GET upcoming Renewals"})
})


export default subscriptionRouter;