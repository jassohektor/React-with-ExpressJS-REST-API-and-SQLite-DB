import { getImageUrl, formatDate } from "../../shared/utils";
import React, { useCallback, useEffect } from 'react';
import { Context } from "../../core/contexts/Context";
import { axiosClient } from '../../core/services';

export function ListView({users, setUsers, updateView, setErrors}: any) {
    const { user, setAuth } = React.useContext(Context);
    
    const getData = useCallback(async ()=> {
        await axiosClient.get("user/").then((res:any)=> {
            setUsers([]);
            let newUsers:any = [];
            if(res.data) {
                res.data.forEach((user:any) => {
                    newUsers.push(user);
                });
                if(!user.uuid){
                    selectItem(newUsers[0]);
                }
                setUsers(newUsers);
            }
            else if(res.response.status === 401) {
                setAuth(false);
                localStorage.clear();
                window.location.assign('/login');
            }
        });
    }, []);
  
    useEffect(()=>{ 
        getData();
    }, []);

    function selectItem(selectedUser:any) {
        updateView(selectedUser);
        setErrors([]);
    }

    function userContent(user:any) {
        return (
            <div className='row' style={{marginLeft:"2px"}}>
                <div className='col' style={{maxWidth:"74px"}}>
                    <img src={getImageUrl(user)} className='list-picture' alt={user.name}/>
                </div>
                <div className='col' style={{textAlign:"left"}}>
                    <p style={{fontSize:"12px"}}>
                        <b>{user.name}:</b><br/>
                        {' ' + user.email + ' '}<br/>added on {user?formatDate(user.createdDate):''}
                    </p>
                </div>
            </div>
        );
    }

    return (
    <div className='content-scroll'>
        <ul style={{ width:"100%", height:"74px" }}>{
            users.filter((e:typeof user) => e.uuid !== '').map((rowuser:any, index:number) => 
                <li key={index} className={(rowuser.uuid === user.uuid ? 'list-content-selected' : 'list-content')} onClick={()=> selectItem(rowuser)}>
                    { userContent(rowuser) }
                </li>
            )
        }</ul>
    </div>);
};