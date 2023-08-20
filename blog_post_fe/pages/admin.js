import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useDeletePastByAdminMutation,
  useDeleteUserMutation,
  useDeleteCategoryMutation,
  useGetAllUsersMutation,
  useGetPostsMutation,
  useEditUSerRoleMutation,
  useGetCategoriesMutation,
} from "@/services/api/hadleRequestsSlice";
import { ToastContainer, toast } from "react-toastify";

function Admin() {
  const [showUsers, setShowUsers] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [deleteUser] = useDeleteUserMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deletePost] = useDeletePastByAdminMutation();
  const [getUsers] = useGetAllUsersMutation();
  const [getPosts] = useGetPostsMutation();
  const [editUserRole] = useEditUSerRoleMutation();
  const [getCategories] = useGetCategoriesMutation();

  useEffect(() => {
    handleGetUsers();
    handleGetPosts();
    handleGetCategories();
  }, []);

  const notify = (msg) => {
    toast.error(msg);
  };

  const handleGetUsers = async () => {
    const response = await getUsers();
    if (response?.data) {
      setUsers(response.data);
    } else {
      notify(response.error.data.message);
    }
  };

  const handleGetPosts = async () => {
    const response = await getPosts();
    if (response?.data) {
      setPosts(response.data);
    } else {
      notify(response.error.data.message);
    }
  };

  const handleGetCategories = async () => {
    const response = await getCategories();
    if (response?.data) {
      setCategories(response.data);
    } else {
      notify(response.error.data.message);
    }
  };
  const handleDeleteUser = async (userId) => {
    const response = await deleteUser(userId);
    if (response?.data) {
      handleGetUsers();
    } else {
      notify(response.error.data.message);
    }
  };

  const handleEditUserRole = async (userId, role) => {
    const data = { userId: userId, body: { role: role } };
    const response = await editUserRole(data);
    if (response?.data) {
      handleGetUsers();
    } else {
      notify(response.error.data.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const response = await deleteCategory(categoryId);
    if (response?.data) {
      handleGetCategories();
    } else {
      notify(response.error.data.message);
    }
  };

  const handleDeletePost = async (postId) => {
    const response = await deletePost(postId);
    if (response?.data) {
      handleGetPosts();
    } else {
      notify(response.error.data.message);
    }
  };

  return (
    <div className="md:ml-[150px] ml-[80px]">
      <div className="container mx-auto p-8">
        <button
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowUsers(!showUsers)}
        >
          Show Users
        </button>
        {showUsers && (
          <div>
            <h2 className="text-lg font-bold mb-2 text-white">Users</h2>
            <ul className="item-container ">
              {users.map((user, index) => (
                <li
                  key={user.id}
                  className={`item-admin ${
                    index !== users.length - 1
                      ? "border-b-2 border-[#dddddd80]"
                      : ""
                  }`}
                >
                  <span className="max-w-[150px] ">
                    {user.username}
                    <small className="text-xs"> ({user.role})</small>
                  </span>
                  <div>
                    {user?.role == "user" ? (
                      <button
                        className="mr-4 btn"
                        onClick={() => handleEditUserRole(user.id, "admin")}
                      >
                        Set Admin
                      </button>
                    ) : (
                      <button
                        className="mr-4 btn w-[100px]"
                        onClick={() => handleEditUserRole(user.id, "user")}
                      >
                        Set User
                      </button>
                    )}
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowCategories(!showCategories)}
        >
          Show Categories
        </button>
        {showCategories && (
          <div>
            <h2 className="text-lg font-bold mb-2  text-white">Categories</h2>
            <ul className="item-container ">
              {categories?.map((category, index) => (
                <li
                  key={category.id}
                  className={`item-admin ${
                    index !== categories.length - 1
                      ? "border-b-2 border-[#dddddd80]"
                      : ""
                  }`}
                >
                  {category.name}
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowPosts(!showPosts)}
        >
          Show Posts
        </button>
        {showPosts && (
          <div>
            <h2 className="text-lg font-bold mb-2 text-white">Posts</h2>
            <ul className="item-container ">
              {posts.map((post, index) => (
                <li
                  key={post.id}
                  className={`item-admin ${
                    index !== posts.length - 1
                      ? "border-b-2 border-[#dddddd80]"
                      : ""
                  }`}
                >
                  {post.title}
                  <button
                    className="btn-delete"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
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

export default Admin;
