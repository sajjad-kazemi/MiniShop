import {
  AccountCircleOutlined,
  CottageOutlined,
  ExitToAppOutlined,
  Menu as MenuIcon,
  ShoppingBagOutlined,
  TocOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Badge,
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
  fetchAccounts,
  fetchLogin,
  getLogin,
  logout,
  getCurrentUser,
  getCartItems,
} from "../../features/userInfo/userInfoSlice";
import {
  fetchAsyncCategories,
  getCategories,
} from "../../features/commonInfo/commonInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Login from "../Login/Login";
import { openModal } from "../../features/commonInfo/commonInfoSlice";

function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const categories = useSelector(getCategories);
  const cartItems = useSelector(getCartItems);
  const login = useSelector(getLogin);
  const currentUser = useSelector(getCurrentUser);
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
    dispatch(fetchAccounts());
  }, []);
  return (
    // navbar
    <>
      <Box sx={{ display: "flex", position: "sticky", top: 0, zIndex: 10 }}>
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
              <Link to={"/home"} style={{ textDecoration: "none" }}>
                <Button key={"home"} sx={{ color: "#fff" }}>
                  <CottageOutlined size="small" />
                  <Typography>Home</Typography>
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
                  open={!!openMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  anchorEl={openMenu}
                >
                  {categories &&
                    categories.map((item) => {
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
              <MenuIcon sx={{ zIndex: 10 }} />
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
            {/* login / cart */}
            {login && (
              <Link to="/cart">
                <Button title="Cart" sx={{ color: "#fff" }}>
                  <Badge color="info" badgeContent={cartItems}>
                    <ShoppingBagOutlined sx={{ justifySelf: "flex-end" }} />
                  </Badge>
                </Button>
              </Link>
            )}
            {!login && (
              <Button
                title="log in/sign in"
                onClick={() => dispatch(openModal())}
                sx={{ color: "#fff" }}
              >
                <AccountCircleOutlined />
              </Button>
            )}
            {/* logout */}
            {login && (
              <IconButton
                title="Log out"
                onClick={() => dispatch(logout(currentUser))}
                sx={{ color: "#fff" }}
              >
                <ExitToAppOutlined />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Login isLogin={login} />
    </>
  );
}

export default Header;
