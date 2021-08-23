import { FC, useState } from "react";

export const OverlayMenu: FC = ({ children }) => {
    const [hidden, setHidden] = useState(true)
    return <div>
        {hidden ? <p onClick={() => setHidden(false)}>&gt;</p> :
            <div>
                <p onClick={() => setHidden(true)}>&times;</p>
                {children}
            </div>
        }
    </div>
}