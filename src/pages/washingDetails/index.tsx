import {useSearchParams} from "react-router-dom";
import "./index.css"
import {Button, Space} from "antd";
import {handleClick} from "../../helpers/telnum";
import {useEffect, useState} from "react";
import {supabase} from "../../services/supabase/supabase";

const WashingDetails = () => {

    type DataType = {
        id?: number;
        name?: string;
        description?: string;
        image_url?: string;
        price?: number;
        category?: string;
        prevPrice?: number;
        productCode?: string;
    };




const [searchParams] = useSearchParams();
const id = Number(searchParams.get("id"))

console.log( id, "id from search");



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
        } catch (error) {
            console.error('Error fetching products:', error);
            return null;
        }
    };




    useEffect(() => {
        getProducts()

    }, [])

    console.log(mdata, "mdata")




    const data =      mdata ?  mdata?.find(item => item.id === id) : {}
    let image = "";
    if (data && data.image_url) {
        try {
            image = JSON.parse(data.image_url)?.publicUrl || "";
        } catch (error) {
            console.error("Invalid JSON in image_url:", error);
        }
    }

    return (
        <div className="wDetails">
            {data ? (
                <>
                    <h2>{data.name}</h2>
                    <div className="dinfo">
                        {image && (
                            <div className="dimg">
                                <img src={image} alt={data.name} />
                            </div>
                        )}
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
                                <h3>{data.price} Դրամ</h3>
                                <Button type="primary" onClick={handleClick}>
                                    Զանգեք հիմա
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default WashingDetails;