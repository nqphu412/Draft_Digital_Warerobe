const jwt = require("jsonwebtoken");

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken || req.cookies.token;

        if (!accessToken) {
            return res.status(401).json({
                status: "error",
                message: "Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục."
            });
        }

        //verify token
        jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: "error",
                    message: "Phiên đăng nhập đã hết hạn hoặc không hợp lê. Vui lòng đăng nhập lại."
                });
            }

            //Attach payload (with userId) directly to req.user without re-query to DB
            req.user = { id: decoded.id };
            next();
        });
    } catch (error) {
        console.error("Auth Middleware Error: ", error);
        return res.status(500).json({
            status: "error",
            message: "Lỗi hệ thống khi xác thực tài khoản"
        });
    }
};