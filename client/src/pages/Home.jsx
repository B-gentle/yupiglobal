import React from 'react'
import BrandShopping from '../components/BrandShopping';
import DealsAndOffers from '../components/DealsAndOffers';
import FeaturedProducts from '../components/FeaturedProducts';
import Hero from '../components/Hero';
import RecommendedItms from '../components/RecommendedItms';

const Home = () => {
  return (
    <>
    <Hero />
    <BrandShopping />
    <FeaturedProducts />
    <DealsAndOffers />
    <RecommendedItms />
    </>
  )
}

export default Home