import Fuse from 'fuse.js'

export const search = (data:[], searching:string) =>{
    // const {currentSearching} =useChangeUrl()
    const options = {
        keys : ["name"],
        threshold: 0.25
    }
    const fuse = new Fuse(data, options) //akan menghasilkan array berisi item dan refIndex, hasil asli berada di dalam item
    return fuse.search(searching).map(hasil=>hasil.item) //menggunakan map untuk langsung mereturn  hasil asli
}
