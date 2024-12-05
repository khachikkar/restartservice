import Hero from "../../components/hero";
import {supabase} from "../../services/supabase/supabase";
import {useEffect, useState} from "react";
import ProductMachine from "../../components/productMachine";


const MainPage = () => {

type DataType = {
        id: number;
        name: string;
        description: string;
        image_url: string;
        price: number;
};

const [mdata, setMdata] = useState<DataType[]>([])






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


    return (
        <div className="mainCont">
            <Hero />
            <div className="prodCont">
                <h2>Մեր Լվացքի մեքենաները</h2>
                <div className="products">
                {
                    mdata?.map((item)=>{
                        return <ProductMachine key={item.name} item={item} />
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default MainPage