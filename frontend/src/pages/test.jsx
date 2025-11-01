import React from "react";
import "./Test.css";

export default function Test() {
  return (
    <div className="login-wrapper">
      <div className="login-background"></div>

      <div className="login-container">
        <div className="login-header">
          <h1>Connectez-vous à votre compte</h1>
        </div>

        <form method="POST" action="https://top-stream.net/login" style={{borderColor: localStorage.getItem("Title-Colors")}} className="login-form">
          <input type="hidden" name="_token" value="6vbxjJSW2fNQBci1wLMMqip0hjO7WimeYP6woLat" autoComplete="off" />

          <div className="form-group">
            <label htmlFor="email" style={{float:"left"}}>E-mail</label>
            <input type="email" id="email" name="email" required autoFocus autoComplete="username" placeholder="E-mail" />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Mot de passe</label>
              <a href="https://top-stream.net/forgot-password" className="forgot-link">
                Mot de passe oublié ?
              </a>
            </div>
            <input type="password" id="password" name="password" required autoComplete="current-password" placeholder="Mot de passe" />
          </div>

          <input id="remember_me" type="hidden" name="remember" />

          <button type="submit" className="btn-submit">
            S'identifier
          </button>
        </form>

        <div className="signup-text">
          <span>Vous n'avez pas encore de compte ? </span>
          <a href="https://top-stream.net/register">Créer un compte</a>
        </div>
      </div>
    </div>
  );
}
