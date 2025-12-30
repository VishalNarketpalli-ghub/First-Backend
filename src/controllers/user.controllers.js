import { asyncHandler } from '../utility/asyncHandler.js';

import { ApiError, apiError } from "../utility/ApiError.js";

import { User } from "../models/user.module.js";

import { uploadOnCloudinary } from "../utility/cloudinary.js";

import { ApiResponse } from '../utility/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    //take user details from frontend
    //validation - not empty
    //check if user already exists : username, email
    //check for img, avatar
    //upload them to cloudinary , avatar
    //create user obj - create user entry in db
    //remove pswd and refresh token field from from response
    //check for uesr creation
    //return res
    const { fullName, email, userName, password } = req.body;
    console.log("email : ", email);

    if (
        [fullName, email, userName, Password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All files are required");
    }

    const existingUser = User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existingUser) {
        throw new ApiError(408, "User with username or email already exist");
    }

    const avatarLocalpath = req.field?.avatar[0]?.path;
    const coverImageLocalPath = req.file?.coverImage[0]?.path;

    if (!avatarLocalpath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalpath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.tLowerCase(),

    })

    const createdUser = User.findById(User._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export { registerUser }