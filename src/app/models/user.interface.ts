export interface LoggedUser {
    _id: string;
    photo?: string;
    active?: boolean;
    username: string;
    email: string;
    role?: string;
    tokenExpiration?: Date;
    contacts?: Array<LoggedUser | null>;
  }
