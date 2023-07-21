import React, {Component} from 'react';
import style from "./styles/Button.module.css"
import {motion} from "framer-motion"

class CustomButton extends Component {
    render() {
        return (
            <motion.button
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                disabled={this.props.disabled}
                className={`${style.customButton} `+(this.props.className||"")}
                style={this.props.style}
                onClick={this.props.onClick}
                onDoubleClick={this.props.onClick}
            >
                {this.props.text ?? "OK"}
            </motion.button>
        );
    }
}

export default CustomButton;