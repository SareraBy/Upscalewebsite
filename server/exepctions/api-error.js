module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.errors = errors;
        this.status = status;
        }
        static UnAuthEr(){
        return new ApiError(401, "Пользователь не автаризован");
        }
        static BadRequest(message, errors=[]){
            return new ApiError(400, message, errors);
        }
}