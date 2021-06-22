import './App.css';
import { FadingBackground} from './App.style';
import React from "react";
import 'antd/dist/antd.css';
import  { ModalProvider } from "styled-react-modal";
import {
  Switch,
  Route
} from "react-router-dom";
import RootComponent from "./components/Home/index";
import QuestionFormListing from "./components/FormLists/index";
import FormFilling from "./components/FormDetails/index";
function App() {

  return (
    <>
      <ModalProvider backgroundComponent={FadingBackground}>
        <Switch>
            <Route path="/" exact={true} component={RootComponent} />
            <Route path="/formlist" exact={true} component={QuestionFormListing} />
            <Route path="/formlist/:id" exact={true} component={FormFilling} />
        </Switch>
      </ModalProvider>
    </>
  );
}

export default App;
