import FormField from "../../components/FormField/FormField";
import CardBox from "../../components/CardBox/CardBox";
import "./PageLogin.css"
import { useState } from "react";
import { API_URL } from "../../appConsts";

export default function PageLogin() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)

    function login(e) {
        e.preventDefault();



        let url = `${API_URL}/login`
    }



    return (
        <div className="flex vCenter hCenter mainPageContainer">
                <CardBox cardContent={
                    <div>
                        <form className="flex column vCenter hCenter loginForm" onSubmit={login}>
                            <h1 className="loginHeader">Sign in</h1>
                        
                            <FormField 
                                labelText="Email Address"
                                inputType="email"
                                identifier="Email"
                                inputValue={email}
                                action={(e) => setEmail(e.target.value)}
                                isRequired={true}
                            />

                            <FormField 
                                labelText="Password"
                                inputType="password"
                                identifier="Password"
                                inputValue={password}
                                action={(e) => setPassword(e.target.value)}
                                isRequired={true}
                            />
    
                            <p className="centeredText" style={{margin: "0px"}}>Are you new here? <a className="signUpShortcut" href="/register">Click here to sign up!</a></p>
                              
                            <button type="submit" className="appButton loginBtn" disabled={isLoading}>Login</button>
                        </form>
                    </div>
                } hasRoundedCorner={true} 
            />
        </div>
    )
}