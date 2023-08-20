import Image from "next/image";
import Mainhead from "@/components/Mainhead";
import Posts from "@/components/Posts";
import { useGetCategoriesMutation } from "@/services/api/hadleRequestsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoriesItems,
  selectCategory,
  setCategoriesItems,
} from "@/services/slices/categorySlice";

export default function Home() {
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const categoriesItems = useSelector(selectCategoriesItems);

  const [getCategories] = useGetCategoriesMutation();

  useEffect(() => {
    getCategoriesHandler();
  }, []);

  useEffect(() => {
    setItems(categoriesItems);
  }, [categoriesItems]);

  const getCategoriesHandler = async () => {
    const response = await getCategories();

    if (response?.data) {
      const data = response.data;
      setItems(data);
      dispatch(setCategoriesItems(data));
    }
  };

  return (
    <main className="w-[80%] mx-auto md:ml-[170px]  ml-[100px] ">
      {/* navbar for filtering , serching , adding new blog  */}
      <Mainhead items={items} />

      {/* shoing blogs  */}
      <Posts />

      {/* <AddPost /> */}
    </main>
  );
}
