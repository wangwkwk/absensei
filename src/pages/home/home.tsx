
interface Props{
    username:string;
}

const Home = (props:Props) =>{
    const {username} = props
    return(
        <div className="p-5">
            <strong className="text-2xl">Halo {username} !! </strong>
        </div>
    )
}

export default Home