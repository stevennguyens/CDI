import React, { useEffect, useState } from "react";
import diseaseImg from "../../images/disease.png";
import style from "./Home.module.scss"
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import { IndicatorCard } from "../IndicatorCard/IndicatorCard";
import { categoryOptions } from "../../data/options";

/*
    Home page
*/
export const Home = () => {
    return(
        <div className={style.homeDiv}>
            <section className={style.sectionOne}>
                <div className={style.info}>
                    <h1>Ready to collect and report chronic disease data and impact our public health?</h1>
                
                    <Link to="/cdis">
                        <Button classBtn="blueBtn" text="Get started"/>
                    </Link>
                </div>
            </section>
            <section className={style.sectionTwo}>
                <div className={style.diseaseDivLeft}>
                    <img className={style.disease} src={diseaseImg}/>
                    <img className={style.disease} src={diseaseImg}/>
                    <img className={style.disease} src={diseaseImg}/>
                </div>

                <div className={style.info}>
                    <h2>What are chronic disease indicators?</h2>
                    <p>Chronic disease indicators are a set of surveillance indicators developed by consensus among the Centers for Disease Control and Prevention (CDC), the Council of State and Territorial Epidemiologists (CSTE), and the National Association of Chronic Disease Directors (NACDD). CDI enables public health professionals and policymakers to retrieve uniformly defined state-level data for chronic diseases and risk factors that have a substantial impact on public health. These indicators are essential for surveillance, prioritization, and evaluation of public health interventions.  Several of the current chronic disease indicators are available and reported on other websites, either by the data source/custodians or by categorical chronic disease programs. However, CDI is the only integrated source for comprehensive access to a wide range of indicators for the surveillance of chronic diseases, conditions, and risk factors at the state level.</p>
                </div>
                
                <div className={style.diseaseDivRight}>
                    <img className={style.disease} src={diseaseImg}/>
                    <img className={style.disease} src={diseaseImg}/>
                    <img className={style.disease} src={diseaseImg}/>
                    <img className={style.disease} src={diseaseImg}/>
                </div>
            </section>
            <section className={style.sectionThree}>
                <h2>Learn more about chronic disease indicators</h2>
                <div className={style.indicatorDiv}>
                    {categoryOptions.map((i) => {
                        return <IndicatorCard text={i.label}/>
                        })}
                </div>
            </section>
            <section className={style.sectionEnd}>
                All information is provided by Centers for Disease Control and Prevention&nbsp;<a target="_blank" href="https://www.cdc.gov/cdi/overview.html">here</a> 
            </section>
        </div>
    )
}