import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../lib/firebase';
import { signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function logout() {
        return signOut(auth);
    }

    const provider = new GoogleAuthProvider();

    function signInWithGoogle() {
        return signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const userContext = {
        currentUser,
        logout,
        signInWithGoogle,
    };
    return (
        <AuthContext.Provider value={userContext}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
