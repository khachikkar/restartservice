
import "./index.css"
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


    const image = JSON.parse(item.image_url).publicUrl


    return (
        <div className="product-card">
            <img alt={image} className="product-card__image" src={image} />
            <p className="product-card__brand">{item.name}</p>
            <p className="product-card__description">{item.description}</p>
            <p className="product-card__price">{item.price} Դրամ</p>
        </div>
    );
};

export default ProductMachine;
