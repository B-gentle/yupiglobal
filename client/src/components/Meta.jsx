import React from 'react';
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "Welcome to Yupi Global",
    description: "We sell all e-commerce sellable",
    keyword: "electronics, buy products"
}

export default Meta