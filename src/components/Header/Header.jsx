import {
  AccountCircleOutlined,
  CottageOutlined,
  Menu as MenuIcon,
  ShoppingBagOutlined,
  TocOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  closeModal,
  getModal,
  toggleModal,
} from "../../features/commonInfo/commonInfoSlice";
import {
  fetchAsyncCategories,
  getCategories,
} from "../../features/commonInfo/commonInfoSlice";
import { fetchLogin, getLogin } from "../../features/userInfo/userInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const categories = useSelector(getCategories);
  const modal = useSelector(getModal);
  const login = useSelector(getLogin);
  const dispatch = useDispatch();
  const toggleDrawer = (e, open) => {
    if ((e.type === "keydown" && e.key === "Tab") || e.key === "Shift") {
      return;
    }
    setDrawer(open);
  };
  useEffect(() => {
    dispatch(fetchAsyncCategories());
    dispatch(fetchLogin());
  }, [dispatch]);
  return (
    // navbar
    <Box sx={{ display: "flex" }}>
      <AppBar position="sticky" component="nav" color="primary">
        <Toolbar sx={{ justifyContent: { xs: "space-between" } }}>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <Link to={"/home"} style={{ textDecoration: "none"}}>
              <Button key={"home"} sx={{ color: "#fff" }}>
                <CottageOutlined size="small"/>
                <Typography >
                  Home
                </Typography>
              </Button>
            </Link>
            <span style={{ position: "relative" }}>
              <Button
                aria-controls={openMenu && "categories menu"}
                onClick={(e) => setOpenMenu(e.currentTarget)}
                aria-haspopup="true"
                sx={{ color: "#fff" }}
              >
                <TocOutlined />
                Categories
              </Button>
              <Menu
                onClose={() => setOpenMenu(null)}
                open={Boolean(openMenu)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorEl={openMenu}
              >
                {categories.map((item) => {
                  return (
                    <MenuItem onClick={() => setOpenMenu(null)} key={item}>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#000",
                          width: "100%",
                          height: "100%",
                        }}
                        to={"/categories/" + item}
                      >
                        {item}
                      </Link>
                    </MenuItem>
                  );
                })}
              </Menu>
            </span>
          </Box>
          {/* drawer */}
          <IconButton
            onClick={() => setDrawer(true)}
            aria-label="open drawer"
            sx={{ mr: 2, display: { sm: "none" } }}
            edge="start"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawer}
            onClose={() => toggleDrawer(false)}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={(e) => toggleDrawer(e, false)}
              onKeyDown={(e) => toggleDrawer(e, false)}
            >
              <List>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/home"
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <CottageOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/categories"
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <TocOutlined />
                      </ListItemIcon>
                      <ListItemText primary="Categories" />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </Box>
          </Drawer>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "inline" },
              userSelect: "none",
              textAlign: "end",
            }}
          >
            MiniShop
          </Typography>
          {(login && (
            <Link to="/cart">
              <Button sx={{ color: "#fff" }}>
                <ShoppingBagOutlined
                  sx={{ justifySelf: "flex-end" }}
                  title="Cart"
                />
              </Button>
            </Link>
          )) || (
            <Button
              onClick={() => dispatch(toggleModal())}
              sx={{ color: "#fff" }}
            >
              <AccountCircleOutlined title="log in/sign in" />
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
