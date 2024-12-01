import {Button} from "antd";

import {Link} from "react-router-dom";


const MyHeader = () => {

    const handleClick = () => {
        window.location.href = `tel:077341019`;
    };



    return (
        <div className="myHeader">
            <h2>Logo</h2>

            <span>Products</span>
           <div>
               <Button onClick={handleClick}>Call us</Button>
               <Link to="/adminka" ><Button>Admin Panel</Button></Link>
           </div>

        </div>
    )
}

export default MyHeader;