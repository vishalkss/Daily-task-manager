const asyncWrapper = (fn) => {

    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            console.log("error", error);
            res.status(201).json({ error: error['message'] });
        }
    }

}

module.exports = asyncWrapper;