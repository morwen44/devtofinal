import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserInfo } from "@/utils/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const userInfo = await getUserInfo();
      setUser(userInfo?.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, fetchUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};