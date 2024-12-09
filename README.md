# Airbnb Clone

## Introduction
Airbnb Clone Web Application using HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB, structured with an MVC architecture for clean and organized code.

## Features
**1. Homepage Functionalities:**
- **Filters & Search:** Allows users to easily find accommodations that meet their criteria.
- **Add New Accommodation:** Registered users can list accommodations with images, descriptions, pricing, location, etc.
- **Map Integration:** Integrated Mapbox SDK for precise location mapping of accommodations.

**2. Authentication & Authorization:**
- Implemented a secure login system using Passport.js and passport-local-mongoose.
- Role-based access ensures:
  - Users can add, edit, and delete their accommodations but cannot modify others’.
  - Reviews are user-specific: users can only edit or delete their own.
  - Guests can view accommodations but cannot interact (e.g., post accommodations or reviews).

**3. CRUD Operations with MongoDB:** 
- **Create:** Users can add accommodations and reviews, with data stored securely in MongoDB.
- **Read:** Accommodations and reviews are dynamically fetched and displayed using EJS templates.
- **Update:** Logged-in users can modify their accommodations or reviews, which are secured by middleware.
- **Delete:** Users can delete their accommodations or reviews, with associated data (e.g., images) removed from Cloudinary.

**4. MVC Structure:**
- **Models:** Defined data schemas for accommodations, users, and reviews using Mongoose.
- **Views:** Created reusable templates with EJS.
- **Controllers:** Modularized application logic for better scalability and maintainability.

**5. Error Handling & Image Storage:**
- Middleware with Joi ensures data validation and secure user inputs.
- Images are uploaded to Cloudinary, enabling scalable, cloud-based storage.


## Prerequisites
Ensure you have the following installed on your system:
- **Git:** <a href="https://git-scm.com/" target="_blank">Download and Install Git</a>
- **Node.js:** <a href="https://nodejs.org/en" target="_blank">Download and Install Node.js</a>
- **MongoDB:** <a href="https://www.mongodb.com/try/download/community" target="_blank">Download and Install MongoDB</a>
- **Cloudinary Account:** <a href="https://cloudinary.com/" target="_blank">Create a Cloudinary Account</a>
    - After creating an account, you will get your `CLOUD_NAME`, `CLOUD_API_KEY`, and `CLOUD_API_SECRET`.
- **Mapbox Account:** <a href="https://www.mapbox.com/" target="_blank">Create a Free Mapbox Account</a>
    - After creating an account, you'll receive your `MAPBOX_ACCESS_TOKEN` to use for map integration.


## Installation
To utilize Airbnb-Clone locally, follow these steps:

1. **Clone the Repository**:
   Open your terminal and run the following command to clone the repository:
   ```bash
   git clone https://github.com/Manshi-Rathour/Airbnb-Clone.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd Airbnb-Clone
   ```

3. **Install Dependencies**:
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the project root directory and add the following variables:
   ```bash
   CLOUD_NAME=your-cloudinary-cloud-name
   CLOUD_API_KEY=your-cloudinary-api-key
   CLOUD_API_SECRET=your-cloudinary-api-secret
   MAP_TOKEN=your-mapbox-access-token
   ```
  - Replace the placeholders:
    - `your-cloudinary-cloud-name`, `your-cloudinary-api-key`, and `your-cloudinary-api-secret` with your Cloudinary credentials.
    - `your-mapbox-access-token` with your Mapbox access token.

5. **Start MongoDB**:
   Make sure MongoDB is running on your system. You can start MongoDB with the following command:
    ```bash
    mongosh
    ```
6. **Run the Application**:
   In the original terminal, start the application using nodemon:
    ```bash
    nodemon app.js
    ```
7. **Access the Application**:
   Open your browser and navigate to:
    ```bash
    http://localhost:8080/listings
    ```

