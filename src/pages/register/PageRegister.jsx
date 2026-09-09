import { useFormStatus } from "react-dom";
import CardBox from "../../components/CardBox/CardBox"
import "./PageRegister.css"
import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import RegisterField from "../../components/RegisterField/RegisterField";


export default function PageRegister() {
    const [ passwordStrength, setPasswordStrength ] = useState(0);
    
    // Form data
    const [ fullName, setFullName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ pwRepeat, setPwRepeat ] = useState("");
    const [ dateOfBirth, setDateOfBirth ] = useState(null);

    // Form validation
    const [ pwConfirmed, setPwConfirmed ] = useState(false);

    function validatePwRepeat() {
        const isEqual = password === pwRepeat;
        setPwConfirmed(isEqual)
    }

    useEffect(() => {
        let trimmedFullname = fullName.trim();
        let firstName = trimmedFullname.split(" ")[0];
        let lastName = trimmedFullname.substring(firstName.length+1)
        
        let pwStrength = zxcvbn(password, [firstName, lastName, email])
        setPasswordStrength(pwStrength.score)
    }, [password, fullName, email] )

    
    const pwStrengthDict = { 0: { strengthLabel: "Very Weak", strengthClass: "veryWeak"}, 
                            1: { strengthLabel: "Weak", strengthClass: "weak"},
                            2: { strengthLabel: "Ok", strengthClass: "ok"},
                            3: { strengthLabel: "Good", strengthClass: "good"},
                            4: { strengthLabel: "Strong", strengthClass: "strong"} }

    return(
        <div className="flex vCenter hCenter mainPageContainer">
            <CardBox cardContent={
                <div>
                    <form className="flex column vCenter hCenter registerForm">
                        <h1 className="registerHeader">Sign up</h1>
                        <RegisterField 
                            labelText="Full Name"
                            inputType="text"
                            identifier="FullName"
                            inputValue={fullName}
                            action={(e) => setFullName(e.target.value)}
                            isRequired={true}
                        />

                        <RegisterField 
                            labelText="Email Address"
                            inputType="email"
                            identifier="Email"
                            inputValue={email}
                            action={(e) => setEmail(e.target.value)}
                            isRequired={true}
                        />

                        <div className="flex row passwordField">
                            <RegisterField 
                                labelText="Password"
                                inputType="password"
                                identifier="Password"
                                inputValue={password}
                                action={(e) => {setPassword(e.target.value)}}
                                isRequired={true}
                             />

                            <RegisterField 
                                labelText="Confirm Password"
                                inputType="password"
                                identifier="ConfirmPassword"
                                inputValue={pwRepeat}
                                action={(e) => { setPwRepeat(e.target.value); validatePwRepeat()}}
                                isRequired={true}
                            />
                        </div>         
                        <div className="flex column" style={{gap: "15px"}}>
                            <div className="flex column vCenter pwStrengthContainer">
                                <div className="pwStrengthBar">
                                    <div className={`pwStrengthProgress ${pwStrengthDict[passwordStrength].strengthClass}`} style={{ width: `${passwordStrength * 25}%` } }/>
                                </div>

                                <div className="flex column vCenter wrapper">
                                    <p className="semibold">Password Strength:</p>
                                    <p>{pwStrengthDict[passwordStrength].strengthLabel}</p>
                                </div>
                                    
                            </div>

                            <div className="wrapper">
                                <label className="pwTipsLabel semibold">Password tips:</label>
                                <ul>
                                    <li>Include both uppercase and lowercase characters!</li>
                                    <li>Include numbers and symbols!</li>
                                    <li>Make the password, at least, eight (8) characters long!</li>
                                </ul>
                            </div>
                            
                            
                        </div>               

                        <RegisterField 
                            labelText="Date of Birth"
                            inputType="date"
                            identifier="DateOfBirth"
                            inputValue={dateOfBirth}
                            action={(e) => setDateOfBirth(e.target.value)}
                            isRequired={true}
                        />

                        <button type="submit" className="appButton registerBtn">Register</button>
                    </form>
                </div>
            } hasRoundedCorner={true} />
        </div>
        
    )
}