import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import mongoose from "mongoose";

const createSubscription = asyncHandler(async (req, res) => {
    const {name, price, currency, frequency, category, startDate} = req.body;

    const newSubscription = await Subscription.create({
        name,
        price,
        currency,
        frequency,
        category,
        startDate,
        user: req.user._id,
    })

    if(!newSubscription){
        throw new ApiError(500, "Could not subscribe!");
    }

    return res.status(201).json(
        new ApiResponse(201, newSubscription, "Subscription was successful")
    )
});

const getUserSubscriptions = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    //console.log(user);
    const subscription = await Subscription.find({
        user: userId
    });

    res.status(200)
    .json({
        user: userId,
        subscription_packages: subscription.map(subscription => ({
            name: subscription.name,
            price: subscription.price,
            category: subscription.category,
            renewal_date: subscription.renewalDate,
        }))
    })
});


export {
    createSubscription,
    getUserSubscriptions,
}

