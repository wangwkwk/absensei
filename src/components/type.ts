import type { AxiosError } from "axios";

export interface IUser {
  id: number;
  name: string;
  email: string;
  username?:string
}

export interface ILogin {
    identifier: string;
    password: string;
}

export interface IRegister {
    email:string,
    username:string,
    password:string,
    confirmPass:string
}

export type IStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface ISession {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  status: IStatus;
}

export interface AuthContextType extends ISession {
  signIn: (token: string, userData: any) => void;
  signOut: () => void;
}

export interface ICategory{
    _id:string
    name:string,
}


interface IAbsenRecord {
pemainId:string,
name:string,
nim?:string,
gender:string,
status:boolean
}

interface IAbsenAllRecord extends IAbsenRecord{
kehadiran:any
}

interface tanggalList extends IAllAbsen{
    index:number,
    date:Date
}

interface IAbsenForm extends IAbsen {
    date:Date
    categoryId:string
}

interface IAbsen {
    _id:string,
    date:Date,
    records:IAbsenRecord[]
}
interface IAbsenEditForm {
    absenId:string,
    pemainId:string,
    status:boolean
}

interface IAllAbsen{
    data:{
        pemainId:string,
        name:string,
        nim?:string,
        kehadiran:{}
    },
    tanggalList:{
        index:number,
        date:Date
    }
}

export interface ErrorExtended extends AxiosError<{meta: {message: string}}>{
}

export type {IAbsenRecord, IAbsenEditForm, IAbsen, IAllAbsen, IAbsenAllRecord,tanggalList,IAbsenForm}

interface IPagination {
    current:number,
    total:number,
    totalPage:number
}

interface IMeta{
        message:string,
        status:number
    }
interface IData{
    data:[],
    meta: IMeta,
    pagination:IPagination
}
export type {IPagination, IMeta, IData}

interface IPemain {
    _id?:string,
    name?:string,
    nim?:string,
    gender?:string;
    categoryId?:string;
}
interface IPemainAbsen extends IPemain{
    status?:boolean
}

export type {IPemain, IPemainAbsen}