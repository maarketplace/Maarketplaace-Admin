
export interface ILoginInterface {
    email: string;
    password: string
}

export interface IVerify2fa {
    token: string
}

export interface ResetPasswordInterface {
    id: string;
    password: string;
    confirmPassword: string;
}
