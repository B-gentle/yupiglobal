import React from "react";
import RecommendedCard from "./RecommendedCard";
import { useGetProductsQuery } from "../redux/slices/productsApiSlice";

const RecommendedItms = () => {

    const {data: products} = useGetProductsQuery()
  return (
    <section className="mt-2 px-4">
      <div className="mb-[3rem] bg-white">
        <h3 className="text-[24px] text-[#1c1c1c] font-[600] mb-[24px] p-3 md:px-5 header-clip-bg">
          Recommended Items
        </h3>
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-[20px]">
          {products &&
            products.filter((product) => console.log(product))
            
            // (
            //   <div
            //     key={item._id}
            //     className="md:h-[310px] md:w-[220px] w-full md:mb-[20px] border-1 border-solid border-[#51b7d5]"
            //   >
            //     <RecommendedCard
            //       img={item.img}
            //       price={item.price}
            //       description={item.description}
            //       name={item.name}
            //       link={index}
            //     />
            //   </div>
            // )
            // )
            }
        </div>
      </div>
    </section>
  );
};

export default RecommendedItms;
