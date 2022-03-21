import React from "react";
import TopicWiseModalHandler from "./TopicWiseModalHandler";
import ResourceModalHandler from "./ResourceModalHandler";
import CFProblemModalHandler from "./CFProblemModalHandler";

const ModalItems = ({ modalFor, show, setShow }) => {
    if (!show) {
        return null;
    } else if (modalFor === "problems") {
        return <TopicWiseModalHandler setShow={setShow} />;
    } else if (modalFor === "resources") {
        return <ResourceModalHandler setShow={setShow} />;
    } else if (modalFor === "cf-problems") {
        return <CFProblemModalHandler setShow={setShow} />;
    }
};

export default ModalItems;
