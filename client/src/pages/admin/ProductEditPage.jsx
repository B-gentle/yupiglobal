import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ProductUpload from '../../components/ProductUpload';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../redux/slices/productsApiSlice';

const ProductEditPage = () => {
    const { id: productId } = useParams();

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    const navigate = useNavigate();

    const [productForm, setProductForm] = useState({
        name: '',
        price: 0,
        description: '',
        image: '',
        brand: '',
        category: '',
        countInStock: 0,
        featured: false,
        popular: false,
        recommended: false,
        subCategory: ''

    })

    const submitHandler = async (e) => {
        e.preventDefault();
        const { name, price, description, image, brand, category, countInStock, featured, popular, recommended, subCategory } = productForm
        const res = await updateProduct({ data: {name, price, description, image, brand, category, countInStock, featured, popular, recommended, subCategory}, productId: productId })

        if (res.error) {
            toast.error(res.error)
        } else {
            toast.success("Product Updated");
            navigate("/admin/productlist")
        }
    }

    useEffect(() => {
        if (product) {
             setProductForm({
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
                brand: product.brand,
                category: product.category,
                countInStock: product.countInStock,
                featured: product.featured,
                popular: product.popular,
                recommended: product.recommended,
                subCategory: product.subCategory
             })
        }
        window.scrollTo(0,0)
    }, [product])
    return (
        <div>
            <Link to='/admin/productlist' className='no-underline bg-grey-500 p-4'>Go back</Link>
            <h2>Edit Product</h2>
            {isLoading ? <Loader /> : error ? <Message type="error" message={error?.data?.message || error?.message || error?.error} /> : (
                <div>
                    <ProductUpload
                        productForm={productForm}
                        setProductForm={setProductForm}
                        loading={isUpdating}
                        submitHandler={submitHandler}
                    />
                </div>
            )}
        </div>
    )
}

export default ProductEditPage