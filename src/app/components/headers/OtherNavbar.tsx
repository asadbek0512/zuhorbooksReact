import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Basket from "./Basket";
import React, { useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setLoginOpen,
    setSignupOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const logoutMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={Boolean(anchorEl)}
      onClose={handleCloseLogout}
      onClick={handleCloseLogout}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleLogoutRequest}>
        <ListItemIcon>
          <Logout fontSize="small" style={{ color: "blue" }} />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <div className="other-navbar">
      <Container className="navbar-container">
        {isMobile ? (
          <>
            {/* ===== MOBILE NAV BAR ===== */}
            <Stack className="mobile-bar">
              <NavLink to="/">
                <img className="brand-logo-mobile" src="/icons/Zuhor1.png" />
              </NavLink>
              <Stack direction="row" alignItems="center" gap={1}>
                <Basket
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  onDeleteAll={onDeleteAll}
                />
                <IconButton
                  className="burger-btn"
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Stack>
            </Stack>

            {/* ===== MOBILE DRAWER ===== */}
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{ sx: { width: 260, background: "#F3F2EC" } }}
            >
              {/* Close button */}
              <Box className="drawer-header">
                <IconButton onClick={() => setDrawerOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />

              {/* ---- USER BLOCK (tepa) ---- */}
              <Box sx={{ px: 2, py: 1.5 }}>
                {!authMember ? (
                  <Stack direction="row" gap={1}>
                    <Button
                      variant="outlined" size="small" fullWidth
                      onClick={() => { setLoginOpen(true); setDrawerOpen(false); }}
                      sx={{ borderColor: "#cdcdcd", color: "#353535", fontSize: "12px", textTransform: "none" }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained" size="small" fullWidth
                      onClick={() => { setSignupOpen(true); setDrawerOpen(false); }}
                      sx={{ background: "#cdcdcd", color: "#353535", fontSize: "12px", textTransform: "none" }}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <NavLink to="/member-page" onClick={() => setDrawerOpen(false)}>
                      <img
                        className="drawer-avatar"
                        src={authMember.memberImage ? `${serverApi}/${authMember.memberImage}` : "/icons/default-user.svg"}
                      />
                    </NavLink>
                    <NavLink to="/member-page" onClick={() => setDrawerOpen(false)} style={{ flex: 1, textDecoration: "none" }}>
                      <Box style={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 600, color: "#222" }}>
                        {authMember.memberNick}
                      </Box>
                      {authMember.memberPhone && (
                        <Box style={{ fontFamily: "Poppins", fontSize: "11px", color: "#888", marginTop: "1px" }}>
                          {authMember.memberPhone}
                        </Box>
                      )}
                    </NavLink>
                    <IconButton size="small" onClick={() => setLogoutConfirm(true)}>
                      <Logout fontSize="small" />
                    </IconButton>
                  </Stack>
                )}
              </Box>
              <Divider />

              {/* ---- NAV LINKS ---- */}
              <List>
                <ListItem onClick={() => setDrawerOpen(false)}>
                  <NavLink to="/" className="drawer-link" activeClassName="drawer-link-active" exact>Home</NavLink>
                </ListItem>
                <ListItem onClick={() => setDrawerOpen(false)}>
                  <NavLink to="/products" className="drawer-link" activeClassName="drawer-link-active">Products</NavLink>
                </ListItem>
                {authMember && (
                  <ListItem onClick={() => setDrawerOpen(false)}>
                    <NavLink to="/orders" className="drawer-link" activeClassName="drawer-link-active">Orders</NavLink>
                  </ListItem>
                )}
                {authMember && (
                  <ListItem onClick={() => setDrawerOpen(false)}>
                    <NavLink to="/member-page" className="drawer-link" activeClassName="drawer-link-active">My Page</NavLink>
                  </ListItem>
                )}
                <ListItem onClick={() => setDrawerOpen(false)}>
                  <NavLink to="/help" className="drawer-link" activeClassName="drawer-link-active">Help</NavLink>
                </ListItem>
              </List>
              <Divider />

              {/* ---- SOCIAL ICONS ---- */}
              <Box sx={{ px: 2, py: 1 }}>
                <Swiper slidesPerView={4} spaceBetween={10} style={{ width: "100%", padding: "8px 0" }}>
                  <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
                    <IconButton size="small" onClick={() => window.open("https://www.facebook.com", "_blank")}>
                      <FacebookIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </SwiperSlide>
                  <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
                    <IconButton size="small" onClick={() => window.open("https://www.instagram.com", "_blank")}>
                      <InstagramIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </SwiperSlide>
                  <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
                    <IconButton size="small" onClick={() => window.open("https://t.me/+mFPoMiYbzz01YzRi", "_blank")}>
                      <TelegramIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </SwiperSlide>
                  <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
                    <IconButton size="small" onClick={() => window.open("https://www.youtube.com", "_blank")}>
                      <YouTubeIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </SwiperSlide>
                </Swiper>
              </Box>
            </Drawer>

            {/* ---- Logout tasdiqlash dialogi ---- */}
            <Dialog open={logoutConfirm} onClose={() => setLogoutConfirm(false)}>
              <DialogTitle sx={{ fontFamily: "Poppins", fontWeight: 600 }}>Log Out</DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ fontFamily: "Poppins" }}>
                  Are you sure you want to log out?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setLogoutConfirm(false)} sx={{ fontFamily: "Poppins", color: "#888" }}>
                  Cancel
                </Button>
                <Button
                  onClick={() => { setLogoutConfirm(false); setDrawerOpen(false); handleLogoutRequest(); }}
                  variant="contained"
                  sx={{ fontFamily: "Poppins", background: "#828282" }}
                >
                  Log Out
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          /* ===== DESKTOP NAV BAR ===== */
          <Stack className="menu1">
            <Stack className="menu">
              <Box>
                <NavLink to="/">
                  <img className="brand-logo" src="/icons/Zuhor1.png" />
                </NavLink>
              </Box>
              <Stack className="links">
                <Box className={"hover-line"}>
                  <NavLink to="/" activeClassName={"underline"}>
                    Home
                  </NavLink>
                </Box>
                <Box className={"hover-line"}>
                  <NavLink to="/products" activeClassName={"underline"}>
                    Products
                  </NavLink>
                </Box>
                {authMember ? (
                  <Box className={"hover-line"}>
                    <NavLink to="/orders" activeClassName={"underline"}>
                      Orders
                    </NavLink>
                  </Box>
                ) : null}
                {authMember ? (
                  <Box className={"hover-line"}>
                    <NavLink to="/member-page" activeClassName={"underline"}>
                      My Page
                    </NavLink>
                  </Box>
                ) : null}
                <Box className={"hover-line"}>
                  <NavLink to="/help" activeClassName={"underline"}>
                    Help
                  </NavLink>
                </Box>
                <Basket
                  cartItems={cartItems}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  onDeleteAll={onDeleteAll}
                />
                {!authMember ? (
                  <Box>
                    <Button
                      variant="contained"
                      className="login-button"
                      onClick={() => setLoginOpen(true)}
                    >
                      Login
                    </Button>
                  </Box>
                ) : (
                  <img
                    className="user-avatar"
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember?.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    aria-haspopup={"true"}
                    onClick={handleLogoutClick}
                  />
                )}
                {logoutMenu}
              </Stack>
            </Stack>
          </Stack>
        )}
      </Container>
    </div>
  );
}
