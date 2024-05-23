import React from 'react';
import { Context } from "../../core/contexts/Context";
import { axiosClient } from '../../core/services';
import { useState } from "react";
import { ListView } from "../../shared/ui";

//const ListView = React.lazy(() => import("../../shared/ui/ListView"));
const Profile = () => {
    const {user, setUser} = React.useContext(Context);
    const [errors, setErrors] = useState([""]);
    let [users, setUsers] = useState([user]);
    //let newUser = { uuid: '', name: '', email: '', pwd: '', photoURL: '', createdDate: new Date(), active: false };

    const handleChange = (event:any) => {
        setErrors([]);
        let value = event.target.value;
        //let updUser = Object.assign({}, user);
        switch(event.target.name) {
            case "email":
                if(!value) {
                    setErrors(["* Please enter your email"]);
                }
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    setErrors(["* Enter a valid email"]);
                }
                user.email = value;
                break;
            case "password":
                if(value.length <= 3) {
                    setErrors(["* Password no valid"]);
                }
                user.pwd = value;
                break;
            case "username":
                if(!value) {
                    setErrors(["* Enter a valid username."]);
                }
                else if(value.length <= 7) {
                    setErrors(["* Username must be longer than 7 digits."]);
                }
                user.name = value;
                break;
            case "photoURL":
                if(!value) {
                    setErrors(["* Select a user picture."]);
                }
                user.photoURL = value;
                break;
            case "active":
                user.active = event.target.checked;
                break;
        }
        updateView(user);
        validateFields();
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        validateFields();
    }

    const setRecord = async (action:number) => {
        let newobj = Object.assign([user], users.filter(u => u.uuid !== ''));
        if(action === 0) {
            let selectUser = {
                uuid: newobj[0].uuid,
                name: newobj[0].name,
                email: newobj[0].email,
                pwd: newobj[0].pwd,
                photoURL: newobj[0].photoURL,
                createdDate: newobj[0].createdDate,
                active: newobj[0].active
            };
            updateView(selectUser);
            setErrors([]);
        }
        else if(action === 2) {
            //looks like the react-state ain't updating these elements.
            (document.getElementById('username') as any).value = '';
            (document.getElementById('email') as any).value = '';
            (document.getElementById('pwd') as any).value = '';
            updateView({ uuid: '', name: '', email: '', pwd: '', photoURL: '', createdDate: new Date(), active: false });
            setErrors(['* Fill out all information needed.']);
        }
        else if(action === 3) {
            await axiosClient.delete(`user/${ user.uuid }`).then((res:any) => {
                if(res.status === 200) {
                    alert(res.data.message);
                    let newList = newobj.filter(u => u.uuid !== user.uuid);
                    updateView(newList[0], newList);
                    setErrors([]);
                }
                else {
                    setErrors([res.message]);
                }
            }).catch((error) => {
                setErrors([error.message]);
            });
        }
        else {
            if(action === 1) {
                if(user.uuid) {
                    await axiosClient.put("user/", user).then((res:any) => {
                        if(res.status === 200) {
                            alert(res.data.message);
                            newobj[newobj.findIndex(u => u.uuid === res.data.entity.uuid)] = res.data.entity;
                            updateView(res.data.entity, newobj);
                            setErrors([]);
                        }
                        else {
                            setErrors([res.message]);
                        }
                    }).catch((error) => {
                        setErrors([error.message]);
                    });
                }
                else {
                    if(!user.name || !user.email || !user.pwd) {
                        setErrors(['Insufficient data provided.']);
                    }
                    else {
                        await axiosClient.post("auth/", user).then((res:any) => {
                            if(res.status === 200) {
                                newobj.push(res.data.entity);
                                updateView(res.data.entity, newobj);
                                setErrors([]);
                            }
                            else {
                                setErrors([res.message]);
                            }
                        }).catch((error) => {
                            setErrors([error.message]);
                        });
                    }
                }
            }
        }        
    }

    function updateView(selectUser:typeof user, records:any = []){
        if(records.length > 0){
            setUsers(records);
        }
        setUser(selectUser);
    }

    function validateFields() {
        if(errors.length == 0) {
            if(!user.name) {
                setErrors(["Please enter a valid username"]);
            }
            else if(!user.email) {
                setErrors(["Please enter your email"]);
            }
            else if(!user.pwd) {
                setErrors(["Please enter your password"]);
            }
        }
    }

    return (
        <div className="container">
            <div className="modal-content">
                <div className="row" style={{height:'85%'}}>
                    <div style={{width:"100%", textAlign:"center", paddingTop:"15px"}}>
                        My Profile
                    </div>
                    <div className="col profile-content">
                        <form style={{width:'100%', float:"right"}} onSubmit={handleSubmit}>
                        <br/>
                            <div className="row profile-row">
                                <div className="col" style={{maxWidth:"35%"}}>
                                    User name:
                                </div>
                                <div className="col">
                                    <input id='username' name="username" onChange={handleChange} className="profile-txtbox" type={"text"} value={user.name} required/>
                                </div>
                            </div>
                            <div className="row profile-row">
                                <div className="col" style={{maxWidth:"35%"}}>
                                    Email:
                                </div>
                                <div className="col">
                                    <input id='email' name="email" onChange={handleChange} className="profile-txtbox" type={"email"} value={user.email} required/>
                                </div>
                            </div>
                            <div className="row profile-row">
                                <div className="col" style={{maxWidth:"35%"}}>
                                    Password:
                                </div>
                                <div className="col">
                                    <input id='pwd' name="password" onChange={handleChange} className="profile-txtbox" 
                                        type={"password"} placeholder='*******' {...(user.uuid ? {} : {required:true})}/>
                                </div>
                            </div>
                            <div className="row profile-row">
                                <div className="col" style={{maxWidth:"35%"}}>
                                    Photo:
                                </div>
                                <div className="col">
                                    <select name="photoURL" className='profile-txtbox' onChange={handleChange} value={user.photoURL}>
                                        <option></option>
                                        <option value={"image-ink0.png"}>picture-0</option>
                                        <option value={"image-ink1.png"}>picture-1</option>
                                        <option value={"image-ink2.png"}>picture-2</option>
                                        <option value={"image-ink3.png"}>picture-3</option>
                                        <option value={"image-ink4.png"}>picture-4</option>
                                        <option value={"image-ink5.png"}>picture-5</option>
                                        <option value={"image-ink6.png"}>picture-6</option>
                                        <option value={"image-ink7.png"}>picture-7</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row profile-row">
                                <div className="col" style={{maxWidth:"35%"}}>
                                    Active:
                                </div>
                                <div className="col">
                                    <input name="active" onChange={handleChange} className='check-box' type={"checkbox"} checked={user.active}/>
                                </div>
                            </div>
                                { user.uuid ? 
                                    (
                                        <div>
                                            <button className="profile-button" type='submit' onClick={ ()=> setRecord(3) } style={{border:"2px solid #e65e5e"}}>Delete</button>
                                            <button className="profile-button" type='submit' onClick={ ()=> setRecord(2) } style={{border:"2px solid #1d7db8"}}>New</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button className="profile-button" type='button' onClick={ ()=> setRecord(0) } style={{border:"2px solid #b9c5d1"}}>Cancel</button>
                                        </div>
                                    )
                                }
                                <button className="profile-button" type='submit' onClick={ ()=> setRecord(1) } disabled={errors.length > 0}>Save</button>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            {errors.map((error, index)=>(
                                <p style={{color: "red"}} key={index}>{error}</p>
                            ))}
                        </form>
                    </div>
                    <div className="col">
                        <br/>
                        <ListView updateView={updateView} users={users} setUsers={setUsers} setErrors={setErrors}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;