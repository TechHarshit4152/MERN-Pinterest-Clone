import { createContext, useState, useEffect } from "react";
import API from "../api/axios"; // ✅ import your axios instance

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile from backend (only once when app starts)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile"); // Protected route
        if (res.data.success) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user)); // keep in sync
        }
      } catch (err) {
        console.log("Profile fetch error:", err);
        // if token expired, refresh flow will run automatically via interceptor
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(); // 🧠 verify and sync user on app start
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Watch for localStorage changes (sync across tabs)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "user") {
        const newUser = event.newValue ? JSON.parse(event.newValue) : null;
        setUser(newUser);
      }
      if (event.key === "token" && !event.newValue) {
        // token removed => user logged out
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ (Optional) Refresh profile if tab regains focus
  useEffect(() => {
    const handleFocus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        API.get("/profile")
          .then((res) => {
            if (res.data.success) {
              setUser(res.data.user);
              localStorage.setItem("user", JSON.stringify(res.data.user));
            }
          })
          .catch(() => {}); // ignore errors silently
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  if (loading) return null; // or add a small loading spinner later

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
