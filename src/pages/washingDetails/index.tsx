import {useLocation} from "react-router-dom";
import "./index.css"
import {Button, Space} from "antd";
import {handleClick} from "../../helpers/telnum";

const WashingDetails = () => {

const location = useLocation();
const data = location.state?.product

    console.log(data, "Ff")

const image = JSON.parse(data.image_url).publicUrl

    return (
        <div className="wDetails">

            <h2>{data.name}</h2>
            <div className="dinfo">
                <div className="dimg">
                    <img src={image} alt={image} />
                </div>
                <div className="ddetails">
                    <span>Code: {data.productCode}</span>
                    <Space>
                        <h4>Կարգավիճակ</h4>
                        <p>{data.name}</p>
                    </Space>
                    <div>
                        <h4>Նկարագրություն</h4>
                        <p className="dDesc">{data.description}</p>
                    </div>
                    <div className="price">
                    <p>{data.prevPrice}</p>
                        <h3>{data.price}  Դրամ</h3>
                        <Button type="primary" onClick={handleClick}>Զանգեք հիմա</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WashingDetails;