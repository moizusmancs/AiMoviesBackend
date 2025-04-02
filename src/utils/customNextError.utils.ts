class customNextError extends Error{
    statusCode: Number;

    constructor(message:string , statusCode: number = 500){
        super(message);
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, customNextError.prototype);
    }
}

export {customNextError};