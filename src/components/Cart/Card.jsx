import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";
import axios from "./../../common/api/api";
import { Card as CardMui, IconButton, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalPrice,
  cartChange,
} from "../../features/userInfo/userInfoSlice";
import { useEffect, useState } from "react";

function Card({ id, amount, currentUser }) {
  const totalPrice = useSelector(getTotalPrice);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const handleChange = (info) => {
    dispatch(cartChange(info));
  };
  useEffect(() => {
    axios.get("products/" + id).then((res) => {
      setProduct(res.data);
    });
  }, []);
  return (
    <>
      <Grid xs={12} md={6} lg={4}>
        <CardMui sx={{ display: "flex" }}>content</CardMui>
        <Box>
          <IconButton
            onClick={() =>
              handleChange({
                totalPrice,
                id,
                number: 1,
                currentUser,
                price: product.price,
              })
            }
          >
            <AddCircleOutlineRounded color="primary" />
          </IconButton>
          <Typography variant="body2">{amount}</Typography>
          <IconButton
            onClick={() =>
              handleChange({
                totalPrice,
                id,
                number: -1,
                currentUser,
                price: product.price,
              })
            }
          >
            <RemoveCircleOutlineRounded color="primary" />
          </IconButton>
        </Box>
      </Grid>
    </>
  );
}

export default Card;
