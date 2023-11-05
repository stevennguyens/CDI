import React, { useEffect, useState } from "react";
import diseaseImg from "../../images/disease.png";
import style from "./Home.module.scss"
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

export const Home = () => {
    const [scroll, setScroll] = useState(0);
    useEffect(() => {
        const onScroll = () => setScroll(window.scrollY / 7);
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    useEffect(() => {
        console.log(scroll)
    }, [scroll])
    return(
        <div className={style.homeDiv}>
            <section className={style.sectionOne}>
                <div className={style.info}>
                    <h1>Ready to collect and report chronic disease data that make a substantial impact to public health?</h1>
                
                    <Link to="/cdis">
                        <Button classBtn="blueBtn" text="Get started"/>
                    </Link>
                </div>
            </section>
            <section className={style.sectionTwo}>
                <div className={style.diseaseDivLeft}>
                    <img 
                        style={{
                            transform: `rotate(${-(scroll - 60)}deg)`
                        }} 
                        className={style.disease} src={diseaseImg}/>
                  
                    <img 
                        style={{
                            transform: `rotate(-${(scroll - 100)}deg)`
                        }} 
                        className={style.disease} src={diseaseImg}/>
                </div>

                <div>
                    <h2>Overview</h2>
                    <p>
                    The chronic disease indicators (CDI) are a set of surveillance indicators developed by consensus among CDC, the Council of State and Territorial Epidemiologists (CSTE), and the National Association of Chronic Disease Directors (NACDD). CDI enables public health professionals and policymakers to retrieve uniformly defined state-level data for chronic diseases and risk factors that have a substantial impact on public health. These indicators are essential for surveillance, prioritization, and evaluation of public health interventions.  Several of the current chronic disease indicators are available and reported on other websites, either by the data source/custodians or by categorical chronic disease programs. However, CDI is the only integrated source for comprehensive access to a wide range of indicators for the surveillance of chronic diseases, conditions, and risk factors at the state level.
                    <br/>
                    <br/>
                    The original CDI consisted of 73 indicators adopted in 1998 and amended in 2002.  In 2012-13, CDC, CSTE, and NACDD collaborated on a series of reviews that were informed by subject-matter expert opinion to make recommendations for updating CDI. The goal of this review was to ensure that CDI is responsive to the expanded scope and priorities of chronic disease prevention programs in state health departments.
                    <br/>
                    <br/>
                    As a result, CDI increased to 124 indicators in the following 18 topic groups: alcohol; arthritis; asthma; cancer; cardiovascular disease; chronic kidney disease; chronic obstructive pulmonary disease; diabetes; immunization; nutrition, physical activity, and weight status; oral health; tobacco; overarching conditions; and new topic areas that include disability, mental health, older adults, reproductive health, and school health. For the first time, CDI includes 22 indicators of systems and environmental change. A total of 201 individual measures are included for the 124 indicators, many of which overlap multiple chronic disease topic areas or are specific to a certain sex or age group.
                    <br/>
                    <br/>
                    CDI is an example of collaboration among CDC and state health departments in building a consensus set of state-based health surveillance indicators.  This update will help ensure that CDI remains the most relevant and current collection of chronic disease surveillance data for state epidemiologists, chronic disease program officials, and reproductive health and maternal and child health officials.  The standardized indicator definitions will also encourage consistency in chronic disease surveillance at the national, state, and local public health levels.
                    </p>
                </div>
                
                <div className={style.diseaseDivRight}>
                    <img 
                        style={{
                            transform: `rotate(${(scroll - 100)}deg)`
                        }} 
                        className={style.disease} src={diseaseImg}/>
                    <img 
                        style={{
                            transform: `rotate(-${(scroll - 60)}deg)`
                        }}
                        className={style.disease} src={diseaseImg}/>
                    <img 
                        style={{
                            transform: `rotate(${(scroll - 80)}deg)`
                        }} 
                        className={style.disease} src={diseaseImg}/>
                </div>
            </section>
            <section className={style.sectionEnd}>
                All information is provided by Centers for Disease Control and Prevention. Learn more&nbsp;<a target="_blank" href="https://www.cdc.gov/cdi/overview.html">here</a> 
            </section>
        </div>
    )
}