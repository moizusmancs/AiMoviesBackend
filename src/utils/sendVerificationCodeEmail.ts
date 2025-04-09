import { transporter } from "../config/nodemailer.config.js";
import { ApiError } from "./customNextError.utils.js";


export const sendVerificationEmail = async (toEmail: string, code: Number):Promise<boolean> => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${code}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        return true;
        
      } catch (error) {
       throw new ApiError(error.message, 500) 
      }

}


