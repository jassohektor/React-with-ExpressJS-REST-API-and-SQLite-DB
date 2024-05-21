import React from "react";

interface IContext {
    uuid: string;
    name: string;
    email: string;
    isAuthenticated: boolean;
    user: { uuid:string, name:string, email:string, pwd:string, photoURL:string, createdDate: Date, active:boolean }
    action: { actionType:number }

    setUUID: React.Dispatch<React.SetStateAction<string>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<{ uuid:string, name:string, email:string, pwd:string, photoURL:string, createdDate: Date, active:boolean }>>;
    setAction: React.Dispatch<React.SetStateAction<{ actionType:number }>>;
}

const Context = React.createContext<IContext>({
    uuid:"",
    name: "",
    email: "",
    isAuthenticated: false,
    user: { uuid:"", name:"", email:"", pwd:"", photoURL:"", createdDate: new Date(), active:false },
    action: { actionType:0 },
    setUUID: ()=>{ },
    setName: ()=>{ },
    setEmail: ()=>{ },
    setAuth: ()=>{ },
    setUser: ()=>{ },
    setAction: ()=>{ }
});

interface IContextProvider {
    children: JSX.Element;
};

const ContextProvider = ({children}:IContextProvider) =>{
    const[uuid, setUUID] = React.useState("");
    const[name, setName] = React.useState("");
    const[email, setEmail] = React.useState("");
    const[isAuthenticated, setAuth] = React.useState(false);

    const[user, setUser] = React.useState({ uuid:"", name:"", email:"", pwd:"", photoURL:"", createdDate: new Date(), active:false });
    const[action, setAction] = React.useState({ actionType:0 });

    return (
        <Context.Provider value={{ uuid, name, email, isAuthenticated, user, action,  setUUID, setName, setEmail, setAuth, setUser, setAction }}>
            {children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };