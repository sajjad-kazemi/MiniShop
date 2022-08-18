import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const getCartItems = createAsyncThunk("userInfo/getCartItems", () => {
  const cartItems = localStorage.getItem("cart");
  if (cartItems === null) {
    return [];
  } else if (Array.isArray(JSON.parse(cartItems))) {
    return JSON.parse(cartItems);
  } else {
    localStorage.setItem("cart", JSON.stringify([]));
    return [];
  }
});

export const fetchLogin = createAsyncThunk(
  'userInfo/fetchLogin',
  ()=>{
    const login = localStorage.getItem('login');
    if(login === null){
      localStorage.setItem('login',JSON.stringify(false))
      return false;
    } else if(JSON.parse(login) === true ){
      return true;
    } else {
      return false;
    }
  }
  )

const initialState = {
  login: false,
  cart: [],
  cartItems: 0,
};
const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  extraReducers: {
    [getCartItems.fulfilled]: (state, { payload }) => {
      return { ...state, cart: payload };
    },
    [getCartItems.rejected]: () => {
      console.error("redux: cart request rejected!");
    },
    [fetchLogin.fulfilled]:(state,{payload})=>{
      return {...state,login:payload}
    }
  },
});

export const getLogin = store => store.userInfo.login
export default UserInfoSlice.reducer;
