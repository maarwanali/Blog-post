import React, { use, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import {
  useAddPostMutation,
  useGetCategoriesMutation,
} from "@/services/api/hadleRequestsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoriesItems } from "@/services/slices/categorySlice";
import { setCloseAddPost } from "@/services/slices/closeControllerSlice";
import { setPostsItems } from "@/services/slices/postsSlice";

function AddPost({ setOpenAdding }) {
  const [postData, setPostData] = useState({
    title: "",
    body: "",
  });
  const [checkedItems, setCheckedItems] = useState("");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const categoriesData = useSelector(selectCategoriesItems);

  // mutation
  const [addPost] = useAddPostMutation();

  useEffect(() => {
    console.log(categoriesData);

    setCategories(categoriesData);
  }, [categoriesData]);

  const handleAddingPost = async (e) => {
    e.preventDefault();
    if (!postData.title || !postData.body) {
      return;
    }

    const sendingData = {
      ...postData,
      categoryId: checkedItems,
    };

    console.log(sendingData);
    const response = await addPost(sendingData);

    if (response?.data) {
      setOpenAdding(false);
      const payload = response.data;
      dispatch(setPostsItems(payload));
    }
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    if (checkedItems.includes(e.target.value)) {
      // Remove the item if it's already in the list
      const updatedItems = checkedItems
        .split(",")
        .filter((item) => item !== e.target.value)
        .join(",");
      setCheckedItems(updatedItems);
    } else {
      // Add the item if it's not in the list
      const updatedItems =
        checkedItems === ""
          ? e.target.value
          : `${checkedItems},${e.target.value}`;
      setCheckedItems(updatedItems);
    }
  };

  return (
    <div className="bg-sec p-10 max-w-[600px] z-50 ">
      <form
        action=""
        className=" flex flex-col gap-4 justify-center "
        onSubmit={(e) => handleAddingPost(e)}
      >
        <input
          type="text"
          className="form-input "
          name="title"
          placeholder="Title"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <textarea
          className="px-3 outline-none"
          name="body"
          rows="4"
          cols="50"
          placeholder="Body"
          onChange={(e) => {
            handleChange(e);
          }}
        ></textarea>

        <div className="flex gap-7 flex-wrap">
          {categories?.map((category) => {
            return (
              <label key={category.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category.id}
                  checked={checkedItems.includes(category.id)}
                  onChange={(e) => handleCheckboxChange(e)}
                  className="form-checkbox h-5 w-5 text-[#e53935]"
                />
                <span className="text-white">{category.name}</span>
              </label>
            );
          })}
        </div>

        <input type="submit" className="form-btn" />
      </form>
    </div>
  );
}

export default AddPost;
