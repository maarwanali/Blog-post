import { useAddCategoryMutation } from "@/services/api/hadleRequestsSlice";
import { setCategoriesItems } from "@/services/slices/categorySlice";
import { setCloseAddCategory } from "@/services/slices/closeControllerSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddCategory({ setOpenAddingCategory }) {
  const [category, setCategory] = useState({
    name: "",
    color: "",
  });

  const dispatch = useDispatch();

  //   mutation
  const [addCategory] = useAddCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addCategory(category);
    if (response?.data) {
      const payload = response?.data;
      dispatch(setCategoriesItems([payload]));
      setOpenAddingCategory(false);
      // dispatch(setCloseAddCategory());
    } else {
      console.log(response.error.data.message);
    }
  };

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };
  return (
    <div className="bg-sec p-10 ">
      <form
        action=""
        className=" flex flex-col gap-4 justify-center "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="form-input"
          name="name"
          placeholder="Category.."
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-input"
          name="color"
          placeholder="#...(color)"
          onChange={handleChange}
        />

        <button className="form-btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
