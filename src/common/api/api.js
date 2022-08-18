import axios from "axios";

export default axios.create({
  baseUrl:'https://fakestoreapi.com',
  headers:{
    'Content-Type': 'application/json'
  }
});