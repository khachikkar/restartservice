
import "./index.css"
import {Button, Image} from "antd";
interface ProductMachineProps {
    item: {
        id: number;
        name: string;
        description: string;
        price: number;
        image_url: string;
    };
}

const ProductMachine: React.FC<ProductMachineProps> = ({ item }) => {

    const handleClick = () => {
        window.location.href = `tel:077341019`;
    };

    const image = JSON.parse(item.image_url).publicUrl


    return (
        <div className="product-card">
            <img alt={image} className="product-card__image" src={image} />
            {/*<Image alt={image} src={image} style={{height:"400px"}}  />*/}
            <div>
                <p className="product-card__brand">{item.name}</p>
                <p className="product-card__description">{item.description}</p>
                <p className="product-card__price">{item.price} Դրամ</p>
                <Button onClick={handleClick}>Զանգել Հիմա</Button>
            </div>
        </div>
    );
};

export default ProductMachine;
