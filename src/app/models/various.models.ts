import { LoggedUser } from './user.interface';

export interface PasswordUpdateData {
    oldPassword: string;
    updatedPassword: string;

}

export interface ApiResponse {
    status: string;
    data?: { data: any };
    error?: object;
    message?: string;
}

export interface UserData {
    username: string;
    email: string;
    _id: string;
    _token: string;
    _tokenExpiration: Date;
    contacts: Array<LoggedUser | null > ;
    photo?: string;
}
