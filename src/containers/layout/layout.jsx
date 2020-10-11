import React from 'react';
import Header from '../../components/header/header';
import './layout.scss';
const Layout = (props) => {
  return (
  <div className="layout">
      <Header onChange={(e) => console.log(e)}/>
      <div className="layout-wrapper">{props.children}</div>
    </div>
  );
};
export default Layout;
