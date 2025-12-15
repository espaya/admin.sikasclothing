import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SingleOrderAllItems from "../components/order_details/SingleOrderAllItems";
import SingleOrderCartDetails from "../components/order_details/SingleOrderCartDetails";
import SingleOrderSummary from "../components/order_details/SingleOrderSummary";
import { useEffect, useState } from "react";
import getSingleOrder from "../controllers/GetSingleOrder";

export default function OrderDetail() {
  const { order_number } = useParams();
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getSingleOrder(apiBase, setLoading, setErrors, setOrders, order_number);
  }, []);

  return (
    <>
      <title>Order Details - Sika's Clothing</title>
      <meta name="author" content="themesflat.com" />
      <div class="body">
        <div id="wrapper">
          <div id="page" class="">
            <div class="layout-wrap">
              <Sidebar />
              <div class="section-content-right">
                <Header />
                <div class="main-content">
                  <div class="main-content-inner">
                    <div class="main-content-wrap">
                      <div class="flex items-center flex-wrap justify-between gap20 mb-27">
                        <h3>Order #{order_number}</h3>
                        <ul class="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <a href="index.html">
                              <div class="text-tiny">Dashboard</div>
                            </a>
                          </li>
                          <li>
                            <i class="icon-chevron-right"></i>
                          </li>
                          <li>
                            <a href="#">
                              <div class="text-tiny">Order</div>
                            </a>
                          </li>
                          <li>
                            <i class="icon-chevron-right"></i>
                          </li>
                          <li>
                            <a href="#">
                              <div class="text-tiny">Order detail</div>
                            </a>
                          </li>
                          <li>
                            <i class="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div class="text-tiny">Order #{order_number}</div>
                          </li>
                        </ul>
                      </div>
                      <div class="wg-order-detail">
                        <div class="left flex-grow">
                          <div class="wg-box mb-20">
                            <SingleOrderAllItems items={orders.items} />
                          </div>
                          <div class="wg-box">
                            <SingleOrderCartDetails details={orders} />
                          </div>
                        </div>
                        <SingleOrderSummary summary={orders} order_number={order_number} />
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
