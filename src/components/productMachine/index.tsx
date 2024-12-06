
import "./index.css"
import {Button} from "antd";
import {handleClick} from "../../helpers/telnum";
import {useNavigate, useSearchParams} from "react-router-dom";
interface ProductMachineProps {
    item: {
        id: number;
        name: string;
        description: string;
        price: number;
        image_url: string;
        category: string;
        prevPrice: number;
        productCode : string
    };
}

const ProductMachine: React.FC<ProductMachineProps> = ({ item }) => {

const image = JSON.parse(item.image_url).publicUrl


const [searchParams, setSearchParams] = useSearchParams();
const navigate = useNavigate()


const handledetails = () =>{

    searchParams.set("id", item.id.toString());


    setSearchParams(searchParams);


    navigate(`/details/?${searchParams.toString()}`)
}



return (
        <div className="product-card" onClick={handledetails}>

            <div className="hatuk">
                Հատուկ Առաջարկ
            </div>

            <img alt={image} className="product-card__image" src={image} />
            {/*<Image alt={image} src={image} style={{height:"400px"}}  />*/}
            <div className="infop">
                <div>
                    <div className="nn">
                        <p className="product-card__brand">{item.name}</p>
                        <span className="product-card__brand">{item.productCode}</span>
                    </div>
                    <p className="product-card__description status">{item.description}</p>
                </div>
                <div>
                    <div className="pp">
                        <p className="product-card__price">{item.price} Դրամ</p>
                        <p className="prevprice">{item.prevPrice}</p>
                    </div>
                    <Button className="ctab" onClick={handleClick}>Զանգել Հիմա</Button>
                </div>
            </div>
        </div>
);
};

export default ProductMachine;
