import React, { useCallback, useEffect } from "react";
import { Context } from "../contexts/Context";
import { Link } from "react-router-dom";
import '../../styles/bootstrap.min.css';
import { app } from "../../shared/utils";

export function Header() {
    const initLoad = useCallback(async ()=> {
      setAuth(false);
      let url: string = window.location.href;
      let auth = localStorage.getItem(`${app}.auth`);
      if(auth){
        let data = JSON.parse(auth);
        setName(data.name);
        setEmail(data.email);
        setAuth(true);
      }
      else if(!url.endsWith('/login')) {
        window.location.assign('/login');
      }
    }, []);
  
    useEffect(()=>{ initLoad(); }, []);

    const { name, isAuthenticated, setName, setAuth, setEmail } = React.useContext(Context);
    const logOut = ()=>{
      setAuth(false);
      localStorage.clear();
      window.location.assign('/login');
    }
    return (
      <div>
        <div>
        {
        !isAuthenticated &&
          <div style={{ height: '62px' }}></div>
        }
        </div>
        {
          isAuthenticated &&
          <div className="row content">
            <div className="col link-content" style={{ maxWidth: "20%" }}>
              <Link className="link-button" style={{float: "left", marginLeft: "5px" }} to="/">Home</Link>
              <Link className="link-button" style={{float: "left", marginLeft: "5px" }} to="/my-profile">Profile</Link>
            </div>
            <div className="col link-content" style={{ maxWidth: "80%" }}>
              <div className="row">
                <div className="col-9 header">
                  <label>Welcome: {name}</label>
                </div>
                <div className="col-2">
                  <button style={{ float: "right", marginRight: "-54%" }} className="link-button" onClick={ logOut }>Logout</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }