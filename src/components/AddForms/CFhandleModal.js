import React, { useRef } from "react";
import { Button, TextField } from "@mui/material";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "../../styles/components/CFhandleModal.module.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { cfHandleInput } from "../ApiComponents/handleCFhandle";

const CFhandleModal = (props) => {
    const theme = createTheme({
        palette: {
            mode: "dark",
            neutral: {
                main: "#18181b",
                contrastText: "#fff",
            },
        },
    });
    const cfHandleRef = useRef();
    let userCFhandle;
    let sendCFhandle;
    const getUserCfHandle = () => {
        userCFhandle = cfHandleRef.current.value;
        props.userCFhandleChange(userCFhandle);
        sendCFhandle = {
            userEmail: props.currentUserEmail,
            cfHandle: userCFhandle,
        };
        cfHandleInput(sendCFhandle);
    };

    return (
        <ThemeProvider theme={theme}>
            <OutsideClickHandler
                onOutsideClick={() => {
                    props.modalToggle(false);
                }}
            >
                <div className={styles.dropdown_content}>
                    <div className={styles.options_container}>
                        <div className={styles.options}>
                            {props.userCFhandle ? (
                                <h4
                                    style={{
                                        margin: "0px",
                                        padding: "0px",
                                        color: "white",
                                    }}
                                >
                                    Current CF Handle:
                                    {props.userCFhandle}
                                </h4>
                            ) : (
                                <h4
                                    style={{
                                        margin: "0px",
                                        padding: "0px",
                                        color: "white",
                                    }}
                                >
                                    Add Your CF Handle
                                </h4>
                            )}

                            <TextField
                                inputRef={cfHandleRef}
                                style={{ margin: "15px" }}
                                id="outlined-size-small"
                                size="small"
                            />
                            <Button
                                variant="contained"
                                color="neutral"
                                style={{ width: "70%", height: "40px" }}
                                onClick={getUserCfHandle}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </ThemeProvider>
    );
};

export default CFhandleModal;
