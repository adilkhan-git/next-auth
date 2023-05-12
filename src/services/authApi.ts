import { BASE_API } from "@/consts/api.consts";
import axios from "axios";

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    userId: number;
    role: 'USER' | 'ADMIN';
    jwtToken: string;
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
    const {data} = await axios.post(`${BASE_API}/signin`, request)
    return data;
}

export const registration = async (request: IRegitrationRequest): Promise<IRegitrationResponse> => {
    const {data} = await axios.post(`${BASE_API}/signup`, request)
    return data;
}