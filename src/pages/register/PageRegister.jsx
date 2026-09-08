import { useFormStatus } from "react-dom";
import CardBox from "../../components/CardBox/CardBox"
import "./PageRegister.css"
import { useState } from "react";
import zxcvbn from "zxcvbn";


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

    function getPasswordStrength() {
        let trimmedFullname = fullName.trim();
        let firstName = trimmedFullname.split(" ")[0];
        let lastName = trimmedFullname.substring(firstName.length+1)
        
        let pwStrength = zxcvbn(password, [firstName, lastName, email])
        setPasswordStrength(pwStrength.score)
    }

    function onPasswordChange() {
        console.log("Password changed!")
        getPasswordStrength()
    }

    const pwStrengthDict = { 0: "Very Weak", 1: "Weak", 2: "Ok", 3: "Good", 4: "Strong"}

    return(
        <div className="flex vCenter hCenter mainPageContainer">
            <CardBox cardContent={
                <div>
                    <form className="flex column vCenter hCenter registerForm">
                        <h1 className="registerHeader">Sign up</h1>
                        <div className="registerField">
                            <label for="FullName">Full Name</label>
                            <input className="registerInput" 
                                    type="text" 
                                    name="FullName" 
                                    id="FullName" 
                                    value={fullName} 
                                    onChange={(e) => setFullName(e.target.value)} 
                                    required />
                        </div>

                        <div className="registerField">
                            <label for="Email">Email Address</label>
                            <input className="registerInput" 
                                    type="email" 
                                    name="Email" 
                                    id="Email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required />
                        </div>

                        <div className="flex row passwordField">
                            <div className="registerField">
                                <label for="Password">Password</label>
                                <input className="registerInput" 
                                    type="password" 
                                    name="Password" 
                                    id="Password" 
                                    value={password} 
                                    onChange={(e) => { setPassword(e.target.value); onPasswordChange()}}
                                    required />
                            </div>

                            <div className="registerField">
                                <label for="ConfirmPassword">Confirm Password</label>
                                <input className="registerInput" 
                                    type="password" 
                                    name="ConfirmPassword" 
                                    id="ConfirmPassword" 
                                    value={pwRepeat} 
                                    onChange={ (e) => { setPwRepeat(e.target.value); validatePwRepeat()} } 
                                    required />
                            </div>
                        </div>         
                        <div>
                            <p>Password Strength: {pwStrengthDict[passwordStrength]}</p>

                            <p>Password tips:</p>
                            <ul>
                                <li>Include both uppercase and lowercase characters!</li>
                                <li>Include numbers and symbols!</li>
                                <li>Make the password, at least, eight (8) characters long!</li>
                            </ul>
                            
                        </div>               

                        <div className="registerField">
                            <label for="DateOfBirth">Date of Birth</label>
                            <input type="date" 
                                name="DateOfBirth" 
                                id="DateOfBirth" 
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required />
                        </div>

                        <button type="submit" className="appButton">Register</button>
                    </form>
                </div>
            } hasRoundedCorner={true} />
        </div>
        
    )
}