import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

axios.defaults.baseURL = 'https://fakestoreapi.com/'

export const fetchAsyncCategories = createAsyncThunk(
  "commonInfo/fetchAsyncCategories",
  async () => {
    try{
      const res = await axios.get("/products/categories");
      return res.data
    }catch(er){
      console.error(er);
    }
  }
);
export const fetchAsyncAllProducts = createAsyncThunk(
  'commonInfo/fetchAsyncAllProducts',
  async ()=>{
    try{
      const res = await axios.get("/products");
      return res.data
    } catch(er){
      console.error(er);
    }
  }
)
const initialState = {
  categories: [],
  products: [],
  details: {},
  modal: false,
};
const CommonInfoSlice = createSlice({
  name: "commonInfo",
  initialState,
  reducers:{
    toggleModal:(state)=>{
      state.modal = !state.modal 
    },
  },
  extraReducers: {
    [fetchAsyncCategories.fulfilled]: (state, { payload }) => {
      return {...state, categories:payload}
    },
    [fetchAsyncCategories.rejected]:()=>{
      console.error('redux:','request rejected!');
    },
    [fetchAsyncAllProducts.fulfilled]:(state,{payload})=>{
      return {...state, products:payload};
    }
  },
});

export const {toggleModal,closeModal} = CommonInfoSlice.actions
export const getModal = store => store.commonInfo.modal 
export const getCategories = store => store.commonInfo.categories ;
export default CommonInfoSlice.reducer;
