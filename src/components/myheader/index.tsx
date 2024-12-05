import {Button} from "antd";

import {Link} from "react-router-dom";


const MyHeader = () => {

    const handleClick = () => {
        window.location.href = `tel:077341019`;
    };



    return (
        <div className="myHeader">
            <Link to="/">
                <img style={{height: "40px", width: "100px"}}
                     alt="logo"
                     src="https://scontent.fevn2-1.fna.fbcdn.net/v/t39.30808-6/273990932_499060978300483_6831947211712605172_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=6cVApeDTAdQQ7kNvgF8aqx6&_nc_zt=23&_nc_ht=scontent.fevn2-1.fna&_nc_gid=AN-Y9Nu6GaTx0Cpp6A2gZV6&oh=00_AYB_y8paIl1U68wJ9AOMaTUB0wCeDzXAq6jqXR02M3Gkdg&oe=675369F7"/>
            </Link>

            <span>Լվացքի Մեքենաներ</span>
            <div>
                <Button type="primary" onClick={handleClick}>Զանգեք Մեզ</Button>
                <Link to="/adminka"><Button>Admin Panel</Button></Link>
            </div>

        </div>
    )
}

export default MyHeader;