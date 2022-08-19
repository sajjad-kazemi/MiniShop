import { useDispatch, useSelector } from "react-redux";

import { getLogin } from "../../features/userInfo/userInfoSlice";
import {openModal} from '../../features/commonInfo/commonInfoSlice'
import { useEffect } from "react";

function Cart() {
  const login = useSelector(getLogin);
  const dispatch = useDispatch()
  useEffect(()=>{
    if(!login){
      dispatch(openModal());
    }
  },[login])
  return <div>Cart</div>;
}

export default Cart;
