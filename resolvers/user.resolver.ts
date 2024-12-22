import User from "../models/users.model";
import { IUserService } from "../typeDefs/user.typeDefs";
import bcrypt from "bcrypt"
import { generateStringRandom } from "../helpers/generateRandom";
// Resolvers
export const resolversUSer =  {    
    Mutation: {
        registerUser:async (_: any, {user}:{user:IUserService} ) => {
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
            user.token =generateStringRandom(30);

            const newUser = new User(user);
            const result = await newUser.save();
            return {
                code:200,
                message:"User registered successfully",
                id:result.id,
                fullname:result.fullname,
                email:result.email,
                token:result.token,
            }
        },
        loginUser:async (_: any,{ user }: { user: { email: string; password: string } }) => {
            const {email, password} =user;
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
                    return {
                        code:200,
                        message:"User logged in successfully",
                        id:userExist.id,
                        fullname:userExist.fullname,
                        email:userExist.email,
                        token:userExist.token,
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