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
    // {
    //     image: '/img/tayson.jpg',
    //     quote: "'Suv kabi bo'l, suvdi piyolaga quysa piyola  bo'p qol, chaynikka quysa chaynik bo'p qol'",
    //     author: "O'zbek tayson"
    // },
    {
        image: '/img/james-clear.webp',
        quote: "Learn by asking what you don't know — if you don’t ask, you’ll remain ignorant.",
        author: "James Clear"
    },
    {
        image: "/img/Alisher.jpg",
        quote: "Learn by asking what you don't know — if you don’t ask, you’ll remain ignorant.",
        author: "Alisher Navoiy"
    },
    {
        image: "/img/Cholpon.jpeg",
        quote: "The most precious thing in the world is free thought, the ability to choose the right path. No one should follow the thoughts of others, but follow their own heart.",
        author: "Cho‘lpon"
    },
    {
        image: "/img/Abdulaziz77.jpg",
        quote: "A smooth sea never made a skilled sailor..",
        author: "Abdulaziz Ibrokhimov"
    }
    
];

export default function Iqtibos() {
    return (
        <div className="quote-section homepage">
            <Box className="quote-track-wrapper">
                <Box className="quote-track">
                    {[...quotes, ...quotes, ...quotes].map((item, index) => (
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
                </Box>
            </Box>
        </div>
    );
}