import React, { useEffect, useState } from "react";
import { BsFillFilterCircleFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Filter from "./Filter";
import { useGetCategoriesMutation } from "@/services/api/hadleRequestsSlice";
import ClickAwayListener from "react-click-away-listener";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoriesItems,
  selectCategory,
  setCategoriesItems,
} from "@/services/slices/categorySlice";
import Link from "next/link";
import { selectAuthData } from "@/services/slices/tokenSlice";
import { deleteInput, setInput } from "@/services/slices/searchSlice";

function Mainhead({ items }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const userAuth = useSelector(selectAuthData);
  const categoryId = useSelector(selectCategory);

  // mutation

  useEffect(() => {
    setOpen(false);
  }, [categoryId]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (search.length == 1) {
      dispatch(deleteInput());
    }
  };
  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      // Run your search function here
      handleSearch();
    }
  };
  const handleSearch = () => {
    dispatch(setInput({ search }));
  };

  return (
    <div className="container mt-5 flex justify-between items-center relative">
      {/* Filtering and searchbar */}
      <div className="flex justify-between items-center w-full">
        {/* Filter Icon */}
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer txt-main transition-transform duration-500 hover:scale-110 ml-2"
        >
          <BsFillFilterCircleFill size={20} />
        </div>

        {/* Filter Dropdown */}
        {open && (
          <ClickAwayListener
            onClickAway={() => {
              setOpen(false);
            }}
          >
            <div className="w-[150px] absolute top-[25px] p-2 z-50 rounded">
              <ul>
                <Filter filterBy={"Category"} filterItems={items} />
              </ul>
            </div>
          </ClickAwayListener>
        )}

        {/* Search Input */}
        <div className="relative flex items-center ">
          <FiSearch
            className="txt-main  absolute ml-2 transition-all duration-150 hover:scale-110 hover:text-white cursor-pointer "
            size={20}
            onClick={handleSearch}
          />
          <input
            type="text"
            className="input pl-10 pr-2"
            placeholder="Search..."
            onChange={handleChange}
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        {/* Profile Link */}

        <Link
          href="/profile"
          className="txt-main bg-slate-300 rounded-full relative cursor-pointer group mr-2"
        >
          <CgProfile size={30} />
          <p className="absolute w-[80px]  text-white text-sm bg-sec p-1 rounded-full rounded-tl-none left-[100%] hidden group-hover:flex justify-center items-center">
            {userAuth.isAuth ? <> My Profile</> : <>Log In</>}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Mainhead;
