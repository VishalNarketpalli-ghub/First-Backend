//method 1
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
            catch((err) => next(err))
    }
}
export { asyncHandler }
//method 2
// const asyncHandeler = (fn) => async (req, res, next) => {
//     try {
//        await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             messsage: err.message
//         })
//     }
// }