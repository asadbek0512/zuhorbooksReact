import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const FinishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

interface FinishedOrdersProps {
  page: number;
  setPage: (page: number) => void;
  hasMore: boolean;
}

export default function FinishedOrders(props: FinishedOrdersProps) {
  const { page, setPage, hasMore } = props;
  const { finishedOrders } = useSelector(FinishedOrdersRetriever);

  return (
    <TabPanel value={"3"}>
      <Stack gap={"14px"}>
        {finishedOrders?.map((order: Order) => (
          <Box key={order._id} className={"order-card"}>
            {/* Items */}
            <Box className={"order-items-list"}>
              {order?.orderItems?.map((item: OrderItem) => {
                const product: Product = order.productData.find(
                  (ele: Product) => item.productId === ele._id
                )!;
                return (
                  <Box key={item._id} className={"order-item-row"}>
                    <img
                      src={`${serverApi}/${product.productImages[0]}`}
                      className={"order-item-img"}
                      alt={product.productName}
                    />
                    <span className={"order-item-name"}>{product.productName}</span>
                    <span className={"order-item-price"}>
                      ${item.itemPrice} × {item.itemQuantity} ={" "}
                      <b>${item.itemPrice * item.itemQuantity}</b>
                    </span>
                  </Box>
                );
              })}
            </Box>

            {/* Footer */}
            <Box className={"order-card-footer"}>
              <Box className={"order-price-summary"}>
                <span>Subtotal: <b>${order.orderTotal - order.orderDelivery}</b></span>
                <span className={"order-separator"}>+</span>
                <span>Delivery: <b>${order.orderDelivery}</b></span>
                <span className={"order-separator"}>=</span>
                <span className={"order-total-text"}>Total: <b>${order.orderTotal}</b></span>
              </Box>
            </Box>
          </Box>
        ))}

        {(!finishedOrders || finishedOrders.length === 0) && (
          <Box display="flex" justifyContent="center">
            <img src={"/icons/noimage-list.svg"} style={{ width: 200, height: 200 }} />
          </Box>
        )}

        {finishedOrders && finishedOrders.length > 0 && (
          <Box className={"order-pagination"}>
            <button className={"pag-btn"} disabled={page === 1} onClick={() => setPage(page - 1)}>
              ‹ Prev
            </button>
            <span className={"pag-num"}>{page}</span>
            <button className={"pag-btn"} disabled={!hasMore} onClick={() => setPage(page + 1)}>
              Next ›
            </button>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
