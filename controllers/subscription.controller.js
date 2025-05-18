import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createSubscription = asyncHandler(async (req, res) => {
    const {name, price, currency, frequency, category, startDate, status} = req.body;

    const newSubscription = await Subscription.create({
        name,
        price,
        currency,
        frequency,
        category,
        startDate,
        status,
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
            status: subscription.status,
            renewal_date: subscription.renewalDate,
        }))
    })
});

const cancelSubscription = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const {status, subscriptionId} = req.body;

    const subscription = await Subscription.findById(subscriptionId);
    
    if(!subscription){
        throw new ApiError(404, "Subscription not found");
    }

    if(subscription.user.toString() !== user.toString()){
        throw new ApiError(403, "You are not authorized to cancel this subscription")
    }

    const allowedStatus = ["Cancelled"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json(
            new ApiResponse(400, "", "Invalid status")
        )
    }
    
    if(subscription.status == "Cancelled"){
        throw new ApiError(400, "Subscription already cancelled")
    }

    subscription.status = "Cancelled";
    subscription.renewalDate = null;
    await subscription.save();

    return res.status(200)
    .json(new ApiResponse(200, subscription, "Subscription status updated"))

})

export {
    createSubscription,
    getUserSubscriptions,
    cancelSubscription,
}

