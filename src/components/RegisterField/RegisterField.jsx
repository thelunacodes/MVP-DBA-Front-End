import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./RegisterField.css"



export default function RegisterField({labelText, identifier, ref=undefined, inputType, inputValue, action, isRequired=true}) {
    const [showPassword, setShowPassword] = useState(false);

    
     
    return (
        <div className="registerField">
            <label className="semibold" htmlFor={identifier}>{labelText}</label>
            <div className="registerInputContainer">
                <input className={`registerInput ${inputType === "password" && "password"}`}
                    type={inputType === "password" && showPassword ? "text" : inputType}
                    name={identifier}
                    id={identifier} 
                    value={inputValue} 
                    onChange={action} 
                    ref={ref}
                    required={isRequired} />
                { inputType === "password" && 
                    <div className="wrapper showPassword flex vCenter" title={showPassword ? "Hide password" : "Show password"}>
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={() => setShowPassword(!showPassword)} />    
                    </div>
                }
            </div>
        </div>
    )
}