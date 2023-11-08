import React, { Component } from 'react';
import style from './NavMenu.module.scss';
import { Link } from 'react-router-dom';
import diseaseImg from "../images/disease.png";

export const NavMenu = () => {
    return (
      <header>
        <Link className={style.title} to="/">
          <h6>Chronic Disease Indicators</h6>
          <img src={diseaseImg} className={style.disease}/>
        </Link>
        
        <Link to="/cdis">
          <p>Data</p>
        </Link>
      </header>
    );
}
