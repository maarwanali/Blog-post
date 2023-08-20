import SinglePost from "@/components/SinglePost";
import { useGetPostsProfileMutation } from "@/services/api/hadleRequestsSlice";
import { selectCloseEditForm } from "@/services/slices/closeControllerSlice";
import { selectPosts, selectRefetch } from "@/services/slices/postsSlice";
import { selectUserDate } from "@/services/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [getPosts] = useGetPostsProfileMutation();
  const selectPost = useSelector(selectRefetch);
  const userData = useSelector(selectUserDate);
  const closeEditForm = useSelector(selectCloseEditForm);

  const notify = (msg) => {
    toast.error(msg);
  };
  useEffect(() => {
    hanldeFetchPosts();
  }, [selectPost, closeEditForm]);

  const hanldeFetchPosts = async () => {
    const response = await getPosts();

    if (response?.data) {
      setPosts(response.data);
    } else {
      notify(response?.error?.data?.message);
    }
  };

  return (
    <div className="ml-[160px] flex justify-center">
      <div className="bg-[#263238] min-h-screen py-8">
        <div className="container mx-auto">
          <h1 className="text-white text-3xl font-semibold mb-4">
            {" "}
            {userData?.username}'s Profile
          </h1>

          <div className="grid gap-6">
            {posts?.map((post) => (
              <SinglePost key={post.id} post={post} showOption={true} />
            ))}
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

export default Profile;
