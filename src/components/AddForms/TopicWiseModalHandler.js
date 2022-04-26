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
import Tags from "../Tags";

const TopicWiseModalHandler = ({ setShow, allTags }) => {
    const path = window.location.pathname.split("/").pop();
    // getting input for problem
    const problemName = useRef();
    const problemUrl = useRef();
    const [problemDifficulty, setProblemDifficulty] = useState("");
    const getProblemDifficulty = (event) => {
        setProblemDifficulty(event.target.value);
    };

    const [btnDisable, setBtnDisable] = useState(false);
    const [problemTags, setProblemTags] = useState([]);

    const getProblemInfo = () => {
        setBtnDisable(true);
        const problemItem = {
            itemId: "topic-wise",
            title: problemName.current.value,
            difficulty: problemDifficulty,
            route: path,
            url: problemUrl.current.value,
            tags: problemTags,
        };
        const isEmpty = Object.keys(problemItem).length === 0;
        if (isEmpty) {
            alert("Please fill up the form❗");
            setBtnDisable(false);
        } else {
            inputHandler(problemItem, setShow);
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
                inputRef={problemName}
                fullWidth
                label="Problem Name"
                autoComplete="off"
            />
            <Spacer />
            <TextField
                inputRef={problemUrl}
                fullWidth
                label="Problem Url"
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
            <Tags
                setProblemTags={setProblemTags}
                problemTags={problemTags}
                allTags={allTags}
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
