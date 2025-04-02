import bcrypt from "bcrypt"


export const generateHashPasswordUtility = async (canidatePassword: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(canidatePassword, salt);
    return hashedPassword;
}