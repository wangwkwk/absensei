import cryptoJS from "crypto-js"

export const encrypt = (text:string) =>{
    const secret = import.meta.env.VITE_SECRET_KEY
    const encrypted = cryptoJS.AES.encrypt(text,secret).toString()
    return encrypted
}

export const decrypt = (text:string) =>{
    const secret = import.meta.env.VITE_SECRET_KEY
    const decrypted = cryptoJS.AES.decrypt(text,secret).toString(cryptoJS.enc.Utf8)
    return decrypted
}