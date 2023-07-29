'use client'
import React, {useState, useEffect, useContext} from "react";
// import Confetti from "react-confetti";
// import {useWindowSize} from "react-use";
import "./styles/SpinningWheel.css";
import CustomButton from "./Button";

const SpinningWheel = () => {
    const [deg, setDeg] = useState(0);
    const [button, setButton] = useState()
    const [reward, setReward] = useState() //1 - 50k
    const [rewardString, setRewardString] = useState("") //1 - 50k

    const quantity = 12;

    const zoneSize = 360 / quantity;

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useEffect(() => {
        setReward(7)
    }, []);
    const handleClick = () => {
        if (deg > 0) return;

        const calculatedDeg = Math.floor(50 * 360 - (reward - 1) * zoneSize);
        console.log(calculatedDeg)
        setDeg(calculatedDeg);
        setButton("stop")
    };

    const handleResult = () => {
        // setTimeout(() => setPage(
        //     <Summary reward={rewardString}/>
        // ), 3000)
    };
    return (
        <>
            <div className="wheel-container">
                <img
                    className="wheel"
                    src={"/Icelandair_STW_Wheel_V4_Icelandic.png"}
                    alt="wheel"
                    style={{transform: `translateX(-50%) rotate(${deg}deg)`}}
                    onTransitionEnd={handleResult}
                />
                <img
                    className="pointer"
                    src={"/Icelandair_STW_Pointer_V3.png"}
                    alt="pointer"
                />
            </div>

            <div
                className={"flex-center"}
                style={{
                    padding: "20px",
                    transition: "3s",
                    opacity: button === "stop" ? 0 : 1,
                    borderRadius: "20px",
                    backgroundColor: "white"
                }}>
                <CustomButton
                    disabled={reward === undefined}
                    style={reward === undefined ? {backgroundColor: "gray"} : {}}
                    onClick={handleClick} text={"Snúðu lukkuhjólinu"}/>
            </div>
        </>
    );
};

export default SpinningWheel;
