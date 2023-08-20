import { useSigninMutation } from "@/services/api/hadleRequestsSlice";
import { setToken } from "@/services/slices/tokenSlice";
import { setUser } from "@/services/slices/userSlice";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  //  motution

  const [signin] = useSigninMutation();

  // errors messages
  const notify = (msg) => {
    toast.error(msg);
  };

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const signinHandler = async (e) => {
    e.preventDefault();
    if (!inputData.username || !inputData.password) {
      notify("All Fiald is requird");
      return;
    }

    const response = await signin(inputData);

    if (response?.data?.accessToken) {
      const accessToken = response?.data.accessToken;

      dispatch(setToken({ accessToken }));

      const decode = jwtDecode(accessToken);

      const data = {
        userId: decode.userId,
        username: decode.username,
        role: decode.role,
      };
      dispatch(setUser(data));

      router.push("/");
    } else {
      notify(response.error.data.message);
    }
  };

  return (
    <div className="ml-[120px]">
      <div className="w-[100%] h-[100vh]">
        <div className="container flex flex-col items-center justify-center h-[80%] relative">
          <Link href="/register">
            <div className="absolute top-1 right-5 ">
              <p className=" txt-main loader cursor-pointer">Create Account</p>
            </div>
          </Link>

          <div className=" mt-8 flex flex-col items-center bg-sec pb-6 px-14 w-fit drop-shadow-lg  ">
            <h3 className="logo">Bloging</h3>
            <form
              action=""
              className="flex flex-col justify-center items-center gap-4"
              onSubmit={signinHandler}
            >
              <input
                type="text"
                className="form-input"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
              <input
                type="password"
                className="form-input"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />

              <input type="submit" className="form-btn" />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Signin;
