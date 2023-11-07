export const errorMiddleware = (error, req, res, next) => {
    res.status(500).json({
        status: "Error",
        message: error.message,
    })
}