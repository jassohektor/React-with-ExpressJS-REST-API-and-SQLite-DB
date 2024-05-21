import { axiosClient } from "../../core/services";
import { useState } from "react";
import { app } from "../../shared/utils";

export function Login() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errors, setErrors] = useState([""]);

    const handleChange = (event:any) => {
        switch(event.target.name){
            case "email":
                if(!event.target.value) {
                    setErrors(["Please enter your email"]);
                }
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value)) {
                    setErrors(["Enter a valid email"]);
                }
                else {
                    setErrors([]);
                    setEmail(event.target.value);
                }
                
                break;
            case "pwd":
                let password: string = event.target.value;
                if(password.length <= 3){
                    setErrors(["Password no valid"]);
                }
                else {
                    setErrors([]);
                    setPwd(event.target.value)
                }
                break;
        }
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const user = { email, pwd };
        if(!email){
            setErrors(["Please enter your email"]);
            return;
        }
        if(!pwd){
            setErrors(["Please enter your password"]);
            return;
        }

        await axiosClient.post("auth/login/", user).then((res) => {
            if(res.status == 200) {
                setErrors([]);
                localStorage.setItem(`${app}.auth`, JSON.stringify(res.data));
                window.location.assign('/my-profile');
            }
            else {
                setErrors([res.data.message]);
                localStorage.clear();
            }
          }).catch((error) => {
            setErrors([error.message]);
          });
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="app-login">
                <div className="login-content">
                    <div className="row image-container">
                        <img className="login-img" src={require("../../assets/login.png")}></img>
                    </div>
                    <br/>
                    <span style={{fontFamily:"Segoe UI, sans-serif"}}>Login</span>
                    <br/>
                    <br/>
                    <div className="row textbox-container">
                        <input name="email" className="text-box" type={"email"} placeholder="user@corp.com" onChange={handleChange} autoComplete={"username"} required/>
                    </div>
                    <br/>
                    <div className="row textbox-container">
                        <input name="pwd" className="text-box" type={"password"} placeholder="*****" onChange={handleChange} autoComplete={"current-password"} required/>
                        <input type={"submit"} className="submit-bttn" value={""}></input>
                        <br/>
                        <br/>
                        {errors.map((error, index)=>(
                            <p style={{color: "red"}} key={index}>{error}</p>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
}