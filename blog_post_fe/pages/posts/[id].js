import { useAddCommentMutation } from "@/services/api/hadleRequestsSlice";
import { selectAuthData } from "@/services/slices/tokenSlice";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Post({ data }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(data.comments);
  const tokenData = useSelector(selectAuthData);

  // mutation
  const [addComment] = useAddCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { body: comment, postId: data.id };
    const commentData = await addComment(body);

    const newComment = {
      ...commentData.data,
      user: { id: 0, username: "you" },
    };

    setComments([...comments, newComment]);
    setComment("");
  };
  return (
    <div className="text-white  w-fit  flex  justify-center">
      <div className="w-[50%] max-w-[80%] p-5 bg-sec rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">{data.title}</h1>
        <p className="text-gray-300 mb-4 text-sm sm:text-base">{data.body}</p>
        <div className="flex items-center space-x-4 text-gray-300">
          <span>Posted by:</span>
          <span className="text-blue-500">{data.user.username}</span>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Categories:</h2>
          <ul className="flex space-x-2">
            {data.categories.map((category) => (
              <li
                key={category.category.id}
                className={`mr-1  py-1 font-bold  text-[12px] px-2 rounded-2xl flex-center  font-bold opacity-80 `}
                style={{ backgroundColor: category.category.color || "#000" }}
              >
                {category.category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Comments:</h2>
          <ul className="space-y-4">
            {comments?.map((comment) => (
              <li
                key={comment.id}
                className="text-gray-400 bg-gray-700 p-4 rounded"
              >
                <p>{comment.body}</p>
                <div className="flex items-center mt-2 text-gray-300 text-xs">
                  <span>By : {comment?.user?.username}</span>
                  <span className="mx-2">|</span>
                  <span>
                    {comment.createdAt.substring(0, 9)} —{" "}
                    {comment.createdAt.substring(11, 16)}{" "}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Add the comment input here */}
        {tokenData.isAuth && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 ">Add Comment:</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                className="bg-gray-700 p-4 w-full rounded outline-none focus:bg-slate-600"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                rows="4"
                required
              />
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                type="submit"
              >
                Add Comment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
// Rest of the code remains the same

export default Post;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}post/${id}`
  );

  return {
    props: {
      data,
    },
  };
}
