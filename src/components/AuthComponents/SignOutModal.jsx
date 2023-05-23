import { Modal } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider.jsx';

const SignOutModal = ({ signOutTriggerStatus, signOutTriggerStatusChange }) => {
    const { logout } = useAuth();
    let navigate = useNavigate();
    const closeHandler = () => {
        signOutTriggerStatusChange(false);
    };
    async function handleSignOut() {
        try {
            await logout()
                .then(() => {
                    navigate('/');
                })
                .catch(() => {
                    alert('Error in logout');
                });
            closeHandler();
        } catch (err) {
            alert('Error in logout');
        }
    }
    return (
        <div>
            <Modal
                visible={signOutTriggerStatus}
                onClose={closeHandler}
                style={{ overflow: 'none' }}
            >
                <Modal.Title>Sign Out!</Modal.Title>
                <Modal.Subtitle>Do you want to sign out?</Modal.Subtitle>
                <Modal.Action onClick={handleSignOut}>Sign out</Modal.Action>
            </Modal>
        </div>
    );
};

export default SignOutModal;
