import {
  fetchAsyncAllProducts,
  fetchAsyncCategories,
} from "../../features/commonInfo/commonInfoSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncCategories());
    dispatch(fetchAsyncAllProducts());
  }, []);
  return (
    <>
      <div>home</div>
    </>
  );
}

export default Home;
