export interface LoggedUser {
    _id?: string;
    photo?: string;
    active?: boolean;
    username: string;
    email: string;
    role?: string;
    tokenExpiration?: Date;
    contacts?: [LoggedUser];
  }

// interface SignUpBody {
//   username: string;
//   email: string;
//   password: string;
//   role: string;
// }

// interface SignInBody {
//   email: string;
//   password: string;
// }
