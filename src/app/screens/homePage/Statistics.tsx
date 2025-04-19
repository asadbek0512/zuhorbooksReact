import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
    return (
        <div className={"static-frame"}>
            <Container>
                <Stack className="info">
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
            </Container>
        </div>
    );
}
