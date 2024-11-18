import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import "../../../styles/LoginStyles.css";
import logo from "../../../img/logo.png"
import {useNavigate} from "react-router-dom"

const Login = () => {

    const [formInput, setFormInput] = useState({username: '', password: ''})
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { login,user, errors } = useAuth();
    

    useEffect(() => {
        if(user){
            navigate('/')
        }
        console.log("this login")
    },[user])

    const updateFormInput = e => {
        e.persist()

        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await login(formInput);
        setLoading(false)
    }

    return (
        <>
            <div className="layout-containerd">
                <div className="left-layout">
                </div>
                <div className="right-layout">
                    <div className="logo-container">
                        <img src={logo} alt="Image Logo goes here" className="logo"/>
                    </div>
                    <div className="login-wrapper">
                        <div className="login-greeting">
                            <div>
                                <h2>Welcome to QC PPDIS!</h2>
                                <p>You need to Log in to access the system.</p>
                            </div>
                        </div>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input type="text"  onChange={updateFormInput} name="username" className="username text" placeholder="type in your username..."/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password"  onChange={updateFormInput} name="password" className="password text" placeholder="type in your password..."/>
                            </div>
                            <div>
                               {errors && <p style={{ color: 'red' }}>{errors}</p>}
                            </div>
                            <div className="">
                                {isLoading?<input type="submit" className="submit-btn-d" value="Loading..." disabled={true}/> :
                                <input type="submit" className="submit-btn" value="Log in" />
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login
