import {Button} from "antd";
import logo from "../../img/logo.png"
import {Link} from "react-router-dom";
import {handleClick} from "../../helpers/telnum";

const MyHeader = () => {


    return (
        <div className="myHeader">
            <Link to="/">
                <img style={{height: "40px", }}
                     alt="logo"
                     src={logo}/>
            </Link>

            <span>Լվացքի Մեքենաներ</span>
            <div>
                <Button type="primary" onClick={handleClick}>Զանգեք Մեզ</Button>
            </div>

        </div>
    )
}

export default MyHeader;