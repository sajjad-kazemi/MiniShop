import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.baseURL = "https://fakestoreapi.com/";

export const fetchAsyncCategories = createAsyncThunk(
  "commonInfo/fetchAsyncCategories",
  async () => {
    try {
      const res = await axios.get("/products/categories");
      return res.data;
    } catch (er) {
      console.error(er);
    }
  }
);
export const fetchAsyncAllProducts = createAsyncThunk(
  "commonInfo/fetchAsyncAllProducts",
  async (payload) => {
    const { allProducts, category } = payload || {
      allProducts: true,
      category: "",
    };
    try {
      const res = await axios.get(
        "products/" + ((!allProducts && `category/${category}`) || "")
      );
      return res.data;
    } catch (er) {
      console.error(er);
    }
  }
);
const initialState = {
  categories: [],
  products: [],
  productsLoading: true,
  details: {},
  modal: false,
  loginModal: true,
};
const CommonInfoSlice = createSlice({
  name: "commonInfo",
  initialState,
  reducers: {
    openModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.loginModal = true;
      state.modal = false;
    },
    signOrLog: (state, { payload }) => {
      state.loginModal = payload;
    },
  },
  extraReducers: {
    [fetchAsyncCategories.fulfilled]: (state, { payload }) => {
      return { ...state, categories: payload };
    },
    [fetchAsyncCategories.rejected]: () => {
      console.error("redux:", "request rejected!");
    },
    [fetchAsyncAllProducts.fulfilled]: (state, { payload }) => {
      return { ...state, products: payload, productsLoading: false };
    },
    [fetchAsyncAllProducts.pending]: (state) => {
      return { ...state, productsLoading: true };
    },
    [fetchAsyncAllProducts.rejected]: (state) => {
      alert(
`something wend wrong!
Please check your internet and reload.`
      );
      return { ...state, productsLoading: false, products: [] };
    },
  },
});

export const { openModal, closeModal, signOrLog } = CommonInfoSlice.actions;
export const getProductsLoading = (store) => store.commonInfo.productsLoading;
export const getAllProducts = (store) => store.commonInfo.products;
export const getModal = (store) => store.commonInfo.modal;
export const getLoginModal = (store) => store.commonInfo.loginModal;
export const getCategories = (store) => store.commonInfo.categories;
export default CommonInfoSlice.reducer;
