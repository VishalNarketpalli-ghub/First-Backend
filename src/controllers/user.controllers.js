import { asyncHandler } from '../utility/asyncHandler.js';

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "hello this is from chaia and code"
    })
})

export { registerUser }