"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({
                success: false,
                errors: error.details.map((err) => ({
                    field: err.path.join('.'),
                    message: "This field is required"
                }))
            });
            return;
        }
        return next();
    };
};
exports.validate = validate;
