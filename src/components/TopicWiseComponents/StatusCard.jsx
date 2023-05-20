import React from 'react';
import styles from '../../styles/components/StatusCard.module.css';
import { Code, Check, ChevronsLeft, X } from '@geist-ui/icons';
import OutsideClickHandler from 'react-outside-click-handler';
import Colors from '../colors';
import { useAuth } from '../../context/AuthProvider.jsx';

const StatusCard = props => {
    const currentUserEmail = useAuth().currentUser.email;
    const toggleBtn = statusColor => {
        if (currentUserEmail) {
            props.toggleStat(false);
            if (statusColor) {
                props.color(statusColor);
            } else {
                props.color('#3f3f46');
            }
        }
    };
    const getStatus = statusText => {
        if (currentUserEmail) {
            props.problemStatusChange({
                email: currentUserEmail,
                status: statusText,
                url: `${props.problemUrl}`,
            });
        } else {
            alert('You need to Signed In !');
        }
    };

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                props.toggleStat(false);
            }}
        >
            <div className={styles.dropdown_content}>
                <div className={styles.options_container}>
                    <div className={styles.options}>
                        <div
                            className={styles.button_container}
                            onClick={() => {
                                toggleBtn(`${Colors.orange}`);
                                getStatus('solving');
                            }}
                        >
                            <Code size={28} color={`${Colors.orange}`} />
                            <div className={styles.button_title}>Solving</div>
                        </div>
                        <div
                            className={styles.button_container}
                            onClick={() => {
                                toggleBtn(`${Colors.green}`);
                                getStatus('solved');
                            }}
                        >
                            <Check size={28} color={`${Colors.green}`} />
                            <div className={styles.button_title}>Solved</div>
                        </div>
                        <div
                            className={styles.button_container}
                            onClick={() => {
                                toggleBtn(`${Colors.violet}`);
                                getStatus('reviewing');
                            }}
                        >
                            <ChevronsLeft
                                size={28}
                                color={`${Colors.violet}`}
                            />
                            <div className={styles.button_title}>Reviewing</div>
                        </div>
                        <div
                            className={styles.button_container}
                            onClick={() => {
                                toggleBtn(`${Colors.red}`);
                                getStatus('skipped');
                            }}
                        >
                            <X size={28} color={`${Colors.red}`} />
                            <div className={styles.button_title}>Skipped</div>
                        </div>
                    </div>
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default StatusCard;
