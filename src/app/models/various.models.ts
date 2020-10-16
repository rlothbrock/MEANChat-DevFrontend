import { LoggedUser } from './user.interface';

export interface PasswordUpdateData {
    oldPassword: string;
    updatedPassword: string;
}

export interface ProfileUpdateData {
    photo?: string;
    username?: string;
    description?: string;  // not yet implemented
    status?: string;       // not yet implemented
}


export interface ApiResponse {
    status: string;
    data?: { data: any };
    error?: object;
    message?: string;
    token?: string;
}

export interface UserData {
    username: string;
    email: string;
    _id: string;
    _token: string;
    _tokenExpiration?: Date;
    tokenExpiration?: Date;
    contacts: Array<LoggedUser | null > ;
    photo?: string;
}
