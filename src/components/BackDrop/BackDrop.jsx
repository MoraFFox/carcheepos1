import './BackDrop.css';
import { useState } from "react";
const BackDrop = () => {
    const [backDrop, setBackDrop] = useState(false);
    return (
        <div className={backDrop ? "backdrop" : ""} onClick={() => setBackDrop(false)}></div>
    );
};
export default BackDrop;
