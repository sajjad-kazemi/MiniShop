import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk("userInfo/fetchLogin", () => {
  const currentUser = localStorage.getItem("currentUser");
  const login = localStorage.getItem("login");
  if (login === null || currentUser === null) {
    localStorage.setItem("login", JSON.stringify(false));
    localStorage.setItem("currentUser", "{}");
    return { login: false, currentUser: {} };
  } else if (
    JSON.parse(login) === true &&
    typeof JSON.parse(currentUser) === "object"
  ) {
    return { login: true, currentUser:JSON.parse(currentUser) };
  } else {
    localStorage.setItem("login", JSON.stringify(false));
    localStorage.setItem("currentUser", "{}");
    return { login: false, currentUser: {} };
  }
});

export const fetchAccounts = createAsyncThunk("userInfo/fetchAccounts", () => {
  const accounts = localStorage.getItem("accounts");
  if (accounts === null) {
    localStorage.setItem("accounts", "[]");
    return [];
  } else if (accounts === "[]") {
    return [];
  } else if (Array.isArray(JSON.parse(accounts)) && accounts.length > 0) {
    return JSON.parse(accounts);
  } else {
    localStorage.setItem("accounts", "[]");
    return [];
  }
});

const initialState = {
  login: false,
  accounts: [],
  currentUser: {userName:'', password:'',email:'', cart:{}},
  cartItems: 0,
  errorMsg: "",
};
const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      const accounts = JSON.parse(localStorage.getItem("accounts"));
      if (accounts.length === 0) {
        state.errorMsg = "There is no account with this user name!";
        return;
      }
      accounts.forEach((account) => {
        if (payload.userName === account.userName) {
          if (payload.password === account.password) {
            localStorage.setItem("login", "true");
            localStorage.setItem("currentUser", JSON.stringify(account));
            state.currentUser = account;
            state.cartItems = Object.values(account.cart).reduce(
              (init, curr) => init + curr,
              0
            );
            state.login = true;
            return;
          } else {
            state.errorMsg = "User name or Password is incorrect!";
            return;
          }
        }
        state.errorMsg = "There is no account with this user name!";
      });
    },
    setSignin: (state, { payload }) => {
      const accounts = JSON.parse(localStorage.getItem("accounts"));
      if (accounts.length === 0) {
        state.accounts = [payload];
        localStorage.setItem("login", "true");
        localStorage.setItem("accounts", JSON.stringify([payload]));
        localStorage.setItem("currentUser", JSON.stringify({ ...payload }));
        state.currentUser = { ...payload };
        state.login = true;
        return;
      }
      accounts.forEach((account) => {
        if (payload.userName === account.userName) {
          state.errorMsg = `
There is already an account with this user name!
please try something else.`;
        } else {
          localStorage.setItem(
            "accounts",
            JSON.stringify({ ...accounts, payload })
          );
          localStorage.setItem("login", "true");
          localStorage.setItem("currentUser", JSON.stringify(payload));
          state.accounts = [...accounts, payload];
          state.currentUser = payload;
          state.currentUser = payload;
          state.login = true;
        }
      });
    },
    resetErrorMsg: (state) => {
      state.errorMsg = "";
    },
    logout: (state, { payload }) => {
      const currentUser = payload;
      const lsAccounts = JSON.parse(localStorage.getItem("accounts"));
      state.login = false;
      state.currentUser = {};
      state.cartItems = 0;
      state.accounts = { ...lsAccounts, currentUser };
      localStorage.setItem("login", "false");
      localStorage.setItem("currentUser", "{}");
    },
    cartChange: (state, { payload }) => {
      const { number, currentUser } = payload;
      const id = +payload.id
      const numInCart = state.currentUser.cart[id];
      const  newCart = {...currentUser.cart};
      if(numInCart !== undefined) {
        if(number === 1){
          newCart[id] = numInCart + number;
          state.currentUser.cart = newCart ;
        }else if(numInCart > 0){
          newCart[id] = numInCart + number;
          state.currentUser.cart = newCart;
        } else{
          delete newCart[id];
          state.currentUser.cart = newCart;
        }
      } else if(number === 1 && !numInCart){
        state.currentUser.cart = {...currentUser.cart,[id]:1};
        newCart[id] = 1
      }
      if(newCart[id] === 0){
        delete newCart[id];
      }
      const newCurrentUser = {...currentUser,cart:newCart};
      const accounts = JSON.parse(localStorage.getItem('accounts'));
      let indexOfCurrentUser = 0;
      accounts.forEach((account,index) =>{
        if(newCurrentUser.userName === account.userName){
          indexOfCurrentUser = index;
        }
      });
      let itemsAmount = 0
      Object.values(newCart).forEach(value=>{
        itemsAmount += value
      })
      state.cartItems = itemsAmount;
      accounts[indexOfCurrentUser] = newCurrentUser;
      localStorage.setItem('accounts', JSON.stringify(accounts));
      localStorage.setItem('currentUser', JSON.stringify(newCurrentUser));
    },
  },
  extraReducers: {
    [fetchLogin.fulfilled]: (state, { payload }) => {
      const { login, currentUser } = payload;
      return { ...state, login, currentUser };
    },
    [fetchAccounts.fulfilled]: (state, { payload }) => {
      return { ...state, accounts: payload };
    },
  },
});

export const { setLogin, setSignin, resetErrorMsg, logout, cartChange } =
  UserInfoSlice.actions;
export const getCurrentUser = (store) => store.userInfo.currentUser;
export const getLogin = (store) => store.userInfo.login;
export const getErrorMsg = (store) => store.userInfo.errorMsg;
export const getCartItems = (store) => store.userInfo.cartItems
export default UserInfoSlice.reducer;
