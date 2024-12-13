import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import "./styles.css";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

const LoginFormView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      setErrorMessage("");
      const { token } = response;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
        </div>
        <div>
          <Button type="submit">Entrar</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginFormView;
