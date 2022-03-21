import React from "react";
import { Modal } from "@geist-ui/core";
import { logout } from "../../Auth/firebaseConfig";

const SignOutModal = ({ signOutTriggerStatus, signOutTriggerStatusChange }) => {
    const closeHandler = (event) => {
        signOutTriggerStatusChange(false);
    };
    async function handleSignOut() {
        try {
            await logout();
            closeHandler();
        } catch (err) {
            alert("Error in logout");
        }
    }
    return (
        <div>
            <Modal visible={signOutTriggerStatus} onClose={closeHandler}>
                <Modal.Title>Sign Out!</Modal.Title>
                <Modal.Subtitle>Do you want to sign out?</Modal.Subtitle>
                <Modal.Action onClick={handleSignOut}>Sign out</Modal.Action>
            </Modal>
        </div>
    );
};

export default SignOutModal;
