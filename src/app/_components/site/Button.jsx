import React, {Component} from 'react';
import style from "./styles/Button.module.css"
import {motion} from "framer-motion"

export default function CustomButton(props){
    return (
        <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            disabled={props.disabled}
            className={`${style.customButton} `+(props.className||"")}
            style={props.style}
            onClick={props.onClick}
            onDoubleClick={props.onClick}
        >
            {props.text ?? "OK"}
        </motion.button>
    );
};