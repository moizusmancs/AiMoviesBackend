class ApiError extends Error{
    statusCode: Number;

    constructor(message:string , statusCode: number = 500){
        super(message);
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export {ApiError};