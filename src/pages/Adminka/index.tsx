import React, { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase/supabase'
import { Button, Form, Input, InputNumber, Modal, Select, Table, Upload, message } from 'antd'
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'
import { ADMIN_PASSWORD } from '../../constants/admin'
import './styles.css'

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
}

const Admin = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<Product[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [selectedImage, setSelectedImage] = useState<any>(null)
    const [editingRecord, setEditingRecord] = useState<Product | null>(null)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editForm] = Form.useForm()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [passwordModalVisible, setPasswordModalVisible] = useState(true)
    const [passwordInput, setPasswordInput] = useState('')

    useEffect(() => {
        const checkAuth = () => {
            const auth = localStorage.getItem('adminAuth')
            if (auth === 'true') {
                setIsAuthenticated(true)
                setPasswordModalVisible(false)
                fetchData()
            }
        }
        checkAuth()
    }, [])

    const handlePasswordSubmit = () => {
        if (passwordInput === ADMIN_PASSWORD) {
            setIsAuthenticated(true)
            setPasswordModalVisible(false)
            localStorage.setItem('adminAuth', 'true')
            fetchData()
            message.success('Successfully logged in')
        } else {
            message.error('Incorrect password')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminAuth')
        setIsAuthenticated(false)
        navigate('/')
    }

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

    const handleEdit = (record: any) => {
        setEditingRecord(record)
        editForm.setFieldsValue(record)
        setEditModalOpen(true)
    }

    const handleDelete = async (id: number) => {
        try {
            // First, get the product details to get the image URL
            const { data: product, error: fetchError } = await supabase
                .from('products')
                .select('image_url')
                .eq('id', id)
                .single()

            if (fetchError) {
                throw fetchError
            }

            // If there's an image, delete it from storage
            if (product?.image_url) {
                const imagePathMatch = product.image_url.match(/products\/(.+)$/)
                if (imagePathMatch) {
                    const imagePath = `products/${imagePathMatch[1]}`
                    const { error: storageError } = await supabase.storage
                        .from('images')
                        .remove([imagePath])

                    if (storageError) {
                        console.error('Error deleting image:', storageError)
                        message.warning('Product deleted but image removal failed')
                    }
                }
            }

            // Delete the product from the database
            const { error: deleteError } = await supabase
                .from('products')
                .delete()
                .eq('id', id)
            
            if (deleteError) {
                throw deleteError
            }

            message.success('Product deleted successfully')
            fetchData() // Refresh the table
        } catch (error) {
            console.error('Error deleting product:', error)
            message.error('Failed to delete product')
        }
    }

    const showDeleteConfirm = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this item?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(id)
            },
        })
    }

    const onEditFinish = async (values: any) => {
        try {
            if (!editingRecord) {
                message.error('No record selected for editing');
                return;
            }

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

            message.success('Product updated successfully')
            fetchData()
            setEditModalOpen(false)
            editForm.resetFields()
            setSelectedImage(null)
            setEditingRecord(null)
        } catch (error) {
            console.error('Error updating product:', error)
            message.error('Failed to update product')
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
            const { data: productsData, error } = await supabase
                .from('products')
                .select('*')

            if (error) {
                console.error('Error fetching data:', error)
                message.error('Failed to fetch data')
                return
            }

            setData(productsData || [])
        } catch (error) {
            console.error('Error fetching data:', error)
            message.error('Failed to fetch data')
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchData()
        }
    }, [isAuthenticated])

    const onFinish = async (values: any) => {
        try {
            if (selectedImage) {
                const { data: imageData, error: uploadError } = await supabase.storage
                    .from('restart')
                    .upload(`products/${selectedImage.name}`, selectedImage)

                if (uploadError) throw uploadError

                const { data: publicUrlData } = supabase.storage
                    .from('restart')
                    .getPublicUrl(`products/${selectedImage.name}`)

                if (publicUrlData) {
                    values.image_url = JSON.stringify({ publicUrl: publicUrlData.publicUrl })
                }
            }

            const { error } = await supabase.from('products').insert([values])
            if (error) throw error

            message.success('Product added successfully')
            fetchData()
            setIsModalOpen(false)
            form.resetFields()
            setSelectedImage(null)
        } catch (error) {
            console.error('Error adding new product:', error)
            message.error('Failed to add product')
        }
    }

    const columns: ColumnsType<Product> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            className: 'admin-table-cell',
            responsive: ['md']
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            className: 'admin-table-cell',
            responsive: ['xs'],
            ellipsis: {
                showTitle: false
            },
            render: (name: string) => (
                <span title={name}>{name}</span>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            className: 'admin-table-cell',
            responsive: ['xs'],
            render: (price: number) => (
                <span style={{ fontWeight: 500 }}>
                    {price.toLocaleString()} AMD
                </span>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            className: 'admin-table-cell',
            responsive: ['sm']
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            className: 'admin-table-cell',
            responsive: ['lg'],
            ellipsis: {
                showTitle: false
            },
            render: (description: string) => (
                <span title={description}>{description}</span>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            className: 'admin-table-cell',
            width: 200,
            render: (text: string, record: any) => (
                <div className="action-buttons">
                    <Button 
                        type="primary" 
                        onClick={() => handleEdit(record)} 
                        className="edit-button"
                        size="middle"
                        icon={<EditOutlined />}
                    >
                        Edit
                    </Button>
                    <Button 
                        type="primary" 
                        danger 
                        onClick={() => showDeleteConfirm(record.id)} 
                        className="delete-button"
                        size="middle"
                        icon={<DeleteOutlined />}
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ]

    if (!isAuthenticated) {
        return (
            <Modal
                title="Admin Authentication"
                open={passwordModalVisible}
                onOk={handlePasswordSubmit}
                onCancel={() => navigate('/')}
                className="admin-modal"
            >
                <Form layout="vertical">
                    <Form.Item label="Password" required>
                        <Input.Password
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            onPressEnter={handlePasswordSubmit}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div className="header-buttons">
                    <Button 
                        type="primary" 
                        onClick={showModal} 
                        className="add-button"
                        size="middle"
                    >
                        Add New Product
                    </Button>
                    <Button 
                        onClick={handleLogout} 
                        danger 
                        className="logout-button"
                        size="middle"
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <Table 
                columns={columns} 
                dataSource={data} 
                className="admin-table"
                rowClassName="admin-table-row"
                scroll={{ x: 'max-content' }}
                pagination={{
                    responsive: true,
                    position: ['bottomCenter'],
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true
                }}
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
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                        className="form-item"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Code"
                        name="productCode"
                        rules={[{ required: true, message: 'Please input the Code!' }]}
                        className="form-item"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                        className="form-item"
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="prevPrice"
                        rules={[{ required: true, message: 'Please input the Prev price!' }]}
                        className="form-item"
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select the category!' }]}
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
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                        className="form-item"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Image" className="form-item">
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
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the name!' }]}
                        className="form-item"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                        className="form-item"
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please select the category!' }]}
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
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                        className="form-item"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Image" className="form-item">
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
