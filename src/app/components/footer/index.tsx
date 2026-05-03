import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footers = styled.div`
  width: 100%;
  height: auto;
  min-height: 590px;
  display: flex;
  background-size: cover;
  background: #EDEBE4;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack
          flexDirection={{ xs: "column", md: "row" }}
          sx={{ mt: { xs: "40px", md: "94px" }, pb: { xs: "40px", md: "0" } }}
        >
          <Stack
            flexDirection={"column"}
            sx={{ width: { xs: "100%", md: "340px" } }}
          >
            <Box>
              <img className="rasim" src={"/icons/Zuhor1.png"} />
            </Box>
            <Box className={"foot-desc-txt"}>
              Zuhor Bookstore is your gateway to timeless knowledge and
              inspiration. Discover a curated collection of books that speak to
              your heart and mind.
            </Box>
            <Box
              className="sns-context"
              sx={{ display: "flex", justifyContent: "space-between", mt: 2, width: "160px" }}
            >
              <FacebookIcon
                onClick={() => window.open("https://www.facebook.com", "_blank")}
                style={{ cursor: "pointer", fontSize: 20 }}
              />
              <InstagramIcon
                onClick={() =>
                  window.open("https://www.instagram.com", "_blank")
                }
                style={{ cursor: "pointer", fontSize: 20 }}
              />
              <TelegramIcon
                onClick={() =>
                  window.open("https://t.me/+mFPoMiYbzz01YzRi", "_blank")
                }
                style={{ cursor: "pointer", fontSize: 20 }}
              />
              <YouTubeIcon
                onClick={() => window.open("https://www.youtube.com", "_blank")}
                style={{ cursor: "pointer", fontSize: 20 }}
              />
            </Box>
          </Stack>

          <Stack
            sx={{ ml: { xs: 0, md: "288px" }, mt: { xs: "32px", md: 0 } }}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={{ xs: "100%", md: "auto" }}
          >
            <Stack>
              <Box>
                <Box className={"foot-category-title"} sx={{ fontSize: "16px" }}>Bo'limlar</Box>
                <Box className={"foot-category-link"} sx={{ fontSize: "12px" }}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: { xs: "20px", sm: "100px" } }}>
              <Box>
                <Box className={"foot-category-title"} sx={{ fontSize: "16px" }}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px", fontSize: "12px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Seoul, Korea</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+82 10 7777</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>Zuhor@gmail.com</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: { xs: "32px", md: "80px" } }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright Zuhor Bookstore, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
