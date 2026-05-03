import React from "react";
import { Box, Container, Stack, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Statistics() {
    const isMobile = useMediaQuery("(max-width: 900px)");

    return (
        <div className={"static-frame"} style={isMobile ? { height: "auto", padding: "24px 0" } : undefined}>
            <Container>
                {isMobile ? (
                    <Swiper slidesPerView={3.5} spaceBetween={10} style={{ width: "100%" }}>
                        <SwiperSlide>
                            <Stack className="static-box" alignItems="center" justifyContent="center" style={{ width: "100%", height: "auto" }}>
                                <Box className="static-num">
                                    <img src="/icons/1.png" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
                                </Box>
                            </Stack>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Stack className="static-box" alignItems="center" justifyContent="center" style={{ width: "100%", height: "auto" }}>
                                <Box className="static-num">
                                    <img src="/icons/21.png" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
                                </Box>
                                <Box className="static-text" style={{ fontSize: "10px", textAlign: "center", width: "100%" }}>BOOKSTORE</Box>
                            </Stack>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Stack className="static-box" alignItems="center" justifyContent="center" style={{ width: "100%", height: "auto" }}>
                                <Box className="static-num">
                                    <img src="/icons/71.png" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
                                </Box>
                                <Box className="static-text" style={{ fontSize: "10px", textAlign: "center", width: "100%" }}>Bookdoor</Box>
                            </Stack>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Stack className="static-box" alignItems="center" justifyContent="center" style={{ width: "100%", height: "auto" }}>
                                <Box className="static-num">
                                    <img src="/icons/54.png" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
                                </Box>
                                <Box className="static-text" style={{ fontSize: "10px", textAlign: "center", width: "100%" }}>LIBRARY</Box>
                            </Stack>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Stack className="static-box" alignItems="center" justifyContent="center" style={{ width: "100%", height: "auto" }}>
                                <Box className="static-num">
                                    <img src="/icons/61.png" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
                                </Box>
                                <Box className="static-text" style={{ fontSize: "10px", textAlign: "center", width: "100%" }}>FLAPRISE</Box>
                            </Stack>
                        </SwiperSlide>
                    </Swiper>
                ) : (
                    <Stack
                        className="info"
                    >
                        <Stack className="static-box">
                            <Box className="static-num">
                                <img src="/icons/1.png" alt="" />
                            </Box>
                        </Stack>
                        <Stack className="static-box">
                            <Box className="static-num">
                                <img src="/icons/21.png" alt="" />
                            </Box>
                            <Box className="static-text">BOOKSTORE</Box>
                        </Stack>
                        <Stack className="static-box">
                            <Box className="static-num">
                                <img src="/icons/71.png" alt="" />
                            </Box>
                            <Box className="static-text">Bookdoor</Box>
                        </Stack>
                        <Stack className="static-box">
                            <Box className="static-num">
                                <img src="/icons/54.png" alt="" />
                            </Box>
                            <Box className="static-text">LIBRARY</Box>
                        </Stack>
                        <Stack className="static-box">
                            <Box className="static-num">
                                <img src="/icons/61.png" alt="" />
                            </Box>
                            <Box className="static-text">FLAPRISE</Box>
                        </Stack>
                    </Stack>
                )}
            </Container>
        </div>
    );
}
