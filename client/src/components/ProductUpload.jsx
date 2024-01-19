import React from 'react';
import Loader from './Loader';
import { useLocation } from 'react-router-dom';
import { useUploadProductImageMutation } from '../redux/slices/productsApiSlice';
import { toast } from 'react-toastify'

const ProductUpload = ({ loading, productForm, setProductForm, submitHandler }) => {

    const location = useLocation();
    const upload = location.pathname === '/admin/productlist';

    const [uploadProductImage, { isLoading: isUploadingImage }] = useUploadProductImageMutation();

    const handleInputChange = (e) => {
        const { value, id } = e.target
        setProductForm({ ...productForm, [id]: value })
    }

    const handleCheckBox = (e) => {
        const { checked, id } = e.target;
            setProductForm({...productForm, [id]: checked})
    }

    const handleImageChange = async (e) => {
        const formData = new FormData() 
        formData.append('image', e.target.files[0]);
        
          try {
              const res = await uploadProductImage(formData).unwrap();
              console.log(res)
              toast.success(res.message)
              setProductForm({...productForm, image: res.image})
          } catch (error) {
              console.log(error)
              toast.error(error?.data?.message || error?.message || error?.error)
          }
    }

    return (
        <div className='flex justify-center items-center my-6'>
            <form onSubmit={submitHandler} className='flex flex-col gap-y-3 my-6 w-1/2'>
                <div className='flex flex-col'>
                    <label htmlFor="name">Product Name</label>
                    <input className='p-3' type="text" id="name" value={productForm.name} onChange={handleInputChange} required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='price'>Product Price</label>
                    <input className='p-3' type="number" id="price" onChange={handleInputChange} value={productForm.price} required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='description'>Product Description</label>
                    <textarea className='p-3 outline-none' type="text" id="description" cols="6" rows="12" onChange={handleInputChange} value={productForm.description} required></textarea>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='category'>Category</label>
                    <input className='p-3' type="text" id="category" onChange={handleInputChange} value={productForm.category} required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='subCategory'>Sub Category</label>
                    <input className='p-3' type="text" id="subCategory" onChange={handleInputChange} value={productForm.subCategory} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='brand'>Brand</label>
                    <input className='p-3' type="text" id="brand" onChange={handleInputChange} value={productForm.brand} />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='countInStock'>Count In Stock</label>
                    <input className='p-3' type="number" id="countInStock" onChange={handleInputChange} value={productForm.countInStock} required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='image'>Upload Product Image</label>
                    <input className="p-3" type="text" id="image" onChange={handleInputChange} value={productForm.image} />
                    <input className='p-3' type="file" id="image" onChange={handleImageChange} />
                </div>
                <div className='flex gap-x-3'>
                    <span>
                        <input type="checkbox" id="featured" checked={productForm.featured} onChange={handleCheckBox} />
                        <label htmlFor="featured"> Mark as featured</label>
                    </span>
                    <span>
                        <input type="checkbox" id="popular" checked={productForm.popular} onChange={handleCheckBox} />
                        <label htmlFor="popular"> Mark as popular</label>
                    </span>
                </div>
                <div>
                    {loading && <Loader />}
                    <input type="submit" value={upload ? "Create Product" : "Update Product"} className='bg-[#9d5bc5] text-white p-2 rounded-[4px] border-none' />
                </div>
            </form>
        </div>
    )
}

export default ProductUpload