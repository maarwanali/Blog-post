import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import {
  useGetPostsByCategoryMutation,
  useGetPostsMutation,
} from "@/services/api/hadleRequestsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "@/services/slices/categorySlice";
import { selectSearch } from "@/services/slices/searchSlice";
import { selectCloseAddPost } from "@/services/slices/closeControllerSlice";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { selectPostsItmes, setPostsItems } from "@/services/slices/postsSlice";

function Posts() {
  // state varibles
  // const [posts, setPosts] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [page, setPage] = useState(1);

  const { categoryId } = useSelector(selectCategory);
  const { search } = useSelector(selectSearch);
  const closeAddPost = useSelector(selectCloseAddPost);
  const selectPosts = useSelector(selectPostsItmes);

  const dispatch = useDispatch();

  // mutation
  const [getPosts] = useGetPostsMutation();
  const [getPostsByCategory] = useGetPostsByCategoryMutation();

  useEffect(() => {
    fetchPosts(categoryId);
  }, [categoryId, page]);

  useEffect(() => {
    if (typeof search == "string") {
      setInputSearch(search);
    } else {
      setInputSearch("");
    }
  }, [search]);

  const fetchPosts = async (categoryId) => {
    let response;
    if (categoryId) {
      const body = { categoryId, page };
      response = await getPostsByCategory(body);
    } else {
      response = await getPosts(page);
    }

    if (response?.data) {
      const data = response.data;
      dispatch(setPostsItems(data));
    } else {
      console.log(response.error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-[90vh]">
      <div className="container flex flex-wrap gap-8 justify-center mt-10">
        {
          {
            true: selectPosts
              ?.filter(
                (filterPosts) =>
                  filterPosts.title.toLowerCase().includes(inputSearch) // Assuming you want to filter by the "title" field
              )
              .map((post) => {
                return <SinglePost key={post.id} post={post} />;
              }),
            false: selectPosts?.map((post) => {
              return <SinglePost key={post.id} post={post} />;
            }),
          }[Boolean(inputSearch)]
        }
      </div>

      <div className="flex justify-around items-center w-[100%] txt-main font-bold  my-6  ">
        {/* Add pagination buttons */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="flex-center transition-all duration-150 hover:text-white cursor-pointer hover:scale-105 "
        >
          <BsArrowLeftShort />
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          className=" flex-center transition-all duration-150 hover:text-white cursor-pointer hover:scale-105"
        >
          Next <BsArrowRightShort />
        </button>
      </div>
    </div>
  );
}
export default Posts;
