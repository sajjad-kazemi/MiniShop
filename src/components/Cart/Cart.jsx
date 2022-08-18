import { useDispatch, useSelector } from "react-redux";

import { getLogin } from "../../features/userInfo/userInfoSlice";
import {openModal} from '../../features/commonInfo/commonInfoSlice'
import { useEffect } from "react";

function Cart() {
  const login = useSelector(getLogin);
  const dispatch = useDispatch()
  useEffect(()=>{
    console.log(login);
    if(!login){
      dispatch(openModal());
    }
  },[dispatch])
  return <div>Cart</div>;
}

export default Cart;
