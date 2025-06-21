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
  height: 590px;
  display: flex;
  background-size: cover;
  background: #EDEBE4;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers >
      <Container   >
        <Stack flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <img className="rasim" src={"/icons/Zuhor1.png"} />
            </Box>
            <Box className={"foot-desc-txt"}>
              Zuhor Bookstore is your gateway to timeless knowledge and
              inspiration. Discover a curated collection of books that speak to
              your heart and mind.
            </Box>
            <Box className="sns-context" sx={{ display: 'flex', gap: '16px', mt: 2 }}>
              <FacebookIcon
                onClick={() => window.open("https://www.facebook.com", "_blank")}
                style={{ cursor: 'pointer' }}
              />
              <InstagramIcon
                onClick={() => window.open("https://www.instagram.com", "_blank")}
                style={{ cursor: 'pointer' }}
              />
              <TelegramIcon
                onClick={() => window.open("https://t.me/+mFPoMiYbzz01YzRi", "_blank")}
                style={{ cursor: 'pointer' }}
              />

              <YouTubeIcon
                onClick={() => window.open("https://www.youtube.com", "_blank")}
                style={{ cursor: 'pointer' }}
              />
            </Box>

          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Bo'limlar</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Seoul, South Korea</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+82 010 7777 7777</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>Zuhorbooks@gmail.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>Visit 24 hours</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright Zuhor Bookstore, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
