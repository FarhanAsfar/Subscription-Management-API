import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import mongoose from "mongoose";

const createSubscription = asyncHandler(async (req, res) => {
    const {name, price, currency, frequency, category, startDate, renewalDate} = req.body;

    const newSubscription = await Subscription.create({
        name,
        price,
        currency,
        frequency,
        category,
        startDate,
        renewalDate,
        user: req.user._id,
    })

    if(!newSubscription){
        throw new ApiError(500, "Could not create the subscription model");
    }

    return res.status(201).json(
        new ApiResponse(201, newSubscription, "Subscription model created")
    )
});

const getAllSubscriptions = asyncHandler(async (req, res) => {
    const subscription = await Subscription.find({});

    res.status(200)
    .json({
        subscription: subscription.map(subscription => ({
            name: subscription.name,
            price: subscription.price,
        }))
    })
});


export {
    getAllSubscriptions,
    createSubscription,
}

