import React, { useState, useRef } from "react";
import {
    TextField,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material";
import { Spacer } from "@geist-ui/core";
import { inputHandler } from "../ApiComponents/handleInput";

const TopicWiseModalHandler = ({ setShow }) => {
    const path = window.location.pathname.split("/").pop();
    // getting input for problem
    const problemName = useRef();
    const problemUrl = useRef();
    const [problemDifficulty, setProblemDifficulty] = useState("");
    const getProblemDifficulty = (event) => {
        setProblemDifficulty(event.target.value);
    };

    const [btnDisable, setBtnDisable] = useState(false);

    const getProblemInfo = () => {
        setBtnDisable(true);

        const problemItem = {
            itemId: "topic-wise",
            title: problemName.current.value,
            difficulty: problemDifficulty,
            route: path,
            url: problemUrl.current.value,
        };

        inputHandler(problemItem, setBtnDisable);
    };
    return (
        <div
            style={{
                padding: "3%",
                justifyContent: "space-evenly",
            }}
        >
            <TextField
                inputRef={problemName}
                fullWidth
                label="Problem Name"
                id="fullWidth"
                autoComplete="off"
            />
            <Spacer />
            <TextField
                inputRef={problemUrl}
                fullWidth
                label="Problem Url"
                id="fullWidth"
                autoComplete="off"
            />
            <Spacer />
            <FormControl>
                <FormLabel>Problem Difficulty</FormLabel>
                <RadioGroup onChange={getProblemDifficulty}>
                    <FormControlLabel
                        style={{ color: "white" }}
                        value="Easy"
                        control={<Radio />}
                        label="Easy"
                    />
                    <FormControlLabel
                        value="Medium"
                        style={{ color: "white" }}
                        control={<Radio />}
                        label="Medium"
                    />
                    <FormControlLabel
                        value="Hard"
                        style={{ color: "white" }}
                        control={<Radio />}
                        label="Hard"
                    />
                </RadioGroup>
            </FormControl>
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
                    onClick={getProblemInfo}
                    disabled={btnDisable}
                >
                    Add Problem
                </Button>
            </div>
        </div>
    );
};

export default TopicWiseModalHandler;
