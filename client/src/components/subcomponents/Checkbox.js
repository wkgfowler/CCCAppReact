import { useRef, useState, forwardRef } from "react";

const Checkbox = forwardRef ((props, ref) => {
    //const [isChecked, setIsChecked] = useState(false);
    // checked={isChecked} onChange={() => setIsChecked((prev) => !prev)}

    return (
        <div className="checkbox-wrapper">
            <label>
                <input type="checkbox" ref={ref}/>
                <span>{props.label}</span>
            </label>
        </div>
    );
});
 
export default Checkbox;