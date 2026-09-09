import { useEffect, useRef, useState } from "react";
import zxcvbn from "zxcvbn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

import CardBox from "../../components/CardBox/CardBox"
import RegisterField from "../../components/RegisterField/RegisterField";
import { API_URL } from "../../appConsts";

import "./PageRegister.css"


export default function PageRegister() {
    const [ passwordStrength, setPasswordStrength ] = useState(0);
    const [ isSaving, setIsSaving ] = useState(false);
    
    // Form data
    const [ fullName, setFullName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("");

    // Refs
    const formRef = useRef(undefined);
    const fullNameRef = useRef(undefined);
    const passwordRef = useRef(undefined);
    const pwRepeatRef = useRef(undefined);

    let navigate = useNavigate();

    //build user json
    function getUserJson() {
        let json = {}
        
        json.fullname = fullName
        json.email = email
        json.password = password

        return json;
    }

    // Check password strength
    useEffect(() => {
        let trimmedFullname = fullName.trim();
        let firstName = trimmedFullname.split(" ")[0];
        let lastName = trimmedFullname.substring(firstName.length+1)
        
        let pwStrength = zxcvbn(password, [firstName, lastName, email])
        setPasswordStrength(pwStrength.score)
    }, [password, fullName, email] )

    function validateFields() {
        var isValid = true;

        // Check if full name contains surname
        if (fullNameRef.current) {
            const fullNameSplit = fullName.split(" ").filter(Boolean);
            console.log(fullNameSplit)
            if (fullNameSplit.length < 2) {
                fullNameRef.current.setCustomValidity("Full name must include a surname.")
                isValid = false
            } else {
                fullNameRef.current.setCustomValidity("")
            }
        } 

        // Check if password strengh is, at least, 2 (ok)
        if (passwordRef.current) {
            console.log(`Current Password strength: ${passwordStrength}`)
            if (passwordStrength < 2) {
                passwordRef.current.setCustomValidity("Please, choose a stronger password")
                isValid = false;
            } else {
                passwordRef.current.setCustomValidity("")
            }
            
        } 

        // Check if both passwords are equal
        if (pwRepeatRef.current && password !== passwordConfirmation) {
            pwRepeatRef.current.setCustomValidity("You must enter the same value you've used in the \"Password\" field!"); 
            isValid = false;
        } else {
            pwRepeatRef.current.setCustomValidity("")
        }

        return isValid;
    }

    function register(e) {
        e.preventDefault();
        
        var isValid = validateFields();

        if (!isValid && formRef.current) {
        formRef.current.reportValidity();
        return;
    }

        setIsSaving(true)
        let registerJson = getUserJson()
        let url = `${API_URL}/user`

        fetch(url, {method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(registerJson)
        })
        .then(res => {
            if (!res.ok) throw new Error(`Unable to create new user: ${res.status}`); 
            return res.json()
        })
        .then(data => {
            //TODO: modal de sucesso :D
            setIsSaving(false)
            navigate("/login")
        })
        .catch(err => {
            setIsSaving(false)
            console.error(err)
        })

        
    }
    
    const pwStrengthDict = { 0: { strengthLabel: "Very Weak", strengthClass: "veryWeak"}, 
                            1: { strengthLabel: "Weak", strengthClass: "weak"},
                            2: { strengthLabel: "Ok", strengthClass: "ok"},
                            3: { strengthLabel: "Good", strengthClass: "good"},
                            4: { strengthLabel: "Strong", strengthClass: "strong"} }

    return(
        <div className="flex vCenter hCenter mainPageContainer">
            <CardBox cardContent={
                <div>
                    <div className="registerHeaderRow">
                        <div className="flex vCenter hCenter backIconContainer" onClick={() => navigate("/home")} title="Return to homepage">
                            <FontAwesomeIcon icon={faArrowLeft} className="backIcon"/>
                        </div>
                        <h1 className="registerHeader">Sign up</h1>
                    </div>
                    <form ref={formRef} className="flex column vCenter hCenter registerForm" onSubmit={register}>
                        
                        <RegisterField 
                            labelText="Full Name"
                            inputType="text"
                            identifier="FullName"
                            inputValue={fullName}
                            ref = {fullNameRef}
                            action={(e) => {
                                setFullName(e.target.value); 
                                fullNameRef.current.setCustomValidity("");
                            }}
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
                                ref={passwordRef}
                                action={(e) => {
                                    setPassword(e.target.value); 
                                    passwordRef.current.setCustomValidity("");
                                }}
                                isRequired={true}
                             />

                            <RegisterField 
                                labelText="Confirm Password"
                                inputType="password"
                                identifier="ConfirmPassword"
                                inputValue={passwordConfirmation}
                                ref={pwRepeatRef}
                                action={(e) => {
                                    setPasswordConfirmation(e.target.value); 
                                    pwRepeatRef.current.setCustomValidity("");
                                }}
                                isRequired={true}
                            />
                        </div>        
                        <div className="flex column" style={{gap: "15px"}}>
                            <div className="flex column vCenter pwStrengthContainer">
                                <div className="pwStrengthBar">
                                    <div className={`pwStrengthProgress ${pwStrengthDict[passwordStrength].strengthClass}`} style={{ width: `${passwordStrength * 25}%` } }/>
                                </div>

                                <div className="flex row vCenter wrapper" style={{gap: "5px"}}>
                                    <p className="semibold">Password Strength:</p>
                                    <p>{pwStrengthDict[passwordStrength].strengthLabel}</p>
                                </div>
                            </div>

                            <div className="wrapper">
                                <label className="pwTipsLabel semibold">Password tips:</label>
                                <ul className="pwTipsList">
                                    <li>Include both uppercase and lowercase characters.</li>
                                    <li>Include numbers and symbols.</li>
                                    <li>Make the password, at least, eight (8) characters long.</li>
                                </ul>
                            </div>

                            <p className="centeredText" style={{margin: "0px"}}>Already have an account? <a className="signInShortcut" href="/login">Click here to sign in!</a></p>
                        </div>     

                        <button type="submit" className="appButton registerBtn" disabled={isSaving}>Register</button>
                    </form>
                </div>
            } hasRoundedCorner={true} />
        </div>
        
    )
}