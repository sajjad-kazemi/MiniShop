import {closeModal, toggleModal} from '../../features/commonInfo/commonInfoSlice'
import { useDispatch, useSelector } from "react-redux";

import { getLogin } from "../../features/userInfo/userInfoSlice";

function Cart() {
  const login = useSelector(getLogin);
  const dispatch = useDispatch()
  if (!login) {
    dispatch(toggleModal());
  }
  return <div>Cart</div>;
}

export default Cart;
