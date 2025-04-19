import React from "react";
import { Container, Stack, Box, Typography, Button, Rating } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import VisibilityIcon from "@mui/icons-material/Visibility";

const popularDishesRetriever = createSelector(
    retrievePopularDishes,
    (popularDishes) => ({ popularDishes })
);

export default function PopularDishes() {
    const { popularDishes } = useSelector(popularDishesRetriever);

    return (
        <div className="best-seller-section">
            <Container>
                {popularDishes.length !== 0 ? (
                    popularDishes.map((product: Product) => {
                        const imagePath = `${serverApi}/${product.productImages[0]}`;
                        return (
                            <Box key={product._id} className="best-seller-card">
                                <Box className="product-image">
                                    <img src={imagePath} alt={product.productName} />
                                </Box>
                                <Box className="product-info">
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
                                    <Button className="shop-btn">SHOP NOW</Button>
                                </Box>
                            </Box>
                        );
                    })
                ) : (
                    <Typography>No popular products available!</Typography>
                )}
            </Container>
        </div>
    );
}
