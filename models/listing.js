// step 2 (p1)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,  
        trim: true      
    },
    description: {
        type: String,
        trim: true     
    },
    image: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1686090450800-d6ca456243c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1686090450800-d6ca456243c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v
    },
    price: {
        type: Number,
        min: [0, "Price must be a positive number"], 
        required: true
    },
    location: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;