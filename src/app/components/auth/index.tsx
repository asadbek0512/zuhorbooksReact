import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Box,
  Fab,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MembertService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setAuthMember } = useGlobals();

  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest();
    }
  };

  const handleSignupRequest = async () => {
    try {
      if (!memberNick || !memberPhone || !memberPassword) throw new Error(Messages.error3);
      const signupInput: MemberInput = { memberNick, memberPhone, memberPassword };
      const result = await new MemberService().signup(signupInput);
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.error(err);
      handleSignupClose();
      sweetErrorHandling(err);
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (!memberNick || !memberPassword) throw new Error(Messages.error3);
      const loginInput: LoginInput = { memberNick, memberPassword };
      const result = await new MemberService().login(loginInput);
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.error(err);
      handleLoginClose();
      sweetErrorHandling(err);
    }
  };

  const inputStyles = {
    mb: 2,
    fontFamily: `'Segoe UI', 'Poppins', sans-serif`,
    '& .MuiInputLabel-root': {
      color: '#666',
      fontSize: '15px',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '18px',
      backgroundColor: '#f7f9fc',
      boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.05), inset -2px -2px 6px rgba(255,255,255,0.6)',
      '& fieldset': {
        borderColor: '#e0e0e0',
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: '#90caf9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#42a5f5',
        borderWidth: '2px',
      },
      '& input': {
        padding: '14px',
      },
    },
  };

  return (
    <div>
      {/* Signup Modal */}
      <Modal
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen}>
          <Box display="flex" width="850px" height="500px" borderRadius="20px" overflow="hidden">
            <Box width="50%">
              <ModalImg src="/img/photo1.jpg" alt="Signup visual" />
            </Box>
            <Box
              width="50%"
              bgcolor="#F3F2EC"
              p={5}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" fontWeight={600} mb={3} color="#333">
                Signup Form
              </Typography>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                onChange={handleUsername}
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                onChange={handlePhone}
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={memberPassword}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={{
                  mb: 2,
                  fontFamily: `'Segoe UI', 'Poppins', sans-serif`,
                  '& .MuiInputLabel-root': {
                    color: '#666',
                    fontSize: '15px',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '18px',
                    backgroundColor: '#f7f9fc',
                    boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.05), inset -2px -2px 6px rgba(255,255,255,0.6)',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#90caf9',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#42a5f5',
                      borderWidth: '2px',
                    },
                    '& input': {
                      padding: '14px',
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disableRipple
                        disableFocusRipple
                      >
                        <span style={{ fontSize: "20px", color: "#333" }}>
                          {showPassword ? '🙈' : '👁️'}
                        </span>
                      </IconButton>
                    </InputAdornment>

                  ),
                }}
              />
              <Fab
                variant="extended"
                sx={{
                  mt: 2,
                  width: "100%",
                  height: "50px", // balandlik
                  borderRadius: "14px",
                  background: "#909090", // yangi rang
                  color: "#fff",
                  fontSize: "16px", // matn hajmi
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  boxShadow: "0 6px 16px rgba(0, 102, 204, 0.4)", // kuchliroq soya
                  transition: "all 0.3s ease-in-out",
                  '&:hover': {
                    background: "#a5a4a4", // hover rangi
                    boxShadow: "0 8px 20px rgba(0, 102, 204, 0.5)",
                    transform: "translateY(-2px)",
                  }
                }}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} /> Signup
              </Fab>

            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Login Modal */}
      <Modal
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={loginOpen}>
          <Box display="flex" width="750px" height="450px" borderRadius="20px" overflow="hidden">
            <Box width="50%">
              <ModalImg src="/img/photo1.jpg" alt="Login visual" />
            </Box>
            <Box
              width="50%"
              bgcolor="#F3F2EC"
              p={5}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" fontWeight={600} mb={3} color="#333">
                Login Form
              </Typography>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                onChange={handleUsername}
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
                sx={inputStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disableRipple
                        disableFocusRipple
                      >
                        <span style={{ fontSize: "20px", color: "#333" }}>
                          {showPassword ? '🙈' : '👁️'}
                        </span>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
             <Fab
                variant="extended"
                sx={{
                  mt: 2,
                  width: "100%",
                  height: "50px", 
                  borderRadius: "14px",
                  background: "#909090", 
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  boxShadow: "0 6px 16px rgba(0, 102, 204, 0.4)", 
                  transition: "all 0.3s ease-in-out",
                  '&:hover': {
                    background: "#6f6f6f",
                    boxShadow: "0 8px 20px rgba(0, 102, 204, 0.5)",
                    transform: "translateY(-2px)",
                  }
                }}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} /> Login
              </Fab>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}