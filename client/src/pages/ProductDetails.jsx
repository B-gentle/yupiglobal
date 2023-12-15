import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get(`/api/products/${id}`)
      setProduct(data)
    }
    getProducts()
  }, [id])

  return (
    <div>
      <div className='flex gap-[2rem] items-center'>
        <div>
          <img src={product?.img} alt='' />
        </div>
        <div>
          <span>{product?.productName}</span>
        </div>
        <div>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails