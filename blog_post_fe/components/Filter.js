import {
  useGetPostsByCategoryMutation,
  useGetPostsMutation,
} from "@/services/api/hadleRequestsSlice";
import { setCategory } from "@/services/slices/categorySlice";
import { setPosts } from "@/services/slices/postsSlice";
import React, { useEffect, useState } from "react";
import { BiSolidArrowFromLeft } from "react-icons/bi";
import { useDispatch } from "react-redux";

function Filter({ filterBy, filterItems = [] }) {
  const [openSub, setOpenSub] = useState(false);
  const dispatch = useDispatch();

  const handleFilter = async (categoryId) => {
    dispatch(setCategory({ categoryId }));
  };

  const FilterOff = () => (
    <li
      className="menu-item p-1"
      onClick={() => {
        handleFilter("");
      }}
    >
      - All
    </li>
  );

  return (
    <li className="menu-item p-[5px]">
      <p
        className="flex items-center cursor-pointer "
        onClick={() => setOpenSub(!openSub)}
      >
        {filterBy} <BiSolidArrowFromLeft size={15} className="ml-1 mt-1 " />
      </p>
      {openSub && (
        <ul className="absolute w-[100px] top-[15px] left-[101%] ">
          <FilterOff />
          {filterItems.map((item) => {
            return (
              <li
                key={item.id}
                className="menu-item p-1"
                onClick={() => {
                  handleFilter(item.id);
                }}
              >
                - {item.name}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default Filter;
