import { X } from '@geist-ui/icons';
import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from '../../styles/components/AddProblemModal.module.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ModalItems from './ModalItems';

const AddProblemModal = ({ show, setShow, allTags }) => {
    if (!show) {
        return null;
    }
    const theme = createTheme({
        palette: {
            mode: 'dark',
            neutral: {
                main: '#18181b',
                contrastText: '#fff',
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.modalWrapper}>
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setShow(false);
                    }}
                >
                    <div className={styles.modal}>
                        <div className={styles.card_header}>
                            <div style={{ cursor: 'pointer' }}>
                                <X
                                    size={28}
                                    onClick={() => setShow(false)}
                                    color="white"
                                />
                            </div>
                        </div>
                        <ModalItems
                            modalFor={'problems'}
                            show={show}
                            setShow={setShow}
                            allTags={allTags}
                        />
                    </div>
                </OutsideClickHandler>
            </div>
        </ThemeProvider>
    );
};

export default AddProblemModal;
