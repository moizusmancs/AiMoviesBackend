import mongoose, {Document, Schema} from "mongoose";
import { NextFunction } from "express";
import { TryCatchUtily } from "../utils/tryCatch.utils.js";
import { generateHashPasswordUtility } from "../utils/generateHashPassword.utils.js";
import { comparePasswordUtility } from "../utils/comparePassword.utils.js";
import { UserSchemaType } from "../validators/user.validation.js";

export interface IUser extends UserSchemaType,Document {
    comparePassword(canidatePassword: string):Promise<boolean>
}

const UserSchema:Schema = new Schema<IUser>(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        userName: { type: String, required: true, unique: true, lowercase: true },
        profilePictureUrl: { type: String, default: null },
        refreshToken: { type: String },
        verificationCode: {type: String},
        emailVerified: {type: Boolean, default: false},
        ttlVerificationCode: {type:Date, default: new Date(Date.now() + 15*60*1000)}
    },
    {
        timestamps: true
    }
)

UserSchema.pre<IUser>("save", async function (next:NextFunction) {
    if(!this.isModified("password")){
        return next();
    }

    TryCatchUtily(async () => {
        this.password = await generateHashPasswordUtility(this.password);
        next();
    })
})

UserSchema.methods.comparePassword = async function ( canidatePassword: string ): Promise<boolean> {
    return await comparePasswordUtility(canidatePassword, this.password);
}

const User = mongoose.model<IUser>("User", UserSchema);
export {User}
