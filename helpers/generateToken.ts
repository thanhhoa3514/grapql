import jwt from "jsonwebtoken";
export const generateToken = (payload: object, expiresIn: string | number = "1h"): string => {
    return jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn });
};
export const generateStringRandom=(length:number):string=>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = "";


    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
}

// export const verifyToken = (token: string): object | null => {
//     try {
//         return jwt.verify(token, process.env.SECRET_KEY!);
//     } catch (error) {
//         console.error("Invalid Token", error);
//         return null;
//     }
// };