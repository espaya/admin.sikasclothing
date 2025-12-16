import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SingleOrderAllItems from "../components/order_details/SingleOrderAllItems";
import SingleOrderCartDetails from "../components/order_details/SingleOrderCartDetails";
import SingleOrderSummary from "../components/order_details/SingleOrderSummary";
import getSingleOrder from "../controllers/GetSingleOrder";
import SingleOrderOptions from "../components/order_details/SingleOrderOptions";
import { Link } from "react-router-dom";
import { PATHS } from "../router";

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
      <div className="body">
        <div id="wrapper">
          <div id="page" className="">
            <div className="layout-wrap">
              <Sidebar />
              <div className="section-content-right">
                <Header />
                <div className="main-content">
                  <div className="main-content-inner">
                    <div className="main-content-wrap">
                      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                        <h3>Order #{order_number}</h3>
                        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <Link to={PATHS.ADMIN}>
                              <div className="text-tiny">Dashboard</div>
                            </Link>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <Link to={PATHS.ORDERLIST}>
                              <div className="text-tiny">Order</div>
                            </Link>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <a href="#">
                              <div className="text-tiny">Order detail</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">Order #{order_number}</div>
                          </li>
                        </ul>
                      </div>
                      <div className="wg-order-detail">
                        <div className="left flex-grow">
                          <div className="wg-box mb-20">
                            <SingleOrderAllItems items={orders.items} />
                          </div>
                          <div className="wg-box">
                            <SingleOrderCartDetails details={orders} />
                          </div>
                          <div className="wg-box mb-20" style={{marginTop: "20px"}}>
                            <SingleOrderOptions order={orders} />
                          </div>
                        </div>

                        <SingleOrderSummary
                          summary={orders}
                          order_number={order_number}
                        />
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
