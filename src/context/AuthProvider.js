import React, { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../lib/firebase";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function logOut() {
        return signOut();
    }

    const provider = new GoogleAuthProvider();

    function signInWithGoogle() {
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const userContext = {
        currentUser,
        logOut,
        signInWithGoogle,
    };
    return (
        <AuthContext.Provider value={userContext}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
