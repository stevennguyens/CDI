import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export const Layout = (props) => {
    return (
      <div>
        <NavMenu />
        <div className="layout">
          {props.children}
        </div>
      </div>
    );

}
