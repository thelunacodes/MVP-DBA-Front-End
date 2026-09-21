import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./FormField.css"

export default function FormField({labelText, identifier, inputType, inputValue, errMsg="", showErrMsg=false, action}) {
    const [showPassword, setShowPassword] = useState(false);    
     
    return (
        <div className="formField">
            <label className="semibold formLabel" htmlFor={identifier}>{labelText}</label>
            <div className="formInputContainer">
                <input className={`formInput ${inputType === "password" && "password"}`}
                    type={inputType === "password" && showPassword ? "text" : inputType}
                    name={identifier}
                    id={identifier} 
                    value={inputValue} 
                    onChange={action} 
                    formNoValidate/>
                { inputType === "password" && 
                    <div className="wrapper showPassword flex vCenter" title={showPassword ? "Hide password" : "Show password"}>
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={() => setShowPassword(!showPassword)} />    
                    </div>
                }
            </div>
            { showErrMsg && <p className="errMsg">{errMsg}</p> }
        </div>
    )
}