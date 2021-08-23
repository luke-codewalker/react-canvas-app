import { FC, useState } from "react";
import styles from "./OverlayMenu.module.css";

export const OverlayMenu: FC = ({ children }) => {
    const [hidden, setHidden] = useState(true)
    return <div className={styles.menu} >
        {
            hidden ?
                <button className={styles.toggle} onClick={() => setHidden(false)} title="Show controls">Controls &gt;</button>
                :
                <>
                    <button className={styles.toggle} onClick={() => setHidden(true)} title="Hide controls">&times;</button>
                    {children}
                </>
        }</div>

}