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
            id: subscription._id,
            name: subscription.name,
            price: subscription.price,
            currency: subscription.currency,
            category: subscription.category,
            frequency: subscription.frequency,
            status: subscription.status,
            startDate: subscription.startDate,
            renewal_date: subscription.renewalDate,
        }))
    })
});

const cancelSubscription = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const {subscriptionId} = req.body;

    const subscription = await Subscription.findById(subscriptionId);
    
    if(!subscription){
        throw new ApiError(404, "Subscription not found");
    }

    if(subscription.user.toString() !== user.toString()){
        throw new ApiError(403, "You are not authorized to cancel this subscription")
    }

    if(subscription.status == "Cancelled"){
        throw new ApiError(400, "Subscription is already cancelled")
    }

    subscription.status = "Cancelled";
    subscription.renewalDate = null;
    await subscription.save();

    return res.status(200)
    .json(new ApiResponse(200, subscription, "Subscription was cancelled successfully"))

})

export {
    createSubscription,
    getUserSubscriptions,
    cancelSubscription,
}

