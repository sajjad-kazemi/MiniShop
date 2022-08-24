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

//  ! i don't need this one:
// export const fetchCurrentUser = createAsyncThunk(
//   'userInfo/fetchCurrentUser',
//   ()=>{
//     const login = JSON.parse(localStorage.getItem("login"));
//     if(!login){
//       return;
//     }
//     const currentUser =localStorage.getItem('currentUser');
//     const currentUserObj = JSON.parse(currentUser)
//     if(currentUserObj === null){
//       localStorage.setItem("currentUser",'{}');
//       return;
//     }
//     if(typeof currentUserObj === 'object'){
//       return currentUserObj;
//     }
//     return {}
//   }
// )

const initialState = {
  login: false,
  accounts: [],
  currentUser: {userName:'', password:'',email:'',totalPrice:0, cart:{}},
  cartItems: 0,
  errorMsg: "",
};
const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
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
            let cartItemsSum = 0;
            Object.keys(account.cart).forEach(item=>{
              cartItemsSum += account.cart[item]
            })
            state.cartItems = cartItemsSum;
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
      const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
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
            JSON.stringify([ ...accounts, payload ])
          );
          localStorage.setItem("login", "true");
          localStorage.setItem("currentUser", JSON.stringify(payload));
          state.accounts = [...accounts, payload];
          state.currentUser = payload;
          state.login = true;
        }
      });
    },
    resetErrorMsg: (state) => {
      state.errorMsg = "";
    },
    logout: (state, { payload }) => {
      const {currentUser,accounts} = payload;
      const lsAccounts = JSON.parse(localStorage.getItem("accounts"));
      state.login = false;
      state.currentUser = {};
      state.cartItems = 0;
      state.accounts = [ ...lsAccounts, currentUser ];
      const newAccounts = [...accounts]
      let indexOfCurrentUser = 0;
      newAccounts.forEach((account,index) =>{
        if(account && currentUser.userName === account.userName){
          indexOfCurrentUser = index;
        }
      });
      newAccounts[indexOfCurrentUser] = {...currentUser}
      localStorage.setItem("accounts",JSON.stringify(newAccounts));
      localStorage.setItem("login", "false");
      localStorage.setItem("currentUser", "{}");
    },
    cartChange: (state, { payload }) => {
      const { number, currentUser } = payload;
      const totalPrice = +((payload.totalPrice).toFixed(2));
      const price = +((payload.price).toFixed(2));
      const id = +payload.id;
      const numInCart = currentUser.cart[id];
      const  newCart = {...currentUser.cart};
      if(numInCart !== undefined) {
        if(number === 1){
          newCart[id] = numInCart + number;
          state.currentUser.cart = newCart ;
          state.currentUser.totalPrice = totalPrice+(number*price);
        }else if(numInCart > 1){
          newCart[id] = numInCart + number;
          state.currentUser.cart = newCart;
          state.currentUser.totalPrice = totalPrice+(number*price);
        } else{
          delete newCart[id];
          state.currentUser.cart = newCart;
          state.currentUser.totalPrice = totalPrice+(number*price);
        }
      } else if(number === 1 && !numInCart){
        newCart[id] = 1;
        state.currentUser.cart = newCart;
        state.currentUser.totalPrice = totalPrice+(number*price);
      }
      if(newCart[id] === 0){
        delete newCart[id];
      }
      const newTotalPrice =  +((totalPrice+(number*price)).toFixed(2));
      const newCurrentUser = {...currentUser,cart:newCart,totalPrice:newTotalPrice};
      const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
      let indexOfCurrentUser = 0;
      accounts.forEach((account,index) =>{
        if(account && newCurrentUser.userName === account.userName){
          indexOfCurrentUser = index;
        }
      });
      let itemsAmount = 0;
      Object.values(newCart).forEach(value=>{
        itemsAmount += value;
      })
      state.cartItems = itemsAmount;
      accounts[indexOfCurrentUser] = {...newCurrentUser};
      state.accounts = accounts;
      localStorage.setItem('accounts', JSON.stringify(accounts));
      localStorage.setItem('currentUser', JSON.stringify(newCurrentUser));
    },
    clearCart: (state, { payload }) => {
      const {currentUser,accounts} = payload;
      const editableAccounts = [...accounts]
      state.currentUser.cart = {};
      state.cartItems = 0;
      state.currentUser.totalPrice = 0;
      const newCurrentUser = {...currentUser,cart:{},totalPrice:0};
      let indexOfCurrentUser = 0;
      editableAccounts.forEach((account,index) =>{
        if(account && newCurrentUser.userName === account.userName){
          indexOfCurrentUser = index;
        }
      });
      editableAccounts[indexOfCurrentUser] = {...newCurrentUser};
      state.accounts = editableAccounts;
      localStorage.setItem('currentUser', JSON.stringify(newCurrentUser));
      localStorage.setItem('accounts', JSON.stringify(editableAccounts));
    },
  },
  extraReducers: {
    [fetchLogin.fulfilled]: (state, { payload }) => {
      const { login, currentUser } = payload;
      let cartItems = 0;
      if(typeof currentUser === 'object' && Object.keys(currentUser).length !== 0){
        Object.values(currentUser.cart).forEach(value=>{
          cartItems += value
        })
        return { ...state, login, currentUser, cartItems };
      }
    },
    [fetchAccounts.fulfilled]: (state, { payload }) => {
      return { ...state, accounts: payload };
    },
    // [fetchCurrentUser.fulfilled]:(state, { payload }) => {
    //   const currentUser = payload || {userName:'', password:'',email:'', cart:{}};
    //   return { ...state, currentUser };
    // }
  },
});

export const { setLogin, setSignin, resetErrorMsg, logout, cartChange, clearCart,  } =
  UserInfoSlice.actions;
export const getCurrentUser = store => store.userInfo.currentUser;
export const getLogin = store => store.userInfo.login;
export const getErrorMsg = store => store.userInfo.errorMsg;
export const getCartItems = store => store.userInfo.cartItems;
export const getCart = store => store.userInfo.currentUser.cart;
export const getAccounts = store => store.userInfo.accounts;
export const getTotalPrice = store => store.userInfo.currentUser.totalPrice;
export default UserInfoSlice.reducer;
