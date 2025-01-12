import React, { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase/supabase'
import { Button, Form, Input, InputNumber, Modal, Select, Table, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import './styles.css'

const Admin = () => {
    const [data, setData] = useState<any[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [selectedImage, setSelectedImage] = useState<any>(null)
    const [editingRecord, setEditingRecord] = useState<any>(null)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editForm] = Form.useForm()

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        form.resetFields()
    }

    const handleEditCancel = () => {
        setEditModalOpen(false)
        editForm.resetFields()
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            className: 'admin-table-cell'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            className: 'admin-table-cell'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            className: 'admin-table-cell'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            className: 'admin-table-cell'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            className: 'admin-table-cell'
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            className: 'admin-table-cell'
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            key: 'capacity',
            className: 'admin-table-cell'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            className: 'admin-table-cell'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: any) => (
                <div className="action-buttons">
                    <Button type="primary" onClick={() => handleEdit(record)} className="edit-button">
                        Edit
                    </Button>
                    <Button type="primary" danger onClick={() => handleDelete(record.id)} className="delete-button">
                        Delete
                    </Button>
                </div>
            ),
            className: 'admin-table-cell'
        }
    ]

    const handleEdit = (record: any) => {
        setEditingRecord(record)
        editForm.setFieldsValue(record)
        setEditModalOpen(true)
    }

    const handleDelete = async (id: number) => {
        try {
            await supabase.from('products').delete().eq('id', id)
            fetchData()
        } catch (error) {
            console.error('Error deleting record:', error)
        }
    }

    const props: UploadProps = {
        beforeUpload: file => {
            setSelectedImage(file)
            return false
        }
    }

    const fetchData = async () => {
        try {
            const { data: productsData, error } = await supabase.from('products').select('*')
            if (error) throw error
            setData(productsData)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onFinish = async (values: any) => {
        try {
            if (selectedImage) {
                const { data: imageData, error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(`products/${selectedImage.name}`, selectedImage)

                if (uploadError) throw uploadError

                const { data: publicUrlData } = supabase.storage
                    .from('images')
                    .getPublicUrl(`products/${selectedImage.name}`)

                if (publicUrlData) {
                    values.image_url = publicUrlData.publicUrl
                }
            }

            const { error } = await supabase.from('products').insert([values])
            if (error) throw error

            fetchData()
            setIsModalOpen(false)
            form.resetFields()
            setSelectedImage(null)
        } catch (error) {
            console.error('Error adding new product:', error)
        }
    }

    const onEditFinish = async (values: any) => {
        try {
            if (selectedImage) {
                const { data: imageData, error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(`products/${selectedImage.name}`, selectedImage)

                if (uploadError) throw uploadError

                const { data: publicUrlData } = supabase.storage
                    .from('images')
                    .getPublicUrl(`products/${selectedImage.name}`)

                if (publicUrlData) {
                    values.image_url = publicUrlData.publicUrl
                }
            }

            const { error } = await supabase
                .from('products')
                .update(values)
                .eq('id', editingRecord.id)

            if (error) throw error

            fetchData()
            setEditModalOpen(false)
            editForm.resetFields()
            setSelectedImage(null)
            setEditingRecord(null)
        } catch (error) {
            console.error('Error updating product:', error)
        }
    }

    return (
        <div className="admin-container">
            <Button type="primary" onClick={showModal} className="add-button">
                Add New Product
            </Button>

            <Table 
                columns={columns} 
                dataSource={data} 
                className="admin-table"
                rowClassName="admin-table-row"
            />

            <Modal
                title="Add New Product"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="admin-modal"
            >
                <Form form={form} onFinish={onFinish} layout="vertical" className="admin-form">
                    <Form.Item
                        label="Ապրանքի անունը"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                        className="form-item"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ապրանքի Նկարագրությունը"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                        className="form-item"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Ապրանքի Կոդը"
                        name="productCode"
                        rules={[{ required: true, message: 'Please input the product code!' }]}
                        className="form-item"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ապրանքի Կատեգորիան"
                        name="category"
                        rules={[{ required: true, message: 'Please input the category!' }]}
                        className="form-item"
                    >
                        <Select>
                            <Select.Option value="Սառնարան">Սառնարան</Select.Option>
                            <Select.Option value="ԼվացքիՄեքենա">ԼվացքիՄեքենա</Select.Option>
                            <Select.Option value="Գազօջախ">Գազօջախ</Select.Option>
                            <Select.Option value="Վառարան">Վառարան</Select.Option>
                            <Select.Option value="ՍպասքիՄեքենա">ՍպասքիՄեքենա</Select.Option>
                            <Select.Option value="Չորանոց">Չորանոց</Select.Option>
                            <Select.Option value="Սառցարան">Սառցարան</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Ապրանքի Նախկին Գինը"
                        name="prevPrice"
                        rules={[
                            { required: true, message: 'Please input the previous price!' },
                            { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: 'Price must be a valid number (e.g., 19.99)' },
                        ]}
                        className="form-item"
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Ապրանքի Գինը"
                        name="price"
                        rules={[
                            { required: true, message: 'Please input the price!' },
                            { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: 'Price must be a valid number (e.g., 19.99)' },
                        ]}
                        className="form-item"
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item label="Ապրանքի Նկարը" className="form-item">
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Select Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item className="form-buttons">
                        <Button type="primary" htmlType="submit" className="submit-button">
                            Submit
                        </Button>
                        <Button onClick={handleCancel} className="cancel-button">
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Edit Product"
                open={editModalOpen}
                onCancel={handleEditCancel}
                footer={null}
                className="admin-modal"
            >
                <Form form={editForm} onFinish={onEditFinish} layout="vertical" className="admin-form">
                    <Form.Item
                        label="Ապրանքի անունը"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                        className="form-item"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ապրանքի Նկարագրությունը"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                        className="form-item"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        label="Ապրանքի Կոդը"
                        name="productCode"
                        rules={[{ required: true, message: 'Please input the product code!' }]}
                        className="form-item"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ապրանքի Կատեգորիան"
                        name="category"
                        rules={[{ required: true, message: 'Please input the category!' }]}
                        className="form-item"
                    >
                        <Select>
                            <Select.Option value="Սառնարան">Սառնարան</Select.Option>
                            <Select.Option value="ԼվացքիՄեքենա">ԼվացքիՄեքենա</Select.Option>
                            <Select.Option value="Գազօջախ">Գազօջախ</Select.Option>
                            <Select.Option value="Վառարան">Վառարան</Select.Option>
                            <Select.Option value="ՍպասքիՄեքենա">ՍպասքիՄեքենա</Select.Option>
                            <Select.Option value="Չորանոց">Չորանոց</Select.Option>
                            <Select.Option value="Սառցարան">Սառցարան</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Ապրանքի Նախկին Գինը"
                        name="prevPrice"
                        rules={[
                            { required: true, message: 'Please input the previous price!' },
                            { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: 'Price must be a valid number (e.g., 19.99)' },
                        ]}
                        className="form-item"
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Ապրանքի Գինը"
                        name="price"
                        rules={[
                            { required: true, message: 'Please input the price!' },
                            { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: 'Price must be a valid number (e.g., 19.99)' },
                        ]}
                        className="form-item"
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item label="Ապրանքի Նկարը" className="form-item">
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Select Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item className="form-buttons">
                        <Button type="primary" htmlType="submit" className="submit-button">
                            Update
                        </Button>
                        <Button onClick={handleEditCancel} className="cancel-button">
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Admin
