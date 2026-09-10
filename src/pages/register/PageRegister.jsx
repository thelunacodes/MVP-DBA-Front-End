import { useEffect, useRef, useState } from "react";
import zxcvbn from "zxcvbn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

import CardBox from "../../components/CardBox/CardBox"
import FormField from "../../components/FormField/FormField";
import { API_URL } from "../../appConsts";

import "./PageRegister.css"
import { isEmpty } from "../../utilFuncs";


export default function PageRegister() {
    const [ passwordStrength, setPasswordStrength ] = useState(0);
    const [ isSaving, setIsSaving ] = useState(false);
    
    // Form data
    const [ fullName, setFullName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("");

    // Refs
    const formRef = useRef(null);
    const fullNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const pwRepeatRef = useRef(null);

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

        // Full name validation
        if (fullNameRef.current) {
            const fullNameSplit = fullName.split(" ").filter(Boolean);

            if (isEmpty(fullName)) {
                fullNameRef.current.setCustomValidity("Full name is required.")
                isValid = false
            } else if (fullNameSplit.length < 2) { // Check if full name contains surname
                fullNameRef.current.setCustomValidity("Full name must include a surname.")
                isValid = false
            } else {
                fullNameRef.current.setCustomValidity("")
            }
        } 

        // Email validation
        if (emailRef.current) {
            if (isEmpty(email)) {
                emailRef.current.setCustomValidity("Email address is required.")
                isValid = false
            } else {
                emailRef.current.setCustomValidity("")
            }
        } 

        // Password validation
        if (passwordRef.current) {
            if (isEmpty(password)) { 
                passwordRef.current.setCustomValidity("Password is required.")
                isValid = false;
            } else if (passwordStrength < 2) { // Check if password strengh is, at least, 2 (ok)
                passwordRef.current.setCustomValidity("Please, choose a stronger password.")
                isValid = false;
            } else {
                passwordRef.current.setCustomValidity("")
            }
        } 

        // Password (confirmation) validation
        if (pwRepeatRef.current) {
            if (isEmpty(passwordConfirmation)) {
                pwRepeatRef.current.setCustomValidity("You must confirm your password."); 
                isValid = false;
            } else if (password !== passwordConfirmation) { 
                pwRepeatRef.current.setCustomValidity("You must enter the same value you've used in the \"Password\" field!"); 
                isValid = false;
            } else {
                pwRepeatRef.current.setCustomValidity("")
            }
        }

        return isValid;
    }

    function register(e) {
        e.preventDefault();
        setIsSaving(true)
        
        var isValid = validateFields();

        if (!isValid && formRef.current) {
            formRef.current.reportValidity();
            return;
        }

        let registerJson = getUserJson()
        let url = `${API_URL}/user`

        fetch(url, {method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(registerJson)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Unable to create new user (${res.status} - ${res.statusText})`);
            } 
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
            <title>Book Reviews - Register</title>

            <CardBox cardContent={
                <div>
                    <div className="registerHeaderRow">
                        <div className="flex vCenter hCenter backIconContainer" onClick={() => navigate("/home")} title="Return to homepage">
                            <FontAwesomeIcon icon={faArrowLeft} className="backIcon"/>
                        </div>
                        <h1 className="registerHeader">Sign up</h1>
                    </div>
                    <form ref={formRef} className="flex column vCenter hCenter registerForm" onSubmit={(e) => register(e)}>
                        
                        <FormField 
                            labelText="Full Name"
                            inputType="text"
                            identifier="FullName"
                            inputValue={fullName}
                            ref = {fullNameRef}
                            action={(e) => {
                                setFullName(e.target.value); 
                                fullNameRef.current.setCustomValidity("");
                            }}
                        />

                        <FormField 
                            labelText="Email Address"
                            inputType="email"
                            identifier="Email"
                            inputValue={email}
                            ref={emailRef}
                            action={(e) => { 
                                setEmail(e.target.value);
                                emailRef.current.setCustomValidity("");
                            }}
                        />

                        <div className="flex row passwordField">
                            <FormField 
                                labelText="Password"
                                inputType="password"
                                identifier="Password"
                                inputValue={password}
                                ref={passwordRef}
                                action={(e) => {
                                    setPassword(e.target.value); 
                                    passwordRef.current.setCustomValidity("");
                                }}
                             />

                            <FormField 
                                labelText="Confirm Password"
                                inputType="password"
                                identifier="ConfirmPassword"
                                inputValue={passwordConfirmation}
                                ref={pwRepeatRef}
                                action={(e) => {
                                    setPasswordConfirmation(e.target.value); 
                                    pwRepeatRef.current.setCustomValidity("");
                                }}
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