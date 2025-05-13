import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import mongoose from "mongoose";

const createSubscription = asyncHandler(async (req, res) => {

})

const getAllSubscriptions = asyncHandler(async (req, res) => {
    const subscription = await Subscription.find({});

    res.status(200)
    .json({
        subscription: subscription.map(subscription => ({
            name: subscription.name,
            price: subscription.price,
        }))
    })
})


export {
    getAllSubscriptions,
    createSubscription,
}

