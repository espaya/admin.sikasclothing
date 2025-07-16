import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function BannedCustomers() {
  return (
    <>
      <div className="body">
        <div id="wrapper">
          <div id="page" className="">
            <div className="layout-wrap">
              <Sidebar></Sidebar>
              <div className="section-content-right">
                <Header></Header>
                <div className="main-content">
                  <div className="main-content-inner">
                    <div className="main-content-wrap">
                      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
                        <h3>All Banned Customers</h3>
                        <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
                          <li>
                            <a href="index.html">
                              <div className="text-tiny">Dashboard</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <a href="#">
                              <div className="text-tiny">Banned Customers</div>
                            </a>
                          </li>
                          <li>
                            <i className="icon-chevron-right"></i>
                          </li>
                          <li>
                            <div className="text-tiny">Banned Customers</div>
                          </li>
                        </ul>
                      </div>
                      <div className="wg-box">
                        <div className="flex items-center justify-between gap10 flex-wrap">
                          <div className="wg-filter flex-grow">
                            <form className="form-search">
                              <fieldset className="name">
                                <input
                                  type="text"
                                  placeholder="Search here..."
                                  className=""
                                  name="name"
                                  tabindex="2"
                                  value=""
                                  aria-required="true"
                                  required=""
                                />
                              </fieldset>
                              <div className="button-submit">
                                <button className="" type="submit">
                                  <i className="icon-search"></i>
                                </button>
                              </div>
                            </form>
                          </div>
                          <a
                            className="tf-button style-1 w208"
                            href="add-new-user.html"
                          >
                            <i className="icon-plus"></i>Add new
                          </a>
                        </div>
                        <div className="wg-table table-all-user">
                          <ul className="table-title flex gap20 mb-14">
                            <li>
                              <div className="body-title">User</div>
                            </li>
                            <li>
                              <div className="body-title">Phone</div>
                            </li>
                            <li>
                              <div className="body-title">Email</div>
                            </li>
                            <li>
                              <div className="body-title">Action</div>
                            </li>
                          </ul>
                          <ul className="flex flex-column">
                            <li className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-6.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Product name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i className="icon-trash-2"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-7.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Product name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i className="icon-trash-2"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-8.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Product name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i className="icon-trash-2"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-9.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Product name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i className="icon-trash-2"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-10.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Product name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i className="icon-trash-2"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-11.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Product name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i className="icon-trash-2"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-12.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Product name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i className="icon-trash-2"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-13.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Product name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i className="icon-trash-2"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-14.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Product name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i className="icon-trash-2"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="user-item gap14">
                              <div className="image">
                                <img
                                  src="/assets/images/avatar/user-15.png"
                                  alt=""
                                />
                              </div>
                              <div className="flex items-center justify-between gap20 flex-grow">
                                <div className="name">
                                  <a href="#" className="body-title-2">
                                    Kristin Watson
                                  </a>
                                  <div className="text-tiny mt-3">
                                    Product name
                                  </div>
                                </div>
                                <div className="body-text">$1,452.500</div>
                                <div className="body-text">1,638</div>
                                <div className="list-icon-function">
                                  <div className="item eye">
                                    <i className="icon-eye"></i>
                                  </div>
                                  <div className="item edit">
                                    <i className="icon-edit-3"></i>
                                  </div>
                                  <div className="item trash">
                                    <i className="icon-trash-2"></i>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="divider"></div>
                        <div className="flex items-center justify-between flex-wrap gap10">
                          <div className="text-tiny">Showing 10 entries</div>
                          <ul className="wg-pagination">
                            <li>
                              <a href="#">
                                <i className="icon-chevron-left"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">1</a>
                            </li>
                            <li className="active">
                              <a href="#">2</a>
                            </li>
                            <li>
                              <a href="#">3</a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icon-chevron-right"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Footer></Footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
