import React from "react";
import { Box, Container, Rating, Stack, useMediaQuery } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";

const newDishesRetriever = createSelector(
    retrieveNewDishes,
    (newDishes) => ({ newDishes })
);

export default function NewDishes() {
    const { newDishes } = useSelector(newDishesRetriever);
    const isMobile = useMediaQuery("(max-width: 900px)");
    const isSmall  = useMediaQuery("(max-width: 480px)");

    const cardWidth = isSmall ? "100%" : isMobile ? "calc(50% - 8px)" : "290px";

    return (
        <div className="new-products-frame">
            <Container>
                <Stack className="main">
                    <Box className="category-title">New Books</Box>
                    {isMobile ? (
                        <Swiper
                            className="cards-frame"
                            slidesPerView={2}
                            spaceBetween={15}
                            style={{ width: "100%", padding: "10px 15px" }}
                        >
                            {newDishes.length !== 0 ? (
                                newDishes.map((product, index) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    return (
                                        <SwiperSlide key={product._id}>
                                            <CssVarsProvider>
                                                <Card
                                                    variant="plain"
                                                    style={{ 
                                                        width: "100%", 
                                                        height: "250px", 
                                                        margin: 0, 
                                                        padding: 0,
                                                        backgroundColor: "#F3F2EC",
                                                        borderRadius: "12px",
                                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                                        overflow: "hidden",
                                                        border: "1px solid #d4bc9f"
                                                    }}
                                                >
                                                    <Box style={{ height: "160px", padding: "10px", backgroundColor: "#fff", display: "flex", justifyContent: "center" }}>
                                                        <AspectRatio ratio="3/4" sx={{ width: "100%" }}>
                                                            <img 
                                                                src={imagePath} 
                                                                style={{ 
                                                                    objectFit: "contain", 
                                                                    borderRadius: "6px" 
                                                                }} 
                                                            />
                                                        </AspectRatio>
                                                    </Box>
                                                    <Stack sx={{ p: "10px", flex: 1, justifyContent: "space-between", backgroundColor: "#EDEBE4" }}>
                                                        <Typography sx={{ 
                                                            fontSize: "13px !important",
                                                            fontWeight: "700",
                                                            color: "#111",
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            lineHeight: "1.2"
                                                        }}>
                                                            {product.productName}
                                                        </Typography>
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                            <Typography sx={{ fontSize: "14px !important", fontWeight: "800", color: "#2e7d32" }}>
                                                                ${product.productPrice}
                                                            </Typography>
                                                            <Box sx={{ display: "flex", alignItems: "center", color: "#666", fontSize: "10px" }}>
                                                                <VisibilityIcon sx={{ fontSize: 12, mr: "2px" }} />
                                                                {product.productViews}
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                </Card>
                                            </CssVarsProvider>
                                        </SwiperSlide>
                                    );
                                })
                            ) : (
                                <Box className="no-data">New products are not available!</Box>
                            )}
                        </Swiper>
                    ) : (
                        <Stack
                            className="cards-frame"
                            style={isMobile ? {
                                flexWrap: "wrap",
                                justifyContent: "center",
                                gap: "12px",
                            } : undefined}
                        >
                            <CssVarsProvider>
                                {newDishes.length !== 0 ? (
                                    newDishes.map((product, index) => {
                                        const imagePath = `${serverApi}/${product.productImages[0]}`;
                                        return (
                                            <Card
                                                key={product._id}
                                                variant="outlined"
                                                className="custom-card"
                                                style={{ width: cardWidth, minWidth: 0 }}
                                            >
                                                <CardOverflow className="custom-img-wrapper">
                                                    <AspectRatio ratio="1">
                                                        <img src={imagePath} />
                                                    </AspectRatio>
                                                </CardOverflow>
                                                <CardOverflow variant="soft" className="custom-card-info">
                                                    <Stack className="info">
                                                        <Typography className="title">
                                                            {product.productName}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack className="viewsva">
                                                        <Typography className="price">
                                                            ${product.productPrice}
                                                        </Typography>
                                                        <Typography className="views">
                                                            <VisibilityIcon sx={{ fontSize: 20, marginLeft: "5px", marginRight: "5px" }} />
                                                            {product.productViews} views
                                                        </Typography>
                                                    </Stack>
                                                </CardOverflow>
                                            </Card>
                                        );
                                    })
                                ) : (
                                    <Box className="no-data">New products are not available!</Box>
                                )}
                            </CssVarsProvider>
                        </Stack>
                    )}
                </Stack>
            </Container>
        </div>
    );
}
