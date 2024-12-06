import Hero from "../../components/hero";
import {supabase} from "../../services/supabase/supabase";
import {useEffect, useState} from "react";
import ProductMachine from "../../components/productMachine";
import {Button} from  "antd";
import {useNavigate} from "react-router-dom";

const MainPage = () => {

type DataType = {
        id: number;
        name: string;
        description: string;
        image_url: string;
        price: number;
};

const [mdata, setMdata] = useState<DataType[]>([])

const handleClick = () => {
        window.location.href = `tel:077341019`;
};

const getProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')  // Make sure the table name is correct
                .select('*');  // Select all columns, or modify it to fetch specific columns like .select('id, name, price')

            if (error) {
                throw new Error(error.message);
            }



            console.log(data, "data")
            setMdata(data)
            return data;  // Returns an array of product data
        } catch (error) {
            console.error('Error fetching products:', error);
            return null;
        }
    };




useEffect(() => {
      getProducts()

    }, [])

console.log(mdata, "mdata")


    const navigate = useNavigate();

    useEffect(() => {
        const host = window.location.hostname; // e.g., admin.restartservice.netlify.app
        if (host.startsWith("admin")) {
            navigate("/adminka"); // Redirect to the admin page
        }
    }, [navigate]);


return (
        <div className="mainCont">
            <Hero/>
            <div className="Ad">
                <h3 style={{color:"crimson"}}>Հասցե: Մալաթիա-Սեբաստիա 165/1</h3>
                <h2>Մինչև ամանոր, Դեկտեմբերի 31-ը մեր ողջ տեսականու համար կգործի մինչև <strong>30%</strong> զեղչ: Շտապեք~</h2>
                <Button onClick={handleClick}>Զանգահարեք հիմա</Button>
            </div>
            <div className="prodCont">
                <h2>Մեր Լվացքի մեքենաները</h2>
                <div className="products">
                    {
                        mdata?.map((item) => {
                            return <ProductMachine key={item.name} item={item}/>
                        })
                    }
                </div>

            </div>
            <Button type="primary" className="topbutton"  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} >TOP</Button>
        </div>
    )
}

export default MainPage