import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../styles/components/ProblemCard.module.css";
import StatusCard from "./StatusCard";
import { deleteHandler } from "./ApiComponents/handleDelete";
import { Modal } from "@geist-ui/core";
import { useNavigate, useParams } from "react-router-dom";

const ProblemCard = (props) => {
    const [modalState, setModalState] = useState(false);
    const deleteModalHandler = () => setModalState(true);
    const closeModalHandler = () => {
        setModalState(false);
    };
    const { route } = useParams();
    const navigate = useNavigate();

    const cardRouteHandler = () => {
        let nextRoute = route.pathname + "/" + props.cardTitle;
        navigate(nextRoute);
    };

    const [dropdownActive, setDropdownsActive] = useState(false);
    const [statusColor, setStatusColor] = useState("#3f3f46");
    const [fakeStatusColor, setFakeStatusColor] = useState("#3f3f46");
    const [firstRender, setFirstRender] = useState(0);

    const toggleStatus = () => {
        if (!dropdownActive) {
            setDropdownsActive(true);
        } else {
            setDropdownsActive(false);
        }
    };

    if (props.cardSize === 70) {
        return (
            <a
                className={styles.problem_card_container}
                onClick={cardRouteHandler}
            >
                <div
                    className={styles.card_container_large}
                    style={
                        props.solvedPercentage >= 53
                            ? {
                                  height: `${props.cardSize}px`,
                                  color: "black",
                              }
                            : {
                                  height: `${props.cardSize}px`,
                              }
                    }
                >
                    <div className={styles.card_wrapper}>
                        <div className={styles.card_title}>
                            {props.cardTitle}
                        </div>
                    </div>
                </div>
            </a>
        );
    } else if (props.cardSize === 50) {
        return (
            <a
                className={styles.problem_card_container}
                href={props.problemUrl}
            >
                {props.verdict === "AC" ? (
                    <div
                        className={styles.card_container_large}
                        style={{ background: "#04FF87", color: "black" }}
                    >
                        <div className={styles.card_wrapper}>
                            <div className={styles.card_title}>
                                {props.problemTitle}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className={styles.card_container_large}
                        style={{ background: "#2e2f31" }}
                    >
                        <div className={styles.card_wrapper}>
                            <div className={styles.card_title}>
                                {props.problemTitle}
                            </div>
                        </div>
                    </div>
                )}
            </a>
        );
    } else {
        return (
            <div className={styles.problem_card_container}>
                <div className={styles.card_container}>
                    <div className={styles.card_wrapper}>
                        <div className={styles.status}>
                            <button
                                style={
                                    firstRender === 0 && props.statusColor
                                        ? {
                                              background: `${props.statusColor}`,
                                              width: "40px",
                                              height: "40px",
                                              borderRadius: "50px",
                                              border: "none",
                                              cursor: "pointer",
                                              display: "flex",
                                              position: "relative",
                                          }
                                        : {
                                              background: `${fakeStatusColor}`,
                                              width: "40px",
                                              height: "40px",
                                              borderRadius: "50px",
                                              border: "none",
                                              cursor: "pointer",
                                              display: "flex",
                                              position: "relative",
                                          }
                                }
                                onClick={toggleStatus}
                            ></button>
                            <div>
                                {dropdownActive ? (
                                    <StatusCard
                                        color={(color) => {
                                            setFirstRender(1);
                                            setStatusColor(color);
                                            setFakeStatusColor(color);
                                        }}
                                        toggleStat={(toggle) =>
                                            setDropdownsActive(toggle)
                                        }
                                        problemStatusChange={
                                            props.problemStatusChange
                                        }
                                        problemUrl={props.url}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <a className={styles.title} href={`${props.url}`}>
                            {props.title}{" "}
                        </a>
                        <div
                            className={styles.difficulty}
                            style={
                                props.difficulty === "Easy"
                                    ? { color: "#00FF00" }
                                    : props.difficulty === "Medium"
                                    ? { color: "#FF6400" }
                                    : { color: "#FF0000" }
                            }
                        >
                            {props.difficulty}
                        </div>
                        <div className={styles.deleteBtn}>
                            {props.role == "power" ? (
                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    onClick={deleteModalHandler}
                                >
                                    <DeleteIcon style={{ color: "white" }} />
                                </IconButton>
                            ) : null}
                        </div>
                    </div>
                </div>
                {modalState ? (
                    <Modal visible={modalState} onClose={closeModalHandler}>
                        <Modal.Title>Are you sure!</Modal.Title>
                        <Modal.Subtitle>
                            Do you want to delete this problem?
                        </Modal.Subtitle>
                        <Modal.Action
                            onClick={() => {
                                deleteHandler(props.url, setModalState);
                            }}
                        >
                            DELETE
                        </Modal.Action>
                    </Modal>
                ) : null}
            </div>
        );
    }
};

export default ProblemCard;
