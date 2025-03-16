import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Minimum price should be greater than 0"],
    },
    currency: {
        type: String,
        enum: ["USD", "BDT", "INR", "EUR"],
        default: "USD",
    },
    frequency: {
        type: String,
        enum: ["weekly", "monthly", "yearly"],
    },
    category: {
        type: String,
        enum: ["Entertainment", "Sports", "News", "Finance", "Others"],
        trim: true,
    },
    status: {
        type: String,
        enum: ["Active", "Cancelled", "Expired"],
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: "Subscription start date must in the past"
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value > this.startDate,
            message: "Renewal date must be in the future",
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    }

}, {timestamps: true})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export {Subscription}