import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, ISession, IUser } from "../type";

export const sessionContext =  createContext<AuthContextType|undefined>(undefined)

export const SessionProvider = ({children}:{children:ReactNode}) =>{
    const [session, setSession] = useState<ISession>({
        user: null,
        status: 'loading'
    });
    useEffect(()=>{
        const token = localStorage.getItem('authToken')
        const user = localStorage.getItem('user')

        if(token && user){
            setSession({
                user: JSON.parse(user),
                status: 'authenticated'
            })
        }else{
            setSession({
                user: null,
                status: 'unauthenticated'
            })
        }
    },[])

    const signIn = (token:string|undefined, user:IUser|undefined) =>{
        if(token){
            localStorage.setItem('authToken',token)
        }
        if(user){
            localStorage.setItem('user',JSON.stringify(user))
        }
        if((localStorage.getItem('authToken') && localStorage.getItem('user'))!==null||undefined){
            setSession({
                user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
                status: 'authenticated'
            })
        }}

    const signOut = () =>{
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
        setSession({
            user: null,
            status: 'unauthenticated'
        })
    }
    
    return(
        <sessionContext.Provider value={{...session, signIn, signOut}}>
            {children}
        </sessionContext.Provider>
    )
}