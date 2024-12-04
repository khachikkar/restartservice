import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {adminPass} from "../../constants/constants";
import {Form, Input, Button} from 'antd';
import {useForm} from "antd/es/form/Form";



const Adminka = () => {

    const navigate = useNavigate()
    const [form] = useForm()

    const handleAddProduct = () =>{
        console.log("hello")
    }


    useEffect(() => {
        const pass : string | null =  prompt("Pls write your Password")
       if (pass === adminPass.password){
          alert("Welcome")
       }else{
           navigate("/")
       }
    }, [navigate]);


    return (
        <div style={{height:"100vh"}}>
            <h1>Admin Pannel</h1>
            <Form layout="vertical" form={form} onFinish={handleAddProduct}>


            <Form.Item
                label="Product Name"
                name="productName"
                rules={[
                    {
                        required: true,
                        message: "Please enter an Product Name",
                    }
                ]}
            >
                <Input type="text" placeholder="Enter Product Name"/>
            </Form.Item>



            <Form.Item
                label="Product Description"
                name="productDescription"
                rules={[
                    {
                        required: true,
                        message: "Please enter an Product Description",
                    }
                ]}
            >
                <Input type="text" placeholder="Enter Product Description"/>
            </Form.Item>

            {/*    Change a upload file */}
            <Form.Item
                label="Product Image URL"
                name="productImageUrl"
                rules={[
                    {
                        required: true,
                        message: "Please enter an Product Image URL",
                    }
                ]}
            >
                <Input type="file" placeholder="Enter Product Image URL"/>
            </Form.Item>

            <Form.Item
                label="Product Price"
                name="productPrice"
                rules={[
                    {
                        required: true,
                        message: "Please enter an Product Price",
                    }
                ]}
            >
                <Input type="number" placeholder="Enter Product Price"/>
            </Form.Item>

          <Button type="primary" htmlType="submit">Save Product</Button>
        </Form>
        </div>
    )
}

export default Adminka