import React, { useEffect, useState } from "react";
import style from './Form.module.scss';
import { useNavigate } from "react-router-dom";
import Select, { MultiValue, SingleValue } from "react-select";
import { sortOptions, locationOptions, genderOptions, raceOptions, categoryOptions, indicatorOptions, yearOptions, dataTypeOptions } from "../../data/options";
import { Button } from "../Button/Button";
import { Options } from "../../types/OptionType";
import { Input } from "../Input/NumericInput/Input";
import { getCdi } from "../../data/cdi";
import { Cdi } from "../../types/CdiType";

export const Form = ({title, btnText, setSearchParams, handleBack, cdiId}: {title: string, btnText:string, setSearchParams?: any, handleBack?: () => void, cdiId?: string}) => {
    const [minYearOptions, setMinYearOptions] = useState<Options[]>(yearOptions);
    const [maxYearOptions, setMaxYearOptions] = useState<Options[]>(yearOptions);
    const [isClearable, setIsClearable] = useState(true);
    const [error, setError] = useState("");

    const [location, setLocation] = useState<any>();
    const [locationError, setLocationError] = useState<String>("");

    const [minYear, setMinYear] = useState<any>();
    const [minYearError, setMinYearError] = useState<String>("");

    const [maxYear, setMaxYear] = useState<any>();
    const [maxYearError, setMaxYearError] = useState<String>("");

    const [category, setCategory] = useState<any>();
    const [categoryError, setCategoryError] = useState<String>("");

    const [indicator, setIndicator] = useState<any>();
    const [indicatorError, setIndicatorError] = useState<String>("");

    const [dataValue, setDataValue] = useState<number>();
    const [dataType, setDataType] = useState<any>();
    
    const [gender, setGender] = useState<any>();
    const [race, setRace] = useState<any>();

    const [cdi, setCdi] = useState<Cdi>();

    useEffect(() => {
        const fetchCdi = async () => {
            if (cdiId) setCdi(await getCdi(parseInt(cdiId)))
        }
        fetchCdi();
    }, [])
   
    
    useEffect(() => { 
        if (cdi) {
            cdi.locationabbr && setLocation({value: cdi.locationabbr, label: cdi.locationname});
            cdi.yearstart && setMinYear({value: cdi.yearstart, label: cdi.yearstart});
            cdi.yearend && setMaxYear({value: cdi.yearend, label: cdi.yearend});
            cdi.topic && setCategory({value: cdi.topicid, label: cdi.topic})
            cdi.question && setIndicator({value: cdi.questionid, label: cdi.question});
            cdi.datavalue && setDataValue(parseFloat(cdi.datavalue));
            cdi.datavaluetype && setDataType({value: cdi.datavaluetypeid, label: cdi.datavaluetype});
            cdi.gender && setGender({value: cdi.genderid, label: cdi.gender});
            cdi.race && setRace({value: cdi.raceid, label: cdi.race});
        }
    }, [cdi])

    useEffect(() => {
        if (minYear) { 
            setMaxYearOptions(yearOptions.map((y: Options) => {
            if (parseInt(y.value) < (parseInt(minYear.value) || 0)) {
                return {...y, "isDisabled": true}
            } else {
                return y
            }
            }))
        }
    }, [minYear])

    useEffect(() => {
        if (maxYear) {
            setMinYearOptions(yearOptions.map((y: Options) => {
            if (parseInt(y.value) > (parseInt(maxYear.value))) {
                return {...y, "isDisabled": true}
            } else {
                return y
            }
            }))
        }
    }, [maxYear])

    const handleSubmit = () => {
        if (location && minYear && maxYear && category && indicator) {
            const params = {
                "locationAbbr": location ? location.value.toUpperCase() : "",
                "locationName": location ? location.label : "",
                "minYear": minYear ? minYear.value : "",
                "maxYear": maxYear ? maxYear.value : "",
                "categoryId": category ? category.value.toUpperCase() : "",
                "category": category ? category.label : "",
                "indicator": indicator ? indicator.label : "",
                "indicatorId": indicator ? indicator.value.toUpperCase() : "",
                "dataValue": dataValue ||  "",
                "dataType": dataType ? dataType.label : "",
                "dataTypeId": dataType ? dataType.value.toUpperCase() : "",
                "gender": gender ? gender.label : "",
                "genderId": gender ? gender.value.toUpperCase() : "",
                "race": race ? race.label : "",
                "raceId": race ? race.value.toUpperCase() : ""
            }
            setSearchParams(params)
        } else {
            !location ? setLocationError("Location required") : setLocationError("");
            !minYear ? setMinYearError("Start year required") : setMinYearError("");
            !maxYear ? setMaxYearError("End year required") : setMaxYearError("");
            !category ? setCategoryError("Category required") : setCategoryError("");
            !indicator ? setIndicatorError("Indicator required") : setIndicatorError("");
        }
    }

    const handleDataValueChange = (e: { target: { value: React.SetStateAction<number | undefined>; }; }) => {
        setDataValue(e.target.value)
    }
    
    return(
        <div className={style.formDiv}>
            <span onClick={handleBack} className="material-symbols-outlined">
                arrow_back
            </span>

            <div className={style.title}>
                <h4>{title}</h4>
                <p>* indicates field is required</p>
            </div>
            
            <div className={style.inputDiv}>
                <div>
                    <h6>Location*</h6>
                    <Select value={location} onChange={(options: SingleValue<any>) => setLocation(options)} isClearable options={locationOptions}/>
                    {locationError && <p className={style.error}>*{locationError}</p>}
                </div>

                <div className="flex">
                <h6>Year*</h6>
                <div className={style.minmax}>
                        <div>
                            <p>Start</p>
                            <Select value={minYear} onChange={(options: SingleValue<any>) => setMinYear(options || "")} options={minYearOptions} isClearable/>
                            {minYearError && <p className={style.error}>*{minYearError}</p>}
                        </div>
                        <div>
                            <p>End</p>
                            <Select value={maxYear} onChange={(options: SingleValue<any>) => setMaxYear(options || "")} options={maxYearOptions} isClearable/>
                            {maxYearError && <p className={style.error}>*{maxYearError}</p>}
                        </div>
                </div>
                </div>

                <div>
                    <h6>Category*</h6> 
                    <Select value={category} onChange={(options: SingleValue<any>) => setCategory(options)} isClearable options={categoryOptions}/>
                    {categoryError && <p className={style.error}>*{categoryError}</p>}
                </div>

                <div>
                    <h6>Indicator*</h6>
                    <Select value={indicator} onChange={(options: SingleValue<any>) => setIndicator(options)} isClearable options={indicatorOptions}/>
                    {indicatorError && <p className={style.error}>*{indicatorError}</p>}
                </div>

                <div className={style.dataDiv}>
                    <div>
                        <h6>Data value</h6>
                        <Input defaultVal={dataValue} handleChange={handleDataValueChange} placeholder="Enter value..."/>
                    </div>

                    <div>
                        <h6>Data type</h6>
                        <Select value={dataType} onChange={(options: SingleValue<any>) => setDataType(options)} isClearable options={dataTypeOptions}/>
                    </div>
                </div>
                

                <div>
                    <h6>Gender</h6>
                    <Select value={gender} onChange={(options: SingleValue<any>) => setGender(options  || "")} isClearable={isClearable} options={genderOptions}/>
                </div>

                <div>
                    <h6>Race/ethnicity</h6>
                    <Select value={race} onChange={(options: SingleValue<any>) => setRace(options)} isClearable options={raceOptions}/>
                </div>
            </div>

            <div>
                {error && <p className={style.error}>*{error}</p>}
                <Button handleClick={handleSubmit} text={btnText} classBtn="blueBtn"/>
            </div>
            
        
        </div>
    )
}