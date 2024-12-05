import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {adminPass} from "../../constants/constants";
import {Button, Form, Input, notification, Upload} from "antd";
import {useForm} from "antd/es/form/Form";

import {supabase} from "../../services/supabase/supabase";

type bucketParam = {
    bucket: string;
    file: File;
};

const uploadFileToBucket = async ({ bucket, file }: bucketParam) => {
    const fileName = `${Date.now()}`;
    const { error } = await supabase.storage.from(bucket).upload(fileName, file);

    if (error) {
        throw new Error(error.message);
    }

    const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(fileName);
    if (!publicUrl) {
        throw new Error("Failed to get public URL");
    }

    return publicUrl;
};

const Adminka = () => {
    const navigate = useNavigate();
    const [form] = useForm();
    const [load, setLoad] = useState(false);


    const handleAddProduct = async (values: any) => {

        console.log(values, "values");

        try {
            setLoad(true)
            const file = values.productImageUrl[0]?.originFileObj; // Access file from Upload component

            if (!file) {
                alert("Please upload a product image.");
                return;
            }

            const imageUrl = await uploadFileToBucket({ bucket: "restart", file });

            console.log(imageUrl , "imageUURL");

            const {  error } = await supabase.from("products").insert([
                {
                    name: values.productName,
                    description: values.productDescription,
                    price: parseFloat(values.productPrice),
                    image_url: imageUrl,
                },
            ]);

            if (error) {
               console.log(error.message);
            }

           notification.success({
               message: "Արտադրանքը հաջողությամբ ավելացավ",
           })
            form.resetFields();
        } catch (error) {
            alert("Error adding product");
        }finally {
            setLoad(false)
        }
    };

    useEffect(() => {
        const pass: string | null = prompt("Գրեք Ձեր գաղտնաբառը");
        if (pass === adminPass.password) {
            alert("Բարի գալուստ!");
        } else {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div style={{ height: "100vh" }}>
            <h1>Admin Panel</h1>
            <Form layout="vertical" form={form} onFinish={handleAddProduct}>
                <Form.Item
                    label="Ապրանքի անունը"
                    name="productName"
                    rules={[{ required: true, message: "Please enter a Product Name" }]}
                >
                    <Input placeholder="օրինակ: Բեկո 50կգ" />
                </Form.Item>

                <Form.Item
                    label="Ապրանքի Նկարագրությունը"
                    name="productDescription"
                    rules={[{ required: true, message: "Please enter a Product Description" }]}
                >
                    <Input placeholder="օրինակ: Նոր, վերանորոգված կամ օգտագործված" />
                </Form.Item>

                <Form.Item
                    label="Ապրանքի Նկարը"
                    name="productImageUrl"
                    rules={[{ required: true, message: "Please upload a product image." }]}
                    valuePropName="fileList"
                    getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                >
                    <Upload
                        beforeUpload={() => false}
                        accept="image/*"
                        maxCount={1}
                        listType="picture"
                    >
                        <Button>Բեռնել Նկարը</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Ապրանքի Գինը"
                    name="productPrice"
                    rules={[
                        { required: true, message: "Please enter a valid Product Price" },
                        { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Price must be a valid number (e.g., 19.99)" },
                    ]}
                >
                    <Input placeholder="օրինակ 30000" />
                </Form.Item>

                <Button loading={load} type="primary" htmlType="submit">
                    Ավելացնել Ապրանք
                </Button>
            </Form>
        </div>
    );
};

export default Adminka;
