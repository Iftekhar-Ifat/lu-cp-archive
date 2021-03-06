import React, { useRef, useState } from "react";
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

    const currentCFhandle = localStorage.getItem("cf-handle");
    const [btnDisable, setBtnDisable] = useState(false);

    const cfHandleRef = useRef();
    let userCFhandle;
    let sendCFhandle;
    const getUserCfHandle = async () => {
        setBtnDisable(true);
        //check if user exist or not
        userCFhandle = cfHandleRef.current.value;
        sendCFhandle = {
            userEmail: props.currentUserEmail,
            cfHandle: userCFhandle,
        };
        try {
            const response = await fetch(
                `https://codeforces.com/api/user.info?handles=${userCFhandle}`
            );
            if (!response.ok) throw Error("Did not received expected data");
            const data = await response.json();
            await cfHandleInput(sendCFhandle);
            setBtnDisable(false);
        } catch (err) {
            alert("User doesn't exist❗");
            setBtnDisable(false);
        }
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
                            {currentCFhandle ? (
                                <h4
                                    style={{
                                        margin: "0px",
                                        padding: "0px",
                                        color: "white",
                                    }}
                                >
                                    Current CF Handle:
                                    {currentCFhandle}
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
                                disabled={btnDisable}
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
