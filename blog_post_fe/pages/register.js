import { useRegisterMutation } from "@/services/api/hadleRequestsSlice";
import { setToken } from "@/services/slices/tokenSlice";
import { setUser } from "@/services/slices/userSlice";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  // mutation
  const [register] = useRegisterMutation();

  // errors messages
  const notify = (msg) => {
    toast.error(msg);
  };

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !inputData.username ||
      !inputData.password ||
      !inputData.confirmPassword
    ) {
      return notify("All Field is requird");
    } else if (inputData.password != inputData.confirmPassword) {
      return notify("Password and Confirmation Password is not the same");
    }

    const sendingData = {
      username: inputData.username,
      password: inputData.password,
    };

    const response = await register(sendingData);
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
          <Link href="/signin">
            <div className="absolute top-1 right-5 ">
              <p className=" txt-main loader cursor-pointer">
                Already have an acount
              </p>
            </div>
          </Link>

          <div className=" mt-8 flex flex-col items-center bg-sec pb-6 px-14 w-fit drop-shadow-lg  ">
            <h3 className="logo">Bloging</h3>

            <p className=" text-white loader  "> Create acount</p>
            <form
              action=""
              className="flex flex-col justify-center items-center gap-4 mt-5"
              onSubmit={handleRegister}
            >
              <input
                type="text"
                className="form-input"
                placeholder="Username"
                name="username"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <input
                type="password"
                className="form-input"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <input
                type="password"
                className="form-input"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <button type="submit" className="form-btn">
                Register{" "}
              </button>
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

export default Register;
