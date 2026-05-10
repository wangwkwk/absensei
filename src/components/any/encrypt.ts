import cryptoJS from "crypto-js"

export const encrypt = (text:string) =>{
    const secret = import.meta.env.SECRET_KEY
    const encrypted = cryptoJS.AES.encrypt(text,secret).toString()
    return encrypted
}