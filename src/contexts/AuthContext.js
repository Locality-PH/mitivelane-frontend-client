import React, { useContext, useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import { AUTH_ORGANIZATION, ACCESS_TOKEN } from "redux/constants/Auth";
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";
import { message } from "antd";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();
  const [currentOrganization, setCurrentOrganization] = useState();
  const [currentPhoto, setCurrentPhoto] = useState();
  const ref = useRef(null);
  const welcome = useRef(null);
  const about = useRef(null);
  const campaign = useRef(null);
  const schedule = useRef(null);

  const [
    currentOrganizationMemberList,
    setCurrentOrganizationMemberList,
  ] = useState();
  const [authorization, setAuthorization] = useState();

  const [loading, setLoading] = useState(true);
  function setOrganization(organization) {
    return setCurrentOrganization(organization);
  }

  function setOrganizationMemberList(organization) {
    return setCurrentOrganizationMemberList(organization);
  }
  function setPhoto(photo) {
    return setCurrentPhoto(photo);
  }
  function checkUserOrganization() {
    const item = localStorage.getItem(AUTH_ORGANIZATION);
    if (item) {
      setCurrentOrganization(item);
    }
  }
  function authorizationConfig(token) {
    return setAuthorization({
      headers: {
        authorization: `Bearer ${token}`,
        "Strict-Transport-Security": "max-age=65540 ; includeSubDomains",
        "X-XSS-Protection": "1; mode=block",
        "Content-Security-Policy":
          " default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
      },
    });
  }
  function generateToken() {
    let response = jwt_decode(localStorage.getItem(ACCESS_TOKEN));
    let auth_organization = localStorage.getItem(AUTH_ORGANIZATION);

    const date = new Date().getTime() / 1000;
    const unix = Math.round(date);
    const data = {
      auth_id: response.auth_id,
      auth_organization: auth_organization,
      iat: unix,
      exp: unix + 100000,
    };

    const jwt = sign(data, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
    const header = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Strict-Transport-Security": "max-age=65540 ; includeSubDomains",
        "X-XSS-Protection": "1; mode=block",
        "Content-Security-Policy":
          " default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';",
      },
    };
    return [jwt, header];
  }
  async function resetEmailPassword(email) {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log(email);
        message.success(`email sent to ${email} successfully`);
      })
      .catch((error) => {
        console.log(error);
        message.warning(error.message);
      });
  }
  async function sendEmailVerification(email) {
    return firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        console.log("success");

        message.success(`Verification sent to ${email} successfully`);
      })
      .catch((error) => {
        console.log(error);
        message.warning(error.message);
      });
  }
  useEffect(() => {
    const listener = window.addEventListener("storage", checkUserOrganization);
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentuser(user);
      setLoading(false);
    });
    const combinedData = {
      listener,
      unsubscribe,
    };
    return () => [{ combinedData }];
  }, []);

  const value = {
    currentPhoto,
    setPhoto,
    currentOrganization,
    setOrganization,
    setOrganizationMemberList,
    currentUser,
    currentOrganizationMemberList,
    authorizationConfig,
    authorization,
    generateToken,
    resetEmailPassword,
    sendEmailVerification,
    ref,
    welcome,
    about,
    campaign,
    schedule,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
