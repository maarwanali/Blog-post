import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { RiUser3Fill } from "react-icons/ri";
import { LiaComment } from "react-icons/lia";
import ClickAwayListener from "react-click-away-listener";
import { useRouter } from "next/router";
import { useDeletePostMutation } from "@/services/api/hadleRequestsSlice";
import { useDispatch, useSelector } from "react-redux";
import { refechData } from "@/services/slices/postsSlice";
import EditPost from "./EditPost";
import { FaWindowClose } from "react-icons/fa";
import { selectCloseEditForm } from "@/services/slices/closeControllerSlice";

function SinglePost({ post, showOption = false }) {
  const { id, createdAt, title, body, user, comments, categories } = post;
  const [open, setOpen] = useState(false);

  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const closeEditForm = useSelector(selectCloseEditForm);

  //nutation
  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    setEdit(false);
  }, [closeEditForm]);

  const handleRoute = () => {
    router.push(`posts/${id}`);
  };

  const handleOption = async (option, id) => {
    if (option == "delete") {
      const response = await deletePost(id);

      if (response?.data) {
        dispatch(refechData());
      }

      return;
    } else if (option == "edit") {
      setEdit(true);
    }
  };

  //transition-all duration-200 hover:scale-105 hover:bg-gray-900
  return (
    <div className="  w-[300px] h-fit bg-sec  rounded-lg p-3 relative cursor-pointer group ">
      <div className="flex justify-between items-center  p-3 rounded-lg ">
        <div className="flex items-center justify-center">
          {categories?.map((category) => {
            return (
              <h2
                className={`mr-2 text-[10px] px-2 rounded-2xl flex-cente font-bold opacity-80 `}
                style={{
                  backgroundColor: category.category.color || "#bd8e28fd",
                }}
                key={category.categoryId}
              >
                {category.category.name}
              </h2>
            );
          })}
        </div>
        <div className="relative">
          {showOption && (
            <span onClick={() => setOpen(!open)}>
              <BsThreeDots className="txt-main cursor-pointer" size={20} />
            </span>
          )}

          {open && (
            <ClickAwayListener
              onClickAway={() => {
                setOpen(false);
              }}
            >
              <ul className="absolute w-[110px] bg-menu p-2 z-20 right-2">
                <li className="" onClick={() => handleOption("delete", id)}>
                  Delete
                </li>
                <li className="" onClick={() => handleOption("edit", id)}>
                  Edit
                </li>
              </ul>
            </ClickAwayListener>
          )}
        </div>
      </div>

      <div
        onClick={handleRoute}
        className="group-hover:transition-all duration-200 group-hover:scale-105  "
      >
        <h3 className="txt-main mt-2 font-bold border-b-[1px] border-gray-400">
          {title}
        </h3>

        <p className="txt-main my-4">{body.substring(0, 180)}....</p>

        <div className="flex txt-main justify-between">
          <span className="text-xs font-bold flex-center">
            <RiUser3Fill className="mr-1" /> {user?.username}
          </span>

          <div className="mr-1 flex-center cursor-pointer my-3">
            <LiaComment />
            <small className="ml-1 text-[11px]">{comments?.length}</small>
          </div>
        </div>
        <p className="txt-main  text-xs bottom-2 right-2 absolute  group-hover:hidden">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      {edit && (
        <div className=" bg-black bg-opacity-70 w-[100vw] h-[100vh] fixed top-0 left-0 z-20 flex-center ">
          <small
            className=" text-white absolute top-5 right-5 cursor-pointer hover:text-red-500 "
            onClick={() => setEdit(false)}
          >
            <FaWindowClose size={20} />{" "}
          </small>
          <EditPost id={id} title={title} body={body} />
        </div>
      )}
    </div>
  );
}

export default SinglePost;
