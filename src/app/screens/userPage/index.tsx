import { Box, Button, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LogoutIcon from "@mui/icons-material/Logout";
import { Settings } from "./Settings";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/userPage.css";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import MemberService from "../../services/MembertService";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../../../lib/sweetAlert";

export default function UserPage() {
  const history = useHistory();
  const { authMember, setAuthMember } = useGlobals();

  const handleLogout = async () => {
    try {
      await new MemberService().logout();
      await sweetTopSuccessAlert("Logged out", 700);
      setAuthMember(null);
      history.push("/");
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  if (!authMember) history.push("/");
  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <Stack className={"my-page-left"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box className={"menu-name"}></Box>
              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <div className={"order-user-img"}>
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    className={"order-user-avatar"}
                  />
                  <div className={"order-user-icon-box"}>
                    <img
                      src={
                        authMember?.memberType === MemberType.RESTAURANT
                          ? "/icons/restaurant.svg"
                          : "/icons/user-badge.svg"
                      }
                    />
                  </div>
                </div>
                <span className={"order-user-name"}>{authMember?.memberNick}</span>
                <span className={"order-user-prof"}>{authMember?.memberType}</span>
                <span className={"order-user-prof"}>
                  {authMember?.memberAddress ? authMember.memberAddress : "no address"}
                </span>
              </Box>

              <Box className={"user-media-box"}>
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon
                  onClick={() => window.open("https://t.me/+mFPoMiYbzz01YzRi", "_blank")}
                  style={{ cursor: "pointer" }}
                />
                <YouTubeIcon />
              </Box>

              <p className={"user-desc"}>
                {authMember?.memberDesc ? authMember.memberDesc : "no description"}
              </p>

              <Button
                variant="contained"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                className={"user-logout-btn"}
              >
                Logout
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
