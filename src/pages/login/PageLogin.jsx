import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { API_URL } from "../../appConsts";
import { isEmpty } from "../../utilFuncs";
import { UseUserContext } from "../../providers/UserProvider";
import FormField from "../../components/FormField/FormField";
import CardBox from "../../components/CardBox/CardBox";
import "./PageLogin.css"


export default function PageLogin() {
    const { setUserId } = UseUserContext();

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    
    const [ showErrMsg, setShowErrMsg ] = useState(false)
    const [ errMsg, setErrMsg] = useState("")

    const navigate = useNavigate()

    //refs
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const formRef = useRef(null);

    function validateFields() {
        var isValid = true;

        // Check if user filled out both fields
        if (emailRef.current) {
            if (isEmpty(email)) {
                emailRef.current.setCustomValidity("Email address is required.")
                isValid = false
            } else {
                emailRef.current.setCustomValidity("")
            }
        } 

        if (passwordRef.current) {
           if (isEmpty(password)) {
                passwordRef.current.setCustomValidity("Password is required.")
                isValid = false
            } else {
                passwordRef.current.setCustomValidity("")
            }
        } 

        return isValid;
    }

    function getLoginJson() {
        let json = {}
        json.email = email
        json.password = password

        return json
    }

    function login(e) {
        e.preventDefault();
        setIsLoading(true);

        let isValid = validateFields()
        if (formRef.current && !isValid) {
            formRef.current.reportValidity();
            setIsLoading(false);
            return;
        }

        let loginJson = getLoginJson()
        let url = `${API_URL}/login`

        fetch(url, {method:"post",
            headers: {
                "content-type": "application/json"
            },            
            body: JSON.stringify(loginJson)
        })
        .then(res => res.json().then(data => ({ status: res.status, ok: res.ok, data})))
        .then(({ok, data}) => {
            // Display error message 
            if (!ok) {
                setErrMsg(data.message)
                setShowErrMsg(true);
                setIsLoading(false)
                return;
            }

            console.log(data)
            if (data.userId) setUserId(data.userId)

            setShowErrMsg(false)
            setErrMsg("")
            setIsLoading(false)
            navigate("/home")
        })
        .catch(err => {
            setIsLoading(false)
            console.error(err);
        })
    }

    return (
        <div className="flex vCenter hCenter mainPageContainer">
            <title>Book Reviews - Login</title>

            <CardBox cardContent={
                <div>
                    <div className="loginHeaderRow">
                        <div className="flex vCenter hCenter backIconContainer" onClick={() => navigate("/home")} title="Return to homepage">
                            <FontAwesomeIcon icon={faArrowLeft} className="backIcon"/>
                        </div>
                        <h1 className="loginHeader">Sign in</h1>
                    </div>
                    <form ref={formRef} className="flex column vCenter hCenter loginForm" onSubmit={login}>
                        <FormField 
                            labelText="Email Address"
                            inputType="email"
                            identifier="Email"
                            inputValue={email}
                            ref={emailRef}
                            action={(e) => {
                                setEmail(e.target.value)
                                emailRef.current.setCustomValidity("")
                            }}
                        />

                        <FormField 
                            labelText="Password"
                            inputType="password"
                            identifier="Password"
                            inputValue={password}
                            ref={passwordRef}
                            action={(e) => {
                                setPassword(e.target.value)
                                passwordRef.current.setCustomValidity("")
                            }}
                        />
                        { showErrMsg && <p className="centeredText errMsg">{errMsg}</p>}

                        <p className="centeredText" style={{margin: "0px"}}>Are you new here? <a className="signUpShortcut" href="/register">Click here to sign up!</a></p>
                            
                        <button type="submit" className="appButton loginBtn" disabled={isLoading}>Login</button>
                    </form>
                </div>
            } hasRoundedCorner={true} />
        </div>
    )
}