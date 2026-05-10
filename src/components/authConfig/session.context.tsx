import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, ISession, IUser } from "../type";
import { decrypt, encrypt } from "../any/encrypt";

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
            const userExtend = decrypt(user)
            setSession({
                user: JSON.parse(userExtend),
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
        if(token!==undefined){
            const extendToken = encrypt(token)
            localStorage.setItem('authToken',extendToken)
        }
        if(user){
            const extendUser = encrypt(JSON.stringify(user))
            localStorage.setItem('user',extendUser)
        }
        if((localStorage.getItem('authToken') && localStorage.getItem('user'))!==null||undefined){
            const extendUser = localStorage.getItem('user')
            const user = decrypt(extendUser!)
            setSession({
                user: localStorage.getItem('user') ? JSON.parse(user) : null,
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