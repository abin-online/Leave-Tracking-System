import { useEffect, useState } from "react";

const useUserId = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    }, []);

    return userId;
};

export default useUserId;
