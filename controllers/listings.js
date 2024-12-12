const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken: mapToken});


module.exports.index = async (req, res) => {
    const { category } = req.query; // Extract category from query parameters
    let filter = {};

    if (category && category.trim() !== "") {
        filter.category = category; // Apply filter only if a category is specified
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings, selectedCategory: category || null });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({path: "reviews", 
            populate: {
            path: "author"
        },
        })
        .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does't exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    // Geocode the location
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    // Get file information
    let url = req.file.path;
    let filename = req.file.filename;

    // Extract listing details from req.body.listing
    const { title, description, category, price, location, country } = req.body.listing;

    // Create new listing
    const newListing = new Listing({
        title,
        description,
        category, 
        price,
        location,
        country,
        image: { url, filename },
        owner: req.user._id,  // Assign owner
        geometry: response.body.features[0].geometry, // Store geolocation
    });

    // Save the listing to the database
    let savedListing = await newListing.save();
    console.log("Saved Listing", savedListing);
    
    // Success message and redirect
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};



module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requested for does't exist!");
        res.redirect("/listings");
    }

    let originalImgUrl = listing.image.url;
    originalImgUrl = originalImgUrl.replace("/upload", "/upload/w_300");

    res.render("listings/edit.ejs", { listing, originalImgUrl });
};


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }


    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};