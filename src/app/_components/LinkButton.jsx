'use client'
import { useRouter } from "next/navigation"
import styles from "./styles/LinkButton.module.css"

export default function LinkButton({text, link}){
    const router = useRouter()
    return <button className={`${styles["button-default"]} ${styles.floating}`} onClick={() => {router.push(link)}}>
        {text}
    </button>
}