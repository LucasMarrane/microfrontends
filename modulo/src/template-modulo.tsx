import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

/**
 * Para montar o app em um ponto especifico do layout, necessário informar o parametro domElementGetter,
 * onde é feita a busca no DOM do elemento especifico onde será montado a aplicação, necessário para elementos
 * que serão montados dentro de outros layouts
 */
const lifecycles = singleSpaReact({
  React,
  ReactDOM: ReactDOMClient as any,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
  domElementGetter: ()=> {
   let root = document.getElementById('root');

    if(!root){
      root = document.createElement('div')
      root.setAttribute('id', 'root')
      document.body.appendChild(root)
    }

    return root
  }
});

export const { bootstrap, mount, unmount } = lifecycles;
