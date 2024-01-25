import React, { useState, useEffect } from 'react';
import Message from '../components/Message';
import Rating from "../components/Rating";
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../redux/slices/productsApiSlice';
import Loader from '../components/Loader';
import { addToCart } from '../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import Meta from "../components/Meta";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('')

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(id);

  const [createReview, { isLoading: isCreatingReview }] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth)

  const incrementQty = () => {
    if (qty >= product.countInStock) {
      return qty
    } else {
      setQty(qty + 1)
    }
  }

  const decrementQty = () => {
    if (qty <= 1) {
      setQty(1)
    } else {
      setQty(qty - 1)
    }

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(rating)
    try {
      await createReview({productId: id, rating, comment}).unwrap();
        refetch();
        toast.success("Review Submitted")
        setRating(0);
        setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error?.error)
    }
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')
  }

  const productDescription = product?.description?.split(',');
  const filteredDescription = productDescription?.filter((item) => item.trim() !== '')

  return (
    <div>
      <Meta title={product?.name} />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="error" message={error?.data?.message || error.error} />
      ) : (
        <>
          <div className='flex flex-col md:flex-row gap-[3rem] md:gap-[6rem] items-center md:justify-center my-[3rem] p-5'>
            <div className='w-6/12 md:w-2/12 md:h-[300px]'>
              <img className='w-full h-full' src={product?.image} alt='' />
            </div>
            <div className='flex flex-col md:w-5/12'>
              <span className='text-[20px] text-[#1c1c1c] font-[600]'>{product?.name}</span>
              <ul>
                {
                  filteredDescription.map((item, id) => <li key={id} className="capitalize mb-4">{item}</li>)
                }
              </ul>
            </div>
            <div className='flex flex-col gap-3 md:w-2/12'>
              {product.countInStock > 0 && (
                <div className='flex flex-col md:w-[200px] items-center gap-3'>

                  <div className='flex gap-x-3 items-center'>
                    <button className='flex justify-center items-center bg-[#9d5bc5] border-none rounded-[4px] py-1 px-3 text-white font-[500] text-[18px]'
                      onClick={decrementQty}>-</button>
                    <span>{qty}</span>
                    <button className='flex justify-center items-center bg-[#9d5bc5] border-none rounded-[4px] py-1 px-3 text-white font-[500] text-[18px]'
                      onClick={incrementQty}>+</button>
                  </div>
                  <span>{qty} item(s) Selected</span>
                  <Rating value={product.rating} />
                </div>
              )}
              <button
                className='bg-[#9d5bc5] border-none rounded-[4px] p-3 text-white'
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}>Add to cart</button>
            </div>
          </div>
          <div className='md:w-2/6 my-[3rem] p-5 md:px-[5rem]'>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && (
              <Message type="info" message="No Reviews" />
            )}
            <div>
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.comment}</p> 
                  <p>{review.createdAt.substring(0, 10)}</p>
                </div>
              ))}
            </div>
            <div className='mt-[2rem]'>
              <h2 className='text-[1rem] font-[600]'>Leave a Review</h2>
              {isCreatingReview && <Loader />}

              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div className='flex gap-x-2'>
                    <div>
                      <label htmlFor='one'><FaStar size={32} color="#cc5500" /></label>
                      <input className='hidden' type="radio" name="rating" id="one" value={rating} onChange={() => {setRating(1)}} />
                    </div>
                    <div>
                      <label htmlFor='two'><FaStar size={32} color="#cc5500" /></label>
                      <input className='hidden' type="radio" name="rating" id="two" value={rating} onChange={() => {setRating(2)}} />
                    </div>
                    <div>
                      <label htmlFor='three'><FaStar size={32} color="#cc5500" /></label>
                      <input className='hidden' type="radio" name="rating" id="three" value={rating} onChange={() => {setRating(3)}} />
                    </div>
                    <div>
                      <label htmlFor='four'><FaStar size={32} color="#cc5500" /></label>
                      <input className='hidden' type="radio" name="rating" id="four" value={rating} onChange={() => {setRating(4)}} />
                    </div>
                    <div>
                      <label htmlFor='five'><FaStar size={32} color="#cc5500" /></label>
                      <input className='hidden' type="radio" name="rating" id="five" value={rating} onChange={() => {setRating(5)}} />
                    </div>
                  </div>
                  <div className='flex flex-col my-2 pr-2'>
                    <label className='font-[500] mb-2'>Comment</label>
                    <textarea rows="9" value={comment} onChange={(e) => {setComment(e.target.value)}}></textarea>
                  </div>

                  <input 
                  type="submit" 
                  value="Submit" 
                  className='bg-[#9d5bc5] border-none rounded-[4px] p-3 text-white' 
                  disabled={isCreatingReview} />
                </form>
              ) : (
                <Message type='info' message="Please login to write a review" />
              )}
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default ProductDetails




{/* <select
                    className='p-2 rounded-[4px]'
                    onChange={(e) => { setQty(Number(e.target.value)) }}
                    value={qty}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select> */}