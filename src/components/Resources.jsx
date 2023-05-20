import React, { useState } from "react";
import styles from "../styles/components/Resources.module.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddResourcesModal from "./AddForms/AddResourcesModal";

const Resources = (props) => {
    const [addResourcesToggle, setAddResourcesToggle] = useState(false);
    const [show, setShow] = useState(false);
    const addResourcesHandler = () => {
        setAddResourcesToggle(true);
        setShow(true);
    };
    return (
        <div className={styles.resources_div}>
            <div className={styles.resources_card}>
                <div className={styles.card_header}>Resources</div>
                <div className={styles.resource_container}>
                    {props.resources.map((resource) => (
                        <ul key={resource._id}>
                            <a href={resource.url}>
                                <li>{resource.title}</li>
                            </a>
                        </ul>
                    ))}
                    {props.userRole === "power" ? (
                        <div className={styles.add_button}>
                            <Fab
                                size="medium"
                                color="secondary"
                                aria-label="add"
                                style={{ background: "#18181B" }}
                                onClick={addResourcesHandler}
                            >
                                <AddIcon />
                            </Fab>
                        </div>
                    ) : null}
                </div>
            </div>
            {addResourcesToggle ? (
                <AddResourcesModal show={show} setShow={setShow} />
            ) : null}
        </div>
    );
};

export default Resources;
