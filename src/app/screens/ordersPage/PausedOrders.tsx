import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { T } from "../../../lib/types/common";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
  page: number;
  setPage: (page: number) => void;
  hasMore: boolean;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue, page, setPage, hasMore } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.DELELTE };
      if (window.confirm("Do you want to delete the order?")) {
        await new OrderService().updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = { orderId, orderStatus: OrderStatus.PROCESS };
      if (window.confirm("Do you want to proceed with payment?")) {
        await new OrderService().updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack gap={"14px"}>
        {pausedOrders?.map((order: Order) => (
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
              <Box className={"order-card-buttons"}>
                <Button
                  value={order._id}
                  variant="contained"
                  className={"order-btn-cancel"}
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  variant="contained"
                  className={"order-btn-pay"}
                  onClick={processOrderHandler}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          </Box>
        ))}

        {(!pausedOrders || pausedOrders.length === 0) && (
          <Box display="flex" justifyContent="center">
            <img src={"/icons/noimage-list.svg"} style={{ width: 200, height: 200 }} />
          </Box>
        )}

        {pausedOrders && pausedOrders.length > 0 && (
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
