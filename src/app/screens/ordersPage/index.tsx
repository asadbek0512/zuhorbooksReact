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
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err))

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err))

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err))
  }, [orderInquiry, orderBuilder]);

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
              <TelegramIcon onClick={() => window.open("https://t.me/+mFPoMiYbzz01YzRi", "_blank")}
              />
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
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>


   


      </Container>
    </div>
  )
}