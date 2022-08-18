import CommonInfo from './commonInfo/commonInfoSlice'
import UserInfo from './userInfo/userInfoSlice'
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer:{
    commonInfo:CommonInfo,
    userInfo:UserInfo
  }
})
export default store