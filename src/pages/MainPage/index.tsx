import Hero from "../../components/hero";
import {supabase} from "../../services/supabase/supabase";
import {useEffect, useState} from "react";
import ProductMachine from "../../components/productMachine";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {handleClick} from "../../helpers/telnum";
import {Link} from "react-router-dom";

import fb from "../../img/fb.png"
import insta from "../../img/insta.png"
import list from "../../img/list.png"

import comapny from "../../img/163281306_294588455414404_6161288083343353692_n.jpg"

const MainPage = () => {

type DataType = {
        id: number;
        name: string;
        description: string;
        image_url: string;
        price: number;
        category: string;
        prevPrice: number;
        productCode: string;
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
                        mdata?.reverse().map((item) => {
                            return <ProductMachine key={item.id} item={item}/>
                        })
                    }
                </div>

            </div>


            <div className="company">
                <h2>Մեր ընկերությունը`</h2>

                <div className="acompany">

                    <div>
                        <p>Restart Service - ձեր վստահելի գործընկերը` կենցաղային տեխնիկայի բոլոր կարիքների համար: Մենք
                            մասնագիտացած ենք լվացքի մեքենաների, սառնարանների և այլ հիմնական տեխնիկայի վերանորոգման մեջ:
                            Մեր փորձառու տեխնիկները բերում են տարիների փորձ և նվիրվածություն՝ արագ և հուսալի սպասարկում
                            ապահովելու համար:
                        </p>
                        <div>
                            <h1>Աշխատանքային օրեր</h1>
                            <h2>Երկուշաբթի-Կիրակի : 09:00 - 20:00</h2>
                        </div>
                    </div>
                    <div>
                        <img src={comapny} alt="img"/>
                    </div>
                </div>
            </div>



            <div className="social">
<h2>Մենք Սոցիալական ցանցերում</h2>
                <div>
                    <Link to="https://www.list.am/user/1845238" target="_blank"> <img src={list} alt={list}/> </Link>
                    <Link to="https://www.facebook.com/restartservice1" target="_blank"> <img src={fb} alt={fb}/> </Link>
                    <Link to="https://www.instagram.com/restartservice1/" target="_blank"> <img src={insta} alt={insta}/> </Link>
                    <span>Հեռ: 098 20 60 64</span>
                </div>
            </div>


            <Button type="primary" className="topbutton"
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>TOP</Button>
        </div>
)
}

export default MainPage