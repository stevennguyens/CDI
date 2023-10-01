import React, { Component } from 'react';
import './NavMenu.module.scss';
import { Link } from 'react-router-dom';

export const NavMenu = () => {
    return (
      <header>
        <Link to="/">
          <h6>Chronic Disease Indicators</h6>
        </Link>
      </header>
    );
}
