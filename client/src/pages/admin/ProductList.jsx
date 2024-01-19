import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useCreateProductMutation, useGetProductsQuery, useDeleteProductMutation } from '../../redux/slices/productsApiSlice';
import ProductUpload from '../../components/ProductUpload';

const ProductList = () => {

    const [showCreateForm, setShowCreateForm] = useState(false);

    const [productForm, setProductForm] = useState({
        name: '',
        price: 0,
        description: '',
        image: '',
        brand: '',
        category: '',
        countInStock: 0,
        subCategory: '',
        featured: false,
        popular: false
    })


    const { data: products, isLoading, error, refetch } = useGetProductsQuery();

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const [deleteProduct, {isLoading: deleteLoading}] = useDeleteProductMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        const { name, price, description, image, brand, category, countInStock } = productForm;
        if (window.confirm('Are you sure you want to create a new Product')) {
            const res = await createProduct({ name, price, description, image, brand, category, countInStock })
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Product Created");
                setShowCreateForm(false);
                refetchProductList();

            }
        }
    }

    const deleteHandler = async (productId) => {
       if(window.confirm('Are you sure?')){
           try {
               await deleteProduct(productId);
               toast.success("Product Deleted")
               refetch()
           } catch (error) {
              toast.error(error?.data?.message || error?.error) 
           }
       }
    }
    return (
        <>
            <div className='flex justify-between items-center p-3 md:px-[100px]'>
                <h1>Products</h1>
                <div className='flex flex-col md:flex-row gap-y-2 gap-x-3'>
                    <button className='bg-[#161b6d] text-white border-none p-2 rounded'
                        onClick={() => setShowCreateForm(true)}>
                        <FaEdit /> Create Product
                    </button>
                    <Link to='/admin/addcategory'>
                        <button className='bg-[#161b6d] text-white border-none p-2 rounded'>
                            <FaPlus /> Add Category
                        </button>
                    </Link>
                </div>
            </div>

            {showCreateForm && (
                <ProductUpload
                    loading={loadingCreate}
                    productForm={productForm}
                    setProductForm={setProductForm}
                    submitHandler={submitHandler}
                />
            )}

            {
                isLoading ? <Loader /> : error ? <Message type="error" message={error?.data?.message || error?.message || error?.error} /> : (
                    <div className='overflow-x-auto'>
                         {deleteLoading && <Loader />}
                        <table className='w-full'>
                            <thead className='bg-gray-200 border-b'>
                                <tr>
                                    <th className='px-6 py-4'>ID</th>
                                    <th className='px-6 py-4'>Name</th>
                                    <th className='px-6 py-4'>Price</th>
                                    <th className='px-6 py-4'>Category</th>
                                    <th className='px-6 py-4'>Brand</th>
                                    <th className='px-6 py-4'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product) => (
                                    <tr key={product._id} className='border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                                        <td className='px-6 py-4'>{product._id}</td>
                                        <td className='px-6 py-4'>{product.name}</td>
                                        <td className='px-6 py-4'>{product.price}</td>
                                        <td className='px-6 py-4'>{product.category}</td>
                                        <td className='px-6 py-4'>{product.brand}</td>
                                        <td className='px-6 py-4'>
                                            <Link to={`/admin/product/${product._id}/edit`}>
                                                <button className='bg-[#161b6d] text-white border-none p-2 rounded mx-2'>
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <button className='bg-[#161b6d] text-white border-none p-2 rounded'
                                                onClick={() => { deleteHandler(product._id) }}>
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </>
    )
}

export default ProductList