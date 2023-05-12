import { BASE_API } from "@/consts/api.consts";
import axios from "axios"

export interface IReservation {
    id: number;
    period: {
        bookingId: number;
        clientId: number;
        roomId: number;
        startTime: Date;
        endTime: Date;
    }
    user_id: number;
    description: string;
}

export const getReserves = async (userId: number): Promise<IReservation[]> => {
    const {data} = await axios.get(`${BASE_API}/reservations?userId=${userId}`);
    return data;
}

export const deleteReserve = async (reservationId: number, roomId: number) => {
    const {data} = await axios.delete(`${BASE_API}/reservation/delete?reservationId=${reservationId}&roomId=${roomId}`);
    return data;
}