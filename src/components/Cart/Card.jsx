import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";
import axios from "./../../common/api/api";
import { Card as CardMui } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPrice, getTotalPrice } from "../../features/userInfo/userInfoSlice";
import { useEffect, useState } from "react";

function Card({ id, amount }) {
  const currentTotalPrice = useSelector(getTotalPrice);
  const [product,setProduct] = useState({});
  const dispatch = useDispatch();
  useEffect(()=>{
    axios.get("products/" + id).then((res) => {
      setProduct(res.data);
    });
  },[])
  useEffect(() => {
    dispatch(setTotalPrice({currentTotal:+currentTotalPrice,price:(product.price && product.price*amount)}));
  }, [product.price,amount]);
  return <div></div>;
}

export default Card;
