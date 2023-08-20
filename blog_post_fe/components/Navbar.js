import React, { useState } from "react";
import { BiSolidLogIn, BiSolidMessageSquareAdd } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import {
  FaCog,
  FaPlusCircle,
  FaSignOutAlt,
  FaWindowClose,
} from "react-icons/fa";
import Link from "next/link";
import AddPost from "./AddPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logOut, selectAuthData, setToken } from "@/services/slices/tokenSlice";
import {
  useLogOutMutation,
  useRefreshMutation,
} from "@/services/api/hadleRequestsSlice";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import {
  deleteUser,
  selectUserDate,
  setUser,
} from "@/services/slices/userSlice";
import AddCategory from "./AddCategory";
import {
  selectCloseAddCategory,
  selectCloseAddPost,
} from "@/services/slices/closeControllerSlice";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";

function Navbar() {
  const [openAdding, setOpenAdding] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [openAddingCategory, setOpenAddingCategory] = useState(true);

  const authData = useSelector(selectAuthData);
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector(selectUserDate);
  const closeAddPost = useSelector(selectCloseAddPost);
  const closeAddCategory = useSelector(selectCloseAddCategory);
  // mutation
  const [refreshToken] = useRefreshMutation();
  const [logout] = useLogOutMutation();
  useEffect(() => {
    getNewToken();
  }, []);

  useEffect(() => {
    setOpenAdding(false);
    setOpenAddingCategory(false);
  }, [closeAddPost, closeAddCategory]);

  const getNewToken = async () => {
    const { data } = await refreshToken();

    if (data?.accessToken) {
      const accessToken = data?.accessToken;
      dispatch(setToken({ accessToken }));

      const decode = jwtDecode(accessToken);

      console.log(decode);
      const userData = {
        userId: decode.userId,
        username: decode.username,
        role: decode.role,
      };
      dispatch(setUser(userData));
    }
  };

  const handleLogout = async () => {
    const { data } = await logout();

    if (data) {
      dispatch(logOut());
      dispatch(deleteUser());
      router.push("/");
    }
  };

  console.log(authData.isAuth);
  const sideBar = () => (
    <div
      className={`${
        openNav ? "move-on" : "move-off"
      } md:w-[140px] w-[100px]  h-[100%] bg-sec fixed top-0 left-0  z-30 `}
    >
      <div className="mx-auto w-[90%] h-[80%] flex flex-col items-start   ">
        <small
          className="txt-main absolute top-2 right-1 cursor-pointer hover:text-white sm:hidden "
          onClick={() => setOpenNav(false)}
        >
          <RiMenuFoldFill size={25} />
        </small>

        <ul className="h-[50%]  flex flex-col mt-6  items-start">
          <li>
            <Link href="/" className="link">
              <AiFillHome size={25} /> <small className="text-link">Home</small>
            </Link>
          </li>
          {userData.role == "admin" && (
            <>
              <li
                className="link cursor-pointer"
                onClick={() => setOpenAddingCategory(true)}
              >
                <FaPlusCircle size={25} />
                <small className="text-link">Category</small>
              </li>
              <li>
                <Link href="/admin" className="link cursor-pointer">
                  <FaCog size={25} />
                  <small className="text-link">Control Panel</small>
                </Link>
              </li>
            </>
          )}

          {authData.isAuth && (
            <li
              className="cursor-pointer link"
              onClick={() => setOpenAdding(true)}
            >
              <BiSolidMessageSquareAdd size={25} />
              <small className="text-link">Post</small>
            </li>
          )}

          {!authData?.isAuth && (
            <li>
              <Link href="/signin" className="link">
                <BiSolidLogIn size={25} />
                <small className="text-link">Log In</small>
              </Link>
            </li>
          )}

          {authData?.isAuth && (
            <li onClick={handleLogout} className="cursor-pointer link">
              <FaSignOutAlt className="txt-main" size={25} />{" "}
              <small className="text-link">Logout</small>
            </li>
          )}
        </ul>
      </div>

      {openAdding && (
        <div className=" bg-black bg-opacity-70 w-[100vw] h-[100vh] fixed top-0 left-0 z-20 flex-center ">
          <small
            className=" text-white absolute top-5 right-5 cursor-pointer hover:text-red-500 "
            onClick={() => setOpenAdding(false)}
          >
            {" "}
            <FaWindowClose size={20} />{" "}
          </small>

          <AddPost setOpenAdding={setOpenAdding} />
        </div>
      )}

      {openAddingCategory && (
        <div className=" bg-black bg-opacity-70 w-[100vw] h-[100vh] fixed top-0 left-0 z-50 flex-center ">
          <small
            className=" text-white absolute top-5 right-5 cursor-pointer hover:text-red-500 "
            onClick={() => setOpenAddingCategory(false)}
          >
            {" "}
            <FaWindowClose size={20} />{" "}
          </small>

          <AddCategory setOpenAddingCategory={setOpenAddingCategory} />
        </div>
      )}
    </div>
  );

  return (
    <div className="">
      <small
        className="txt-main fixed top-0 left-3 hover:text-white cursor-pointer sm:hidden"
        onClick={() => {
          setOpenNav(true);
        }}
      >
        <RiMenuUnfoldFill size={25} />
      </small>

      {sideBar()}
    </div>
  );
}

export default Navbar;
