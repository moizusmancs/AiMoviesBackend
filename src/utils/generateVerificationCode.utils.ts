export const generateVerificationCodeUtility = ():number => {
    const verificationCodeDefaultLength = Number(process.env.VERIFICATION_CODE_DEFAULT_LENGTH); 

    let code = '';
    for (let i = 0; i < verificationCodeDefaultLength; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return Number(code);
}