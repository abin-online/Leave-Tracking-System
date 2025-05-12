import api from "./axiosInterceptors";
import { attendance } from "./endPoints";



export const clockIn = async (userId: string) => {
    try {
        const route = `${attendance.clockIn}${userId}/check-in`
        console.log(route)
        const response = await api.post(route)
        console.log(response)
        return response.data
    } catch (error: any) {
        return error
    }
}

export const clockOut = async (userId: string) => {
    try {
        const route = `${attendance.clockIn}${userId}/check-out`
        console.log(route)
        const response = await api.post(route)
        console.log(response)
        return response.data
    } catch (error: any) {
        return error
    }
}


export const fetchAttendance = async (
    userId: string,
    from?: string,
    to?: string
) => {
    const query = new URLSearchParams();
    if (from) query.append("from", from);
    if (to) query.append("to", to);

    const res = await api.get(`/api/attendance/attendance/${userId}?${query}`);
    return res.data;
};

