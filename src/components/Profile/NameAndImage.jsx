import styles from '../../styles/Profile/profile.module.css';
import { useAuth } from '../../context/AuthProvider';

const NameAndImage = () => {
    const user = useAuth();

    return (
        <div>
            <img
                alt="user_photo"
                src={user.currentUser.photoURL}
                className={styles.user_photo}
            />
            <h2
                style={{ marginTop: '20px', fontSize: '32px', fontWeight: 500 }}
            >
                {user.currentUser.displayName}
            </h2>
        </div>
    );
};

export default NameAndImage;
