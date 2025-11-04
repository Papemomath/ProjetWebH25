import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../auth.css";

export default function Register() {
    const [user, setUser] = useState({ nom: "", username: "", email: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const showError = (msg) => {
        setErrorMsg(msg);
        setTimeout(() => setErrorMsg(""), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.nom || !user.username || !user.email || !user.password) {
            showError("Veuillez remplir tous les champs !");
            return;
        }

        if (user.password.length < 5 || user.password.length > 16) {
            showError("Le mot de passe doit contenir entre 5 et 16 caractères !");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/register", user);

            if (response.data && response.data.token) {
                sessionStorage.setItem("userToken", response.data.token);
                navigate("/ProjetWebH25/");
            } else {
                showError("Impossible de créer le compte. Vérifiez vos informations.");
            }
        } catch (error) {
            console.error(error);

            if (error.response?.data?.error) {
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
                    <h1>Créer un compte</h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                    style={{ borderColor: localStorage.getItem("Title-Colors") }}
                >
                    <div className="form-group">
                        <label htmlFor="nom" style={{ float: "left" }}>Nom</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={user.nom}
                            onChange={handleChange}
                            required
                            autoFocus
                            placeholder="Nom"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username" style={{ float: "left" }}>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            required
                            autoFocus
                            placeholder="Username"
                        />
                    </div>

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
                            placeholder="E-mail"
                        />
                    </div>

                    <div className="form-group">
                        <div className="label-row">
                            <label htmlFor="password">Mot de passe</label>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            min={5}
                            max={16}
                            required
                            placeholder="Mot de passe"
                        />
                    </div>

                    {/* Affichage des erreurs */}
                    {errorMsg && <p className="error">{errorMsg}</p>}

                    <input id="remember_me" type="hidden" name="remember" />

                    <button type="submit" className="btn-submit">S'inscrire</button>
                </form>

                <div className="signup-text">
                    <span>Vous n'avez pas encore de compte ? </span>
                    <Link to="/ProjetWebH25/login">S'identifier</Link>
                </div>
            </div>
        </div>
    );
}
