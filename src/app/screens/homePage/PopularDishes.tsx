import React from "react";
import { Container, Stack, Box, Typography, Button, Rating, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useHistory } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const popularDishesRetriever = createSelector(
    retrievePopularDishes,
    (popularDishes) => ({ popularDishes })
);

export default function PopularDishes() {
    const { popularDishes } = useSelector(popularDishesRetriever);
    const history = useHistory();
    const isMobile = useMediaQuery("(max-width: 900px)");

    const chooseDishHandler = (id: string) => {
        history.push(`/products/${id}`);
    };

    return (
        <div className="best-seller-section">
            <Container>
                {popularDishes.length !== 0 ? (
                    isMobile ? (
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            style={{ width: "100%" }}
                        >
                            {popularDishes.map((product: Product) => {
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                return (
                                    <SwiperSlide key={product._id}>
                                        <Box className="best-seller-card" style={{ padding: "20px", backgroundColor: "#F3F2EC", border: "1px solid #d4bc9f", borderRadius: "20px" }}>
                                            {/* 1. Header Centered */}
                                            <Typography sx={{ 
                                                fontSize: "24px", 
                                                fontWeight: "600", 
                                                color: "#333", 
                                                textAlign: "center",
                                                width: "100%",
                                                mb: 2,
                                                fontFamily: "Dancing Script"
                                            }}>
                                                Popular Book
                                            </Typography>

                                            {/* 2. Row: Info Left, Image Right */}
                                            <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "100%", mb: 2 }}>
                                                {/* Middle Column: Product Details */}
                                                <Stack sx={{ width: "50%" }} spacing={0.5}>
                                                    <Typography sx={{ fontSize: "16px", fontWeight: "700", color: "#000", lineHeight: "1.2" }}>
                                                        {product.productName}
                                                    </Typography>
                                                    <Typography sx={{ 
                                                        fontSize: "11px", 
                                                        color: "#555",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        mb: 0.5
                                                    }}>
                                                        {product.productDesc}
                                                    </Typography>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <Rating value={5} readOnly size="small" />
                                                    </Box>
                                                    <Typography sx={{ fontSize: "22px", fontWeight: "800", color: "#2e7d32" }}>
                                                        ${product.productPrice}
                                                    </Typography>
                                                    <Typography 
                                                        onClick={() => chooseDishHandler(product._id)}
                                                        sx={{ fontSize: "14px", fontWeight: "600", color: "#d49909", cursor: "pointer", textDecoration: "underline" }}
                                                    >
                                                        Shop now
                                                    </Typography>
                                                    <Box sx={{ display: "flex", alignItems: "center", color: "#666", fontSize: "12px" }}>
                                                        {product.productViews} <VisibilityIcon sx={{ fontSize: 14, ml: 0.5 }} />
                                                    </Box>
                                                </Stack>

                                                {/* Right Column: Large Image */}
                                                <Box sx={{ width: "50%", display: "flex", justifyContent: "center" }}>
                                                    <img
                                                        src={imagePath}
                                                        alt={product.productName}
                                                        style={{ width: "100%", height: "auto", maxHeight: "280px", objectFit: "contain" }}
                                                    />
                                                </Box>
                                            </Stack>

                                            {/* 3. Shop Button Bottom Centered */}
                                            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => chooseDishHandler(product._id)}
                                                    sx={{
                                                        backgroundColor: "#d49909",
                                                        color: "#fff",
                                                        width: "180px",
                                                        height: "46px",
                                                        fontSize: "16px",
                                                        fontWeight: "700",
                                                        borderRadius: "10px",
                                                        textTransform: "uppercase",
                                                        "&:hover": { backgroundColor: "#b38107" }
                                                    }}
                                                >
                                                    SHOP
                                                </Button>
                                            </Box>
                                        </Box>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    ) : (
                        popularDishes.map((product: Product) => {
                            const imagePath = `${serverApi}/${product.productImages[0]}`;
                            return (
                                <Box
                                    key={product._id}
                                    className="best-seller-card"
                                >
                                    <Stack width="100%">
                                        <Stack direction="row" alignItems="center">
                                            <Box
                                                className="product-image"
                                            >
                                                <img
                                                    src={imagePath}
                                                    alt={product.productName}
                                                />
                                            </Box>
                                            <Box
                                                className="product-info"
                                            >
                                                <Typography className="section-title">Popular Book</Typography>
                                                <Typography className="product-name">{product.productName}</Typography>
                                                <Typography className="product-desc">{product.productDesc}</Typography>
                                                <Box className="price-box">
                                                    <Typography className="new-price">${product.productPrice}</Typography>
                                                </Box>
                                                <Box className="rating-box">
                                                    <Rating name="read-only" value={5} precision={5} readOnly size="small" />
                                                    <Typography className="rating-text">5</Typography>
                                                </Box>
                                                <Typography className="views-text">
                                                    {product.productViews} views <VisibilityIcon className="view-Name" />
                                                </Typography>
                                                <Button
                                                    className="shop-btn"
                                                    onClick={() => chooseDishHandler(product._id)}
                                                >Shop now</Button>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Box>
                            );
                        })
                    )
                ) : (
                    <Typography>No popular products available!</Typography>
                )}
            </Container>
        </div>
    );
}
