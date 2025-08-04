import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="header-dashboard">
      <div className="wrap">
        <div className="header-left">
          <a href="index.html">
            <img
              className=""
              id="logo_header_mobile"
              alt=""
              src="/assets/images/logo/logo.png"
              data-light="/assets/images/logo/logo.png"
              data-dark="/assets/images/logo/logo-dark.png"
              data-width="154px"
              data-height="52px"
              data-retina="/assets/images/logo/logo@2x.png"
            ></img>
          </a>
          <div className="button-show-hide">
            <i className="icon-menu-left"></i>
          </div>
        </div>
        <div className="header-grid">
          <div className="header-item country">
            <select className="image-select no-text">
              <option data-thumbnail="/assets/images/country/1.png">ENG</option>
              <option data-thumbnail="/assets/images/country/9.png">VIE</option>
            </select>
          </div>
          <div className="header-item button-dark-light">
            <i className="icon-moon"></i>
          </div>
          <div className="popup-wrap noti type-header">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="header-item">
                  <span className="text-tiny">1</span>
                  <i className="icon-bell"></i>
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end has-content"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <h6>Message</h6>
                </li>
                <li>
                  <div className="noti-item w-full wg-user active">
                    <div className="image">
                      <img src="/assets/images/avatar/user-11.png" alt=""></img>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <a href="#" className="body-title">
                          Cameron Williamson
                        </a>
                        <div className="time">10:13 PM</div>
                      </div>
                      <div className="text-tiny">Hello?</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="noti-item w-full wg-user active">
                    <div className="image">
                      <img src="/assets/images/avatar/user-12.png" alt=""></img>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <a href="#" className="body-title">
                          Ralph Edwards
                        </a>
                        <div className="time">10:13 PM</div>
                      </div>
                      <div className="text-tiny">
                        Are you there? interested i this...
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="noti-item w-full wg-user active">
                    <div className="image">
                      <img src="/assets/images/avatar/user-13.png" alt=""></img>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <a href="#" className="body-title">
                          Eleanor Pena
                        </a>
                        <div className="time">10:13 PM</div>
                      </div>
                      <div className="text-tiny">Interested in this loads?</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="noti-item w-full wg-user active">
                    <div className="image">
                      <img src="/assets/images/avatar/user-11.png" alt=""></img>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <a href="#" className="body-title">
                          Jane Cooper
                        </a>
                        <div className="time">10:13 PM</div>
                      </div>
                      <div className="text-tiny">Okay...Do we have a deal?</div>
                    </div>
                  </div>
                </li>
                <li>
                  <a href="#" className="tf-button w-full">
                    View all
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="popup-wrap message type-header">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="header-item">
                  <span className="text-tiny">1</span>
                  <i className="icon-message-square"></i>
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end has-content"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <h6>Notifications</h6>
                </li>
                <li>
                  <div className="message-item item-1">
                    <div className="image">
                      <i className="icon-noti-1"></i>
                    </div>
                    <div>
                      <div className="body-title-2">Discount available</div>
                      <div className="text-tiny">
                        Morbi sapien massa, ultricies at rhoncus at, ullamcorper
                        nec diam
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="message-item item-2">
                    <div className="image">
                      <i className="icon-noti-2"></i>
                    </div>
                    <div>
                      <div className="body-title-2">
                        Account has been verified
                      </div>
                      <div className="text-tiny">
                        Mauris libero ex, iaculis vitae rhoncus et
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="message-item item-3">
                    <div className="image">
                      <i className="icon-noti-3"></i>
                    </div>
                    <div>
                      <div className="body-title-2">
                        Order shipped successfully
                      </div>
                      <div className="text-tiny">
                        Integer aliquam eros nec sollicitudin sollicitudin
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="message-item item-4">
                    <div className="image">
                      <i className="icon-noti-4"></i>
                    </div>
                    <div>
                      <div className="body-title-2">
                        Order pending: <span>ID 305830</span>
                      </div>
                      <div className="text-tiny">
                        Ultricies at rhoncus at ullamcorper
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <a href="#" className="tf-button w-full">
                    View all
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-item button-zoom-maximize">
            <div className="">
              <i className="icon-maximize"></i>
            </div>
          </div>
          <div className="popup-wrap apps type-header">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton4"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="header-item">
                  <i className="icon-grid"></i>
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end has-content"
                aria-labelledby="dropdownMenuButton4"
              >
                <li>
                  <h6>Related apps</h6>
                </li>
                <li>
                  <ul className="list-apps">
                    <li className="item">
                      <div className="image">
                        <img src="/assets/images/apps/item-1.png" alt=""></img>
                      </div>
                      <a href="#">
                        <div className="text-tiny">Photoshop</div>
                      </a>
                    </li>
                    <li className="item">
                      <div className="image">
                        <img src="/assets/images/apps/item-2.png" alt=""></img>
                      </div>
                      <a href="#">
                        <div className="text-tiny">illustrator</div>
                      </a>
                    </li>
                    <li className="item">
                      <div className="image">
                        <img src="/assets/images/apps/item-3.png" alt=""></img>
                      </div>
                      <a href="#">
                        <div className="text-tiny">Sheets</div>
                      </a>
                    </li>
                    <li className="item">
                      <div className="image">
                        <img src="/assets/images/apps/item-4.png" alt=""></img>
                      </div>
                      <a href="#">
                        <div className="text-tiny">Gmail</div>
                      </a>
                    </li>
                    <li className="item">
                      <div className="image">
                        <img src="/assets/images/apps/item-5.png" alt=""></img>
                      </div>
                      <a href="#">
                        <div className="text-tiny">Messenger</div>
                      </a>
                    </li>
                    <li className="item">
                      <div className="image">
                        <img src="/assets/images/apps/item-6.png" alt=""></img>
                      </div>
                      <a href="#">
                        <div className="text-tiny">Youtube</div>
                      </a>
                    </li>
                    <li className="item">
                      <div className="image">
                        <img src="/assets/images/apps/item-7.png" alt=""></img>
                      </div>
                      <a href="#">
                        <div className="text-tiny">Flaticon</div>
                      </a>
                    </li>
                    <li className="item">
                      <div className="image">
                        <img src="/assets/images/apps/item-8.png" alt=""></img>
                      </div>
                      <a href="#">
                        <div className="text-tiny">Instagram</div>
                      </a>
                    </li>
                    <li className="item">
                      <div className="image">
                        <img src="/assets/images/apps/item-9.png" alt=""></img>
                      </div>
                      <a href="#">
                        <div className="text-tiny">PDF</div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#" className="tf-button w-full">
                    View all app
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="popup-wrap user type-header">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="header-user wg-user">
                  <span className="image">
                    <img src="/assets/images/avatar/user-1.png" alt=""></img>
                  </span>
                  <span className="flex flex-column">
                    <span className="body-title mb-2"> {user.name} </span>
                    <span className="text-tiny"> {user.role} </span>
                  </span>
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end has-content"
                aria-labelledby="dropdownMenuButton3"
              >
                <li>
                  <a href="#" className="user-item">
                    <div className="icon">
                      <i className="icon-user"></i>
                    </div>
                    <div className="body-title-2">Account</div>
                  </a>
                </li>
                <li>
                  <a href="#" className="user-item">
                    <div className="icon">
                      <i className="icon-mail"></i>
                    </div>
                    <div className="body-title-2">Inbox</div>
                    <div className="number">27</div>
                  </a>
                </li>
                <li>
                  <a href="#" className="user-item">
                    <div className="icon">
                      <i className="icon-file-text"></i>
                    </div>
                    <div className="body-title-2">Taskboard</div>
                  </a>
                </li>
                <li>
                  <a href="/sc-dashboard/settings" className="user-item">
                    <div className="icon">
                      <i className="icon-settings"></i>
                    </div>
                    <div className="body-title-2">Setting</div>
                  </a>
                </li>
                <li>
                  <a href="#" className="user-item">
                    <div className="icon">
                      <i className="icon-headphones"></i>
                    </div>
                    <div className="body-title-2">Support</div>
                  </a>
                </li>
                <li>
                  <a href="login.html" className="user-item">
                    <div className="icon">
                      <i className="icon-log-out"></i>
                    </div>
                    <div className="body-title-2">Log out</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
