import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import { useState } from "react";
// import { SET_USER } from "./user";
import { auth } from "./firebase";

function Header() {
  // const [{ basket }, dispatch] = useStateValue();
  const basket = useSelector((state) => state.item.basket);
  const user = useSelector((state) => state.user.userdata);
  const [currentUser, setCurrentUser] = useState("");
  const handleAuthentication = () => {
    if (user?._delegate.email) {
      auth.signOut();
      setCurrentUser(null);
      console.log(currentUser);
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png"
          alt=""
        />
      </Link>
      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to={!user?._delegate.email && "/login"}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionLineOne">
              Hello {user?._delegate.email ? user?._delegate.email : "Guest"}
            </span>
            <span className="header_optionLineTwo">
              {user?._delegate.email ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingCartIcon />
            <span className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
