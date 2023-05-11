import axios from "axios";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    somedata: any;
}

export interface IRegitrationRequest {
    email: string;
    password: string;
}

export interface IRegitrationResponse {
    token: string;
    somedata: any;
}

export const login = async (request: ILoginRequest): Promise<ILoginResponse> => {
    const {data} = await axios.post('http://localhost:3000/api/auth/login', request)
    return data;
}

export const registration = async (request: IRegitrationRequest): Promise<IRegitrationResponse> => {
    const {data} = await axios.post('http://localhost:3000/api/auth/registration', request)
    return data;
}