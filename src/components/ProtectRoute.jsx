import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationStatus } from "@nhost/react";
import Spinner from "./Spinner";

const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectRoute;
