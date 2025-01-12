import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase/supabase';
import ProductMachine from '../../components/productMachine';
import './index.css';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    prevPrice: number;
    productCode: string;
}

const FilteredProducts = () => {
    const { category } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('category', category);

                if (error) {
                    throw error;
                }

                if (data) {
                    setProducts(data as Product[]);
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchProducts();
        }
    }, [category]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (products.length === 0) {
        return (
            <div className="no-products">
                <h2>No products found in category: {category}</h2>
            </div>
        );
    }

    return (
        <div className="filtered-products">
            <h1 className="category-title">{category}</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <ProductMachine 
                        key={product.id} 
                        item={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default FilteredProducts;
