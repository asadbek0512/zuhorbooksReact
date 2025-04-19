import React from "react";
import { Box, Container, Stack, Avatar, Typography } from "@mui/material";

const quotes = [
    {
        image: '/img/shayx-muhammad-sodiq.jpg',
        quote: "The highest level of faith is the complete purity of the heart and remembering Allah in every action.",
        author: "Shaykh Muhammad Sadiq Muhammad Yusuf"
    },
    {
        image: '/img/images.jpeg',
        quote: "Don't let your sadness blind you from all the blessings in your life.",
        author: "Mufti Menk"
    },
    {
        image: '/img/dale-carnegie.png',
        quote: "Success is getting what you want. Happiness is wanting what you get.",
        author: "Dale Carnegie"
    },
];

export default function Iqtibos() {
    return (
        <div className="quote-section homepage">
            <Container>
                <Stack className="info-iqtibo" direction="row" spacing={4}>
                    {quotes.map((item, index) => (
                        <Stack className="quote-item" direction="row" spacing={2} alignItems="flex-start" key={index}>
                            <Avatar
                                className="quote-avatar"
                                alt={item.author}
                                src={item.image}
                            />
                            <Box className="quote-box">
                                <Typography className="quote-text">
                                    “{item.quote}”
                                </Typography>
                                <Typography className="quote-author">
                                    — {item.author}
                                </Typography>
                            </Box>
                        </Stack>
                    ))}
                </Stack>
            </Container>
        </div>
    );
}
