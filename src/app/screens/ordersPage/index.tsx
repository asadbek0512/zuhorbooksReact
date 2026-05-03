import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css"
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const LIMIT = 4;

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");

  const [pausedPage, setPausedPage] = useState(1);
  const [processPage, setProcessPage] = useState(1);
  const [finishedPage, setFinishedPage] = useState(1);

  const [pausedHasMore, setPausedHasMore] = useState(false);
  const [processHasMore, setProcessHasMore] = useState(false);
  const [finishedHasMore, setFinishedHasMore] = useState(false);

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ page: pausedPage, limit: LIMIT, orderStatus: OrderStatus.PAUSE })
      .then((data) => {
        setPausedOrders(data);
        setPausedHasMore(data.length === LIMIT);
      })
      .catch((err) => console.log(err));
  }, [pausedPage, orderBuilder]);

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ page: processPage, limit: LIMIT, orderStatus: OrderStatus.PROCESS })
      .then((data) => {
        setProcessOrders(data);
        setProcessHasMore(data.length === LIMIT);
      })
      .catch((err) => console.log(err));
  }, [processPage, orderBuilder]);

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ page: finishedPage, limit: LIMIT, orderStatus: OrderStatus.FINISH })
      .then((data) => {
        setFinishedOrders(data);
        setFinishedHasMore(data.length === LIMIT);
      })
      .catch((err) => console.log(err));
  }, [finishedPage, orderBuilder]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  }

  if (!authMember) history.push("/");
  return (
    <div className={"order-page"}>
      <Container className={"order-container"}>
        <Stack className={"order-right"}>
          <Box className={"profile-header"}>
            <div className={"profile-img-container"}>
              <img
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"
                }
                alt="User Avatar"
                className="profile-avatar"
              />
            </div>
            <div className="profile-details">
              <span className="profile-name">{authMember?.memberNick}</span>
              <span className="profile-type">{authMember?.memberType}</span>
            </div>
          </Box>

          <Box className={"profile-info"}>
            <div className="profile-address">
              <LocationOnIcon />
              <span>
                {authMember?.memberAddress ? authMember.memberAddress : "No address available"}
              </span>
            </div>
          </Box>

          <Box className={"profile-social-links"}>
            <div className="social-icons">
              <YouTubeIcon onClick={() => window.open("https://youtube.com", "_blank")} />
              <InstagramIcon onClick={() => window.open("https://instagram.com", "_blank")} />
              <FacebookIcon onClick={() => window.open("https://facebook.com", "_blank")} />
              <TelegramIcon onClick={() => window.open("https://t.me/+mFPoMiYbzz01YzRi", "_blank")} />
            </div>
          </Box>
        </Stack>

        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                >
                  <Tab label="PAUSED" value={"1"} />
                  <Tab label="PROCESS" value={"2"} />
                  <Tab label="FINISHED" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders
                setValue={setValue}
                page={pausedPage}
                setPage={setPausedPage}
                hasMore={pausedHasMore}
              />
              <ProcessOrders
                setValue={setValue}
                page={processPage}
                setPage={setProcessPage}
                hasMore={processHasMore}
              />
              <FinishedOrders
                page={finishedPage}
                setPage={setFinishedPage}
                hasMore={finishedHasMore}
              />
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  )
}
