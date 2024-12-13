import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const HomeView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="home-content">
      <h1>Bienvenido a la página de inicio!</h1>
      <p>Esta es la vista principal después de iniciar sesión.</p>
    </div>
  );
};

export default HomeView;
