import { type DateValue } from "@heroui/react";
import {parseAbsoluteToLocal} from '@internationalized/date'

const standardDate = (date:number)=>{
    if(date<10){
        return `0${date}`
    }else{
        return date
    }
}

const toDateStandard = (date:DateValue) =>{
    const year = date.year
    const month = date.month

    const day = date.day
    const result = `${standardDate(year)}-${standardDate(month)}-${standardDate(day)}`
    return result
}

const toInputDate = (date:string) =>{
    const formattedDate = parseAbsoluteToLocal(`${date.replace(" ","T")}+07:00`)
    return formattedDate
}

export {toDateStandard, toInputDate}