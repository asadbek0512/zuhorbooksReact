import React from "react";
import { Box, Container, Rating, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SLICE & SELECTOR **/
const newDishesRetriever = createSelector(
    retrieveNewDishes,
    (newDishes) => ({ newDishes })
);
export default function NewDishes() {
    const { newDishes } = useSelector(newDishesRetriever)

    console.log("newDishes:", newDishes);

    return (
        <div className="new-products-frame">
            <Container>
                <Stack className="main">
                    <Box className="category-title">New Books</Box>
                    <Stack className="cards-frame">
                        <CssVarsProvider>
                            {newDishes.length !== 0 ? (
                                newDishes.map((product, index) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    const sizeVolume =
                                        product.productCollection === ProductCollection.DRINK
                                            ? product.productVolume + "l"
                                            : product.productSize + "size";
                                    return (
                                        <Card
                                            key={product._id}
                                            variant="outlined"
                                            className="custom-card"
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
                                <Box className="no-data">New products are not available! </Box>
                            )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}