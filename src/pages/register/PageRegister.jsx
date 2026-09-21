import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import zxcvbn from "zxcvbn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./PageRegister.css"
import { isEmpty } from "../../utilFuncs";
import CardBox from "../../components/CardBox/CardBox"
import FormField from "../../components/FormField/FormField";
import { API_URL } from "../../appConsts";

export default function PageRegister() {
    const [ passwordStrength, setPasswordStrength ] = useState(0);
    const [ isSaving, setIsSaving ] = useState(false);
    
    // Form data
    const [ fullName, setFullName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("");

    // Form Errors
    const [ fullNameErr, setFullNameErr ] = useState("")
    const [ showFullNameErr, setShowFullNameErr ] = useState(false)

    const [ emailErr, setEmailErr ] = useState("")
    const [ showEmailErr, setShowEmailErr ] = useState(false)

    const [ passwordErr, setPasswordErr ] = useState("")
    const [ showPasswordErr, setShowPasswordErr ] = useState(false)

    const [ pwRepeatErr, setPwRepeatErr ] = useState("")
    const [ showPwRepeatErr, setShowPwRepeatErr ] = useState(false)

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
        const fullNameSplit = fullName.split(" ").filter(Boolean);

        if (isEmpty(fullName)) {
            setFullNameErr("Full name is required.")
            setShowFullNameErr(true)
            isValid = false
        } else if (fullNameSplit.length < 2) { // Check if full name contains surname
            setFullNameErr("Surname is required.")
            setShowFullNameErr(true)
            isValid = false
        } else {
            setShowFullNameErr(false)
        }

        // Email validation
        if (isEmpty(email)) {
            setEmailErr("Email address is required.")
            setShowEmailErr(true)
            isValid = false
        } else {
            setShowEmailErr(false)
        }

        // Password validation
        if (isEmpty(password)) { 
            setPasswordErr("Password is required.")
            setShowPasswordErr(true)
            isValid = false;
        } else if (passwordStrength < 2) { // Check if password strengh is, at least, 2 (ok)
            setPasswordErr("Please, choose a stronger password.")
            setShowPasswordErr(true)
            isValid = false;
        } else {
            setShowPasswordErr(false)
        }
        
        // Password (confirmation) validation
        if (isEmpty(passwordConfirmation)) {
            setPwRepeatErr("You must confirm your password."); 
            setShowPasswordErr(true)
            isValid = false;
        } else if (password !== passwordConfirmation) { 
            setPwRepeatErr("You must enter the same value you've used in the \"Password\" field!"); 
            setShowPwRepeatErr(true)
            isValid = false;
        } else {
            setShowPwRepeatErr(false)
        }
        
        return isValid;
    }

    function register(e) {
        e.preventDefault();
        setIsSaving(true)
        
        var isValid = validateFields();

        if (!isValid) {
            setIsSaving(false);
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
            if (!res.ok) throw new Error(`Unable to create new user (${res.status} - ${res.statusText})`); 
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
                <div className="registerContainer">
                    <div className="registerHeaderRow">
                        <div className="flex vCenter hCenter backIconContainer" onClick={() => navigate("/home")} title="Return to homepage">
                            <FontAwesomeIcon icon={faArrowLeft} className="backIcon"/>
                        </div>
                        <h1 className="registerHeader">Sign up</h1>
                    </div>
                    <form className="flex column vCenter hCenter registerForm" onSubmit={(e) => register(e)}>
                        
                        <FormField 
                            labelText="Full Name"
                            inputType="text"
                            identifier="FullName"
                            inputValue={fullName}
                            errMsg = {fullNameErr}
                            showErrMsg={showFullNameErr}
                            action={(e) => setFullName(e.target.value) }
                        />

                        <FormField 
                            labelText="Email Address"
                            inputType="email"
                            identifier="Email"
                            inputValue={email}
                            errMsg = {emailErr}
                            showErrMsg={showEmailErr}
                            action={(e) => setEmail(e.target.value)}
                        />

                        <div className="flex row passwordField">
                            <FormField 
                                labelText="Password"
                                inputType="password"
                                identifier="Password"
                                inputValue={password}
                                errMsg = {passwordErr}
                                showErrMsg={showPasswordErr}
                                action={(e) => setPassword(e.target.value)}
                             />

                            <FormField 
                                labelText="Confirm Password"
                                inputType="password"
                                identifier="ConfirmPassword"
                                inputValue={passwordConfirmation}
                                errMsg = {pwRepeatErr}
                                showErrMsg={showPwRepeatErr}
                                action={(e) => setPasswordConfirmation(e.target.value)}
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