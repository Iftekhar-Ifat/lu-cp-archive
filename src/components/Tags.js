import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AddTagsModal from "./AddForms/AddTagsModal";

const Tags = ({ problemTags, setProblemTags, allTags }) => {
    const handleTagChange = (event) => {
        const index = problemTags.indexOf(event.target.value);
        if (index === -1) {
            setProblemTags([...problemTags, event.target.value]);
        } else {
            setProblemTags(
                problemTags.filter(
                    (problemTags) => problemTags !== event.target.value
                )
            );
        }
    };

    const [addTagsToggle, setAddTagsToggle] = useState(false);
    const [show, setShow] = useState(false);
    const addTagsHandler = () => {
        setAddTagsToggle(true);
        setShow(true);
    };

    return (
        <>
            <FormControl>
                <FormLabel>Tags</FormLabel>
                <FormGroup>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr ",
                            maxHeight: "80px",
                            overflowY: "auto",
                        }}
                    >
                        {allTags.map((element) => (
                            <FormControlLabel
                                style={{ color: "white" }}
                                label={element}
                                control={
                                    <Checkbox
                                        value={element}
                                        checked={problemTags.includes(
                                            `${element}`
                                        )}
                                        onChange={handleTagChange}
                                    />
                                }
                            />
                        ))}

                        {/* <FormControlLabel
                            style={{ color: "white" }}
                            label="{element}"
                            control={
                                <Checkbox
                                    value="{element}"
                                    checked={problemTags.includes("{element}")}
                                    onChange={handleTagChange}
                                />
                            }
                        /> */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <IconButton>
                                <AddCircleRoundedIcon
                                    onClick={addTagsHandler}
                                />
                            </IconButton>
                        </div>
                    </div>
                </FormGroup>
            </FormControl>
            {addTagsToggle ? (
                <AddTagsModal
                    show={show}
                    setShow={setShow}
                    setProblemTags={setProblemTags}
                />
            ) : null}
        </>
    );
};

export default Tags;
