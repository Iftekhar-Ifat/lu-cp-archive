import X from '@geist-ui/icons/x';
import { useState, useRef } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styles from '../../styles/components/AddProblemModal.module.css';
import { TextField, Button, FormLabel } from '@mui/material';
import { Spacer } from '@geist-ui/core';
import { cardsHandler } from '../ApiComponents/handleCards';

const AddTagsModal = ({ show, setShow }) => {
    const [btnDisable, setBtnDisable] = useState(false);

    const cardTitle = useRef();

    const getCardHandler = () => {
        setBtnDisable(true);
        const cardItem = {
            itemId: 'cards',
            icon: '',
            title: cardTitle.current.value,
            subtitle: '',
        };
        if (cardItem.title.length === 0) {
            alert('Please fill up the form❗');
            setBtnDisable(false);
        } else {
            cardsHandler(cardItem, setShow);
        }
    };
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalWrapper}>
            <OutsideClickHandler
                onOutsideClick={() => {
                    setShow(false);
                }}
            >
                <div className={styles.modal} style={{ minHeight: '200px' }}>
                    <div className={styles.card_header}>
                        <div style={{ cursor: 'pointer' }}>
                            <X
                                size={28}
                                onClick={() => setShow(false)}
                                color="white"
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            padding: '3%',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <FormLabel>Add Card</FormLabel>
                        <Spacer />
                        <TextField
                            inputRef={cardTitle}
                            fullWidth
                            label="Card Title"
                            autoComplete="off"
                        />
                        <Spacer />
                        <Spacer />
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="neutral"
                                onClick={() => setShow(false)}
                                disabled={btnDisable}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="neutral"
                                onClick={getCardHandler}
                                disabled={btnDisable}
                            >
                                Add Card
                            </Button>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default AddTagsModal;
