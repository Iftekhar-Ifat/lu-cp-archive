import React, { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import { Spacer } from "@geist-ui/core";
import { inputHandler } from "../ApiComponents/handleInput";

const ResourceModalHandler = ({ setShow }) => {
    const [btnDisable, setBtnDisable] = useState(false);
    const path = window.location.pathname.split("/").pop();
    //getting input for resources
    const resourceTitle = useRef();
    const resourceUrl = useRef();
    const getResourcesInfo = () => {
        setBtnDisable(true);
        const resourceItem = {
            itemId: "resources",
            title: resourceTitle.current.value,
            url: resourceUrl.current.value,
            route: path,
        };
        const isEmpty = Object.keys(resourceItem).length === 0;
        if (!isEmpty) {
            alert("Please fill up the form❗");
            setBtnDisable(false);
        } else {
            inputHandler(resourceItem, setShow);
        }
    };
    return (
        <div
            style={{
                padding: "3%",
                justifyContent: "space-evenly",
            }}
        >
            <TextField
                inputRef={resourceTitle}
                fullWidth
                label="Resource Title"
                autoComplete="off"
            />
            <Spacer />
            <TextField
                inputRef={resourceUrl}
                fullWidth
                label="Resource Url"
                autoComplete="off"
            />
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
                    onClick={getResourcesInfo}
                    disabled={btnDisable}
                >
                    Add Resource
                </Button>
            </div>
        </div>
    );
};

export default ResourceModalHandler;
