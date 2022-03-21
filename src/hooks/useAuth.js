import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export default function useAuth() {
    const auth = getAuth();
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) =>
            setCurrentUser(user)
        );
        return unsubscribe;
    }, []);

    return currentUser;
}
