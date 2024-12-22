import User from "../models/users.model";
import { IUserService } from "../typeDefs/user.typeDefs";
import bcrypt from "bcrypt"
import { CustomContext } from "../types/context";
import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from '../utils/token.utils';
interface AuthResponse {
    code: number;
    message: string;
    id?: string;
    fullname?: string;
    email?: string;
    token?: string;
}
// Resolvers
export const resolversUSer =  {    
    Query:{
        getUser: async (_: any, { id }: { id: string},context:CustomContext ): Promise<AuthResponse> => {
            // Check authentication
            if (!context.token) {
                return {
                    code: 401,
                    message: "Authentication required"
                };
            }
            const user = await User.findById(id);
            if(!user){
                return{
                    code:404,
                    message:"User not found",
                }
            }
            return {
                code:200,
                message:"User found",
                fullname:user.fullname,
                email:user.email!,
                token:user.token!,
            };
        }
    },
    Mutation: {
        registerUser:async (_: any, {user}:{user:IUserService} ): Promise<AuthResponse> => {
            try {
                
            } catch (error) {
                return {
                    code: 500,
                    message: "Internal server error",
                };
                
            }
            const userExist= await User.findById({
                email: user.email,
                deleted: false
            });
            if(userExist){
                //throw new Error("User already exist");
                return {
                    code:400,
                    message:"User already exist",
                }
            }
            const saltRounds = 10;
            const password = user.password;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
      
            user.password = hashedPassword;
            const token = jwt.sign(
                { email: user.email },
                process.env.JWT_SECRET!,
                { expiresIn: "24h" }
            );

            const newUser = new User(user);
            const result = await newUser.save();
            return {
                code: 200,
                message: "User registered successfully",
                id: result.id,
                fullname: result.fullname,
                email: result.email!,
                token: token,
            };
        },
        loginUser:async (_: any, { email, password }: { email: string; password: string }) => {
            const userExist= await User.findOne({
                email: email,
                deleted: false
            });
            if(!userExist){
                return {
                    code:400,
                    message:"User not found",
                }
            }else{
                const match = await bcrypt.compare(password, userExist.password!!);
                if(match){
                    const tokenPayload = {
                        userId: userExist.id,
                        email: userExist.email
                    };
                    
                    const token = generateToken(tokenPayload);
                    return {
                        code:200,
                        message:"User logged in successfully",
                        id: userExist.id,
                        fullname: userExist.fullname,
                        email: userExist.email!,
                        token: userExist.token,
                    }
                }else{
                    return {
                        code:400,
                        message:"Invalid password",
                    }
                }
            }
        }
        
    }
};