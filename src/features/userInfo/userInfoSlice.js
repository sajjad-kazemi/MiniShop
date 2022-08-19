import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk("userInfo/fetchLogin", () => {
  const login = localStorage.getItem("login");
  if (login === null) {
    localStorage.setItem("login", JSON.stringify(false));
    return false;
  } else if (JSON.parse(login) === true) {
    return true;
  } else {
    localStorage.setItem("login", JSON.stringify(false));
    return false;
  }
});

export const fetchAccounts = createAsyncThunk("userInfo/fetchAccounts", () => {
  const accounts = localStorage.getItem("accounts");
  if (accounts === null) {
    localStorage.setItem("accounts", "[]");
    return [];
  } else if (Array.isArray(JSON.parse(accounts)) && accounts.length > 0) {
    return JSON.parse(accounts);
  } else if (accounts === "[]") {
    return [];
  } else {
    localStorage.setItem("accounts", "[]");
    return [];
  }
});

const initialState = {
  login: false,
  accounts: [],
  currentUser: { userName: "", password: "", cart: [], email: "" },
  cartItems: 0,
  errorMsg: "",
};
const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      console.log(payload);
      const accounts = JSON.parse(localStorage.getItem("accounts"));
      if (accounts.length === 0) {
        state.errorMsg = "There is no account with this user name!";
        return;
      }
      accounts.forEach((account) => {
        if (payload.userName === account.userName) {
          if (payload.password === account.password) {
            localStorage.setItem("login", JSON.stringify(true));
            state.currentUser = account;
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
      console.log(payload)
      const accounts = JSON.parse(localStorage.getItem("accounts"));
      if (accounts.length === 0) {
        state.accounts = [payload];
        localStorage.setItem("login", JSON.stringify(true));
        localStorage.setItem("accounts", JSON.stringify([...accounts,payload]));
        state.login = true;
        return;
      }
      accounts.forEach((account) => {
        if (payload.userName === account.userName) {
          state.errorMsg = `
There is already an account with this user name!
please try something else.`;
        } else {
          state.accounts = [...accounts, payload];
          state.currentUser = payload;
          localStorage.setItem(
            "accounts",
            JSON.stringify({ ...accounts, payload })
          );
          localStorage.setItem("login", JSON.stringify(true));
          state.login = true;
        }
      });
    },
    resetErrorMsg: (state) => {
      state.errorMsg = "";
    },
    logout:(state)=>{
      state.login = false;
      localStorage.setItem("login", JSON.stringify(false));
    }
  },
  extraReducers: {
    [fetchLogin.fulfilled]: (state, { payload }) => {
      return { ...state, login: payload };
    },
    [fetchAccounts.fulfilled]: (state, { payload }) => {
      return { ...state, accounts: payload };
    },
  },
});

export const { setLogin, setSignin, resetErrorMsg, logout } = UserInfoSlice.actions;
export const getLogin = (store) => store.userInfo.login;
export const getErrorMsg = (store) => store.userInfo.errorMsg;
export default UserInfoSlice.reducer;
