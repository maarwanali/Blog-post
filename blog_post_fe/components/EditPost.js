import React, { useState } from "react";
import { useEditPostMutation } from "@/services/api/hadleRequestsSlice";
import { useDispatch } from "react-redux";
import { setCloseEditForm } from "@/services/slices/closeControllerSlice";
function EditPost({ id, title, body }) {
  const [postEdit, setPostEdit] = useState({
    title: title,
    body: body,
  });

  const dispatch = useDispatch();

  const [editPost] = useEditPostMutation();

  const handleChange = (e) => {
    setPostEdit({ ...postEdit, [e.target.name]: e.target.value });
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    const data = { postId: id, body: postEdit };
    const response = await editPost(data);

    if (response?.data) {
      dispatch(setCloseEditForm());
    }
  };

  return (
    <>
      <div className="bg-sec p-10 ">
        <form
          action=""
          className=" flex flex-col gap-4 justify-center "
          onSubmit={handleEditPost}
        >
          <input
            type="text"
            className="form-input"
            name="title"
            value={postEdit.title}
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <textarea
            className="px-3 outline-none"
            name="body"
            rows="4"
            cols="50"
            value={postEdit.body}
            onChange={(e) => {
              handleChange(e);
            }}
          ></textarea>

          <button className="form-btn" type="submit">
            Edit
          </button>
        </form>
      </div>{" "}
    </>
  );
}

export default EditPost;
