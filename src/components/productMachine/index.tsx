
import "./index.css"
import {Button} from "antd";
import {handleClick} from "../../helpers/telnum";
interface ProductMachineProps {
    item: {
        id: number;
        name: string;
        description: string;
        price: number;
        image_url: string;
        category: string;
        prevPrice: number;
    };
}

const ProductMachine: React.FC<ProductMachineProps> = ({ item }) => {


    const image = JSON.parse(item.image_url).publicUrl


    return (
        <div className="product-card">

            <div className="hatuk">
                Հատուկ Առաջարկ
            </div>

            <img alt={image} className="product-card__image" src={image} />
            {/*<Image alt={image} src={image} style={{height:"400px"}}  />*/}
            <div className="infop">
                <div>
                    <p className="product-card__brand">{item.name}</p>
                    <p  className="product-card__description status">{item.description}</p>
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
