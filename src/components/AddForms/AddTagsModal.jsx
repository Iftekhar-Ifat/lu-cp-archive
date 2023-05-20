import { X } from "@geist-ui/icons";
import React, { useState, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../../styles/components/AddProblemModal.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import { Spacer } from "@geist-ui/core";
import { tagsHandler } from "../ApiComponents/handleTags";

const AddTagsModal = ({ show, setShow }) => {
    const theme = createTheme({
        palette: {
            mode: "dark",
            neutral: {
                main: "#18181b",
                contrastText: "#fff",
            },
        },
    });

    const [btnDisable, setBtnDisable] = useState(false);

    const tagsTitle = useRef();

    const getTagHandler = () => {
        setBtnDisable(true);
        const tagItem = {
            itemId: "tags",
            tags: tagsTitle.current.value,
        };
        if (tagItem.tags.length === 0) {
            alert("Please fill up the form❗");
            setBtnDisable(false);
        } else {
            tagsHandler(tagItem, setShow);
            setBtnDisable(false);
        }
    };
    if (!show) {
        return null;
    }

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
                        <div
                            style={{
                                padding: "3%",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <TextField
                                inputRef={tagsTitle}
                                fullWidth
                                label="Tag Title"
                                autoComplete="off"
                            />
                            <Spacer />
                            <Spacer />
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "space-evenly",
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
                                    onClick={getTagHandler}
                                    disabled={btnDisable}
                                >
                                    Add Tag
                                </Button>
                            </div>
                        </div>
                    </div>
                </OutsideClickHandler>
            </div>
        </ThemeProvider>
    );
};

export default AddTagsModal;
