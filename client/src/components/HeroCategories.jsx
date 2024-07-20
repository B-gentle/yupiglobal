import { AiOutlineMenuFold } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../redux/slices/productsApiSlice";
import { FaAngleRight } from "react-icons/fa6";
import { useState } from "react";

const HeroCategories = () => {
  const {
    data: categories,
    isLoading: loadingCategory,
    isError: categoryError,
  } = useGetCategoriesQuery();
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  return (
    <div>
      <h4>
        <AiOutlineMenuFold className="mr-2" /> Categories
      </h4>
      <div className={`grid relative ${showMoreCategories && "grid-cols-7"}`}>
        <ul className="leading-9 p-0 col-span-5">
          {categories ? (
            categories.slice(0, 14).map((category) => (
              <li
                className="list-none cursor-pointer text-[14px]"
                key={category._id}
              >
                {category.name}
              </li>
            ))
          ) : (
            <div className="flex justify-center flex-column">
              <img src="./error.png" className="w-1/3" alt="error" />
              <p>Error Fetching Categories</p>
            </div>
          )}
          <li
            className="list-none cursor-pointer"
            onMouseEnter={() => setShowMoreCategories(!showMoreCategories)}
          >
            <Link to="/categories" className="no-underline">
              More Categories <FaAngleRight />
            </Link>
          </li>
        </ul>
        {showMoreCategories && (
          <div className="absolute left-80 w-5/6 z-10 bg-white border border-red">
            {categories &&
              categories.slice(14, categories.length).map((cat) => (
                <ul className="leading-9 p-0">
                  <li className="list-none cursor-pointer">{cat.name}</li>
                </ul>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCategories;
