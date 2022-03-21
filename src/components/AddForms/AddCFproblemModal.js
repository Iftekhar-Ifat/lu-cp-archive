import { X } from "@geist-ui/icons";
import React, { useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../../styles/components/AddProblemModal.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ModalItems from "./ModalItems";

const AddCFproblemModal = ({
    addProblemModalStatus,
    addProblemModalStatusChange,
    show,
    setShow,
}) => {
    if (!show) {
        return null;
    }
    const theme = createTheme({
        palette: {
            mode: "dark",
            neutral: {
                main: "#18181b",
                contrastText: "#fff",
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
                    <div
                        className={styles.modal}
                        style={{ minHeight: "200px" }}
                    >
                        <div className={styles.card_header}>
                            <div style={{ cursor: "pointer" }}>
                                <X
                                    size={28}
                                    onClick={() => setShow(false)}
                                    color="white"
                                />
                            </div>
                        </div>
                        <ModalItems
                            modalFor={"cf-problems"}
                            show={show}
                            setShow={setShow}
                        />
                    </div>
                </OutsideClickHandler>
            </div>
        </ThemeProvider>
    );
};

export default AddCFproblemModal;
