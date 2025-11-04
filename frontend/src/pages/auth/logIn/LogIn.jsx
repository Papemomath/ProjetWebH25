import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../auth.css";

export default function Login() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => { setUser({ ...user, [e.target.name]: e.target.value }); };

    const showError = (msg) => {
        setErrorMsg(msg);
        setTimeout(() => setErrorMsg(""), 2000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            showError("Veuillez remplir tous les champs !");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/login", user);

            if (response.data && response.data.token) {
                sessionStorage.setItem("userToken", response.data.token);
                navigate("/ProjetWebH25/");
            } else {
                showError("Identifiants incorrects, réessayez.");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data?.error) {
                showError(error.response.data.error);
            } else {
                showError("Le serveur rencontre un problème. Réessayez plus tard.");
            }
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-background"></div>

            <div className="login-container">
                <div className="login-header">
                    <h1>Connectez-vous à votre compte</h1>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="login-form"
                    style={{ borderColor: localStorage.getItem("Title-Colors") }}
                >
                    <div className="form-group">
                        <label htmlFor="email" style={{ float: "left" }}>E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            autoFocus
                            autoComplete="username"
                            placeholder="E-mail"
                        />
                    </div>

                    <div className="form-group">
                        <div className="label-row">
                            <label htmlFor="password">Mot de passe</label>
                            <Link to="/ProjetWebH25/register" className="forgot-link">Mot de passe oublié ?</Link>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                            placeholder="Mot de passe"
                        />
                    </div>

                    {/* Affichage des erreurs */}
                    {errorMsg && <p className="error">{errorMsg}</p>}

                    <input id="remember_me" type="hidden" name="remember" />

                    <button type="submit" className="btn-submit">S'identifier</button>
                </form>

                <div className="signup-text">
                    <span>Vous n'avez pas encore de compte ? </span>
                    <Link to="/ProjetWebH25/register">Créer un compte</Link>
                </div>
            </div>
        </div>
    );
}
