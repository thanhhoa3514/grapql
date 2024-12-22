export interface IUserService {
    fullname: string;
    password: string;
    token?: string;
    email: string;
    deleted?: boolean;
    deletedAt?: Date | null;
}

export interface IAuthResponse {
    code: number;
    message: string;
    id?: string;
    fullname?: string;
    email?: string;
    token?: string;
}