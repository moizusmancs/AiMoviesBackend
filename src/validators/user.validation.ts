import { z } from "zod"

export const zodUserSchema = z.object({
    firstName: z.string().min(2, "First name must be atleast 2 characters"),
    lastName: z.string().min(2, "Last name must be atleast 2 characterst "),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    userName: z.string().min(3, "Username must be atleast of 3 characters").toLowerCase(),
    profilePictureUrl: z.string().url().optional(),
    refreshToken: z.string().optional(),
    verificationCode: z.string().optional(),
    emailVerified: z.boolean().default(false)
    
})

export type UserSchemaType = z.infer<typeof zodUserSchema>