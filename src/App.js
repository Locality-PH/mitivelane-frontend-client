import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views";
import { Route, Switch } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEME_CONFIG } from "./configs/AppConfig";
import { AuthProvider } from "./contexts/AuthContext";
import "assets/css/clientside.css";

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Provider store={store}>
          <ThemeSwitcherProvider
            themeMap={themes}
            defaultTheme={THEME_CONFIG.currentTheme}
            insertionPoint="styles-insertion-point"
          >
            <Router>
              <Switch>
                <Route path="/" component={Views} />
              </Switch>
            </Router>
          </ThemeSwitcherProvider>
        </Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
