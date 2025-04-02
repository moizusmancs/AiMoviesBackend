import bcrypt from "bcrypt"

export const comparePasswordUtility = async (canidatePassword: string, actualPassword: string): Promise<boolean> => {
    return await bcrypt.compare(canidatePassword, actualPassword);
}