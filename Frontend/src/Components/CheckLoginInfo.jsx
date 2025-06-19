import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, currentUser } from "../utils/constants";
import { useUser } from "../utils/UserContext";

const CheckLoginInfo = ({ setIsAuthenticated }) => {
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("userInfo");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/validate-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status >= 200 && response.status < 300) {
          const { email } = response.data.User;
          currentUser = email;
          setCurrentUser(email);
          console.log("currentUser: ", currentUser);
        }

        // Token is valid
        setIsAuthenticated(true);
        if (location.pathname === "/" || location.pathname === "/login") {
          navigate("/home");
        }
      } catch (error) {
        console.error("Invalid token:", error.response?.data || error.message);
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    checkToken();
  }, []);

  return null;
};

export default CheckLoginInfo;
