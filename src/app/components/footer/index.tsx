import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
              <a href="#">
                <img src="/icons/facebook.svg" alt="Facebook" />
              </a>
              <a href="#">
                <img src="/icons/twitter.svg" alt="Twitter" />
              </a>
              <a href="#">
                <img src="/icons/instagram.svg" alt="Instagram" />
              </a>
              <a href="#">
                <img src="/icons/youtube.svg" alt="YouTube" />
              </a>
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
