import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {adminPass} from "../../constants/constants";

const Adminka = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const pass : string | null =  prompt("Pls write your Password")
       if (pass === adminPass.password){
          alert("Welcome")
       }else{
           navigate("/")
       }
    }, []);


    return (
        <div>
            Adminka
        </div>
    )
}

export default Adminka