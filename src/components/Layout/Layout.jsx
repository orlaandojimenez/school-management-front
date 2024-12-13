import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./styles.css";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="layout-container">
      <nav className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li
            onClick={() => handleNavigation("/home")}
            style={{ cursor: "pointer" }}
          >
            Inicio
          </li>
          <li
            onClick={() => handleNavigation("/subjects")}
            style={{ cursor: "pointer" }}
          >
            Materias
          </li>
          <li
            onClick={() => handleNavigation("/grades")}
            style={{ cursor: "pointer" }}
          >
            Grados
          </li>
          <li
            onClick={() => handleNavigation("/students")}
            style={{ cursor: "pointer" }}
          >
            Alumnos
          </li>
          <li
            onClick={handleLogout}
            style={{ cursor: "pointer", color: "red" }}
          >
            Cerrar sesión
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
