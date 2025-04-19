import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
    products,
}));

interface ProductsProps {
    onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productsRetriever);
    const [productSearch, setProductSearch] = useState<ProductInquiry>({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
    });
    const [searchText, setSearchText] = useState<string>("");
    const history = useHistory();

    useEffect(() => {
        const product = new ProductService();
        product
            .getProducts(productSearch)
            .then((data) => setProducts(data))
            .catch((err) => console.log(err));
    }, [productSearch]);

    useEffect(() => {
        if (searchText === "") {
            productSearch.search = "";
            setProductSearch({ ...productSearch })
        }
    }, [searchText]);

    /** HANDLERS **/

    const searchCollectionHandler = (collection: ProductCollection) => {
        productSearch.page = 1;
        productSearch.productCollection = collection;
        setProductSearch({ ...productSearch });
    };

    const searchOrderHandler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({ ...productSearch });
    };

    const searchProductHandler = () => {
        productSearch.search = searchText;
        setProductSearch({ ...productSearch })
    };

    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
        productSearch.page = value;
        setProductSearch({ ...productSearch })
    };

    const chooseDishHandler = (id: string) => {
        history.push(`/products/${id}`)
    };

    return (
        <div className={"products"}>
            <Container>
                <Stack flexDirection={"column"} alignItems={"centera"}>
                    <Stack className={"avatar-big-box"}>
                        <Stack className={"top-text"}>
                            <p>Burak Restaurant</p>
                            <Stack className={"single-search-big-box"}>
                                <input
                                    type={"search"}
                                    className={"single-search-input"}
                                    name={"singleResearch"}
                                    placeholder={"Type here"}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") searchProductHandler();
                                    }}
                                />
                                <Button
                                    className={"single-button-search"}
                                    variant="contained"
                                    endIcon={<SearchIcon />}
                                    onClick={searchProductHandler}
                                >
                                    Search
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                        <Stack className={"dishes-filter-box"}>
                            <Button
                                className={"order-filter"}
                                onClick={() => searchOrderHandler("createdAt")}
                            >
                                New
                            </Button>
                            <Button
                                className={"order-filter"}
                                onClick={() => searchOrderHandler("productPrice")}
                            >
                                Price
                            </Button>
                            <Button
                                className={"order-filter"}
                                onClick={() => searchOrderHandler("productViews")}
                            >
                                Views
                            </Button>
                        </Stack>
                    </Stack>



                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <Stack className={"product-category"}>
                                <div className={"category-main"}>
                                    <div
                                        className={`category-label-menu`}
                                    >
                                        Menu
                                    </div>
                                    <div
                                        className={`category-label ${productSearch.productCollection === ProductCollection.OTHER ? "active" : ""}`}
                                        onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
                                    >
                                        Badiiy kitoblar
                                    </div>
                                    <div
                                        className={`category-label ${productSearch.productCollection === ProductCollection.DESSERT ? "active" : ""}`}
                                        onClick={() => searchCollectionHandler(ProductCollection.DESSERT)}
                                    >
                                        Diniy
                                    </div>
                                    <div
                                        className={`category-label ${productSearch.productCollection === ProductCollection.DRINK ? "active" : ""}`}
                                        onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
                                    >
                                        Biznes va marketing
                                    </div>
                                    <div
                                        className={`category-label ${productSearch.productCollection === ProductCollection.SALAD ? "active" : ""}`}
                                        onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
                                    >
                                        Shaxsiy rivojlanish
                                    </div>
                                    <div
                                        className={`category-label ${productSearch.productCollection === ProductCollection.DISH ? "active" : ""}`}
                                        onClick={() => searchCollectionHandler(ProductCollection.DISH)}
                                    >
                                        Oila
                                    </div>
                                    {/* Yana davom ettirishing mumkin */}
                                </div>
                            </Stack>
                        </Stack>
                        <Stack className={"product-wrapper"}>
                            {products.length !== 0 ? (
                                products.map((product: Product) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    const sizeVolume =
                                        product.productCollection === ProductCollection.DRINK
                                            ? product.productVolume + " litre"
                                            : product.productSize + " size"
                                    return (
                                        <Stack
                                            key={product._id}
                                            className={"product-card"}
                                            onClick={() => chooseDishHandler(product._id)}
                                        >
                                            <Stack
                                                className={"product-img"}
                                                sx={{ backgroundImage: `url(${imagePath})` }}
                                            >
                                                <div className={"product-sale"}>{sizeVolume}</div>
                                                <Button className={"shop-btn"}
                                                    onClick={(e) => {
                                                        onAdd({
                                                            _id: product._id,
                                                            quantity: 1,
                                                            name: product.productName,
                                                            price: product.productPrice,
                                                            image: product.productImages[0],
                                                        })
                                                        e.stopPropagation();
                                                    }}>
                                                    <img
                                                        src={"/icons/shopping-cart.svg"}
                                                        style={{ display: "flex" }}
                                                    />
                                                </Button>
                                                <Button className={"view-btn"} sx={{ right: "36px" }}>
                                                    <Badge
                                                        badgeContent={product.productViews}
                                                        color="secondary"
                                                    >
                                                        <RemoveRedEyeIcon
                                                            sx={{
                                                                color:
                                                                    product.productViews === 0 ? "gray" : "white",
                                                            }}
                                                        />
                                                    </Badge>
                                                </Button>
                                            </Stack>
                                            <Box className={"product-desc"}>
                                                <span className={"product-title"}>
                                                    {product.productName}
                                                </span>
                                                <div className={"product-desc"}>
                                                    <MonetizationOnIcon />
                                                    {product.productPrice}
                                                </div>
                                            </Box>
                                        </Stack>
                                    );
                                })
                            ) : (
                                <Box className="no-data">Products are not available!</Box>
                            )}
                        </Stack>
                    </Stack>

                    <Stack className={"pagination-section"}>
                        <Pagination
                            count={
                                products.length !== 0
                                    ? productSearch.page + 1
                                    : productSearch.page
                            }
                            page={productSearch.page}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }}
                                    {...item}
                                    color={"secondary"}
                                />
                            )}
                            onChange={paginationHandler}
                        />
                    </Stack>
                </Stack>
            </Container>


        </div>
    );
}