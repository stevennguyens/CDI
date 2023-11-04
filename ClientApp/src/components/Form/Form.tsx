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

export const Form = ({text, searchParams, setSearchParams, handleBack, cdiId}: {text: string, searchParams?: any, setSearchParams?: any, handleBack?: () => void, cdiId?: string}) => {
    const [minYearOptions, setMinYearOptions] = useState<Options[]>(yearOptions);
    const [maxYearOptions, setMaxYearOptions] = useState<Options[]>(yearOptions);
    const [isClearable, setIsClearable] = useState(true);

    const [location, setLocation] = useState<any>();
    const [minYear, setMinYear] = useState<any>();
    const [maxYear, setMaxYear] = useState<any>();
    const [category, setCategory] = useState<any>();
    const [indicator, setIndicator] = useState<any>();
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
            setLocation({value: cdi.locationabbr, label: cdi.locationname});
            setMinYear({value: cdi.yearstart, label: cdi.yearstart});
            setMaxYear({value: cdi.yearend, label: cdi.yearend});
            setCategory({value: cdi.topicid, label: cdi.topic})
            setIndicator({value: cdi.questionid, label: cdi.question});
            setDataValue(parseInt(cdi.datavalue));
            setDataType({value: cdi.datavaluetypeid, label: cdi.datavaluetype});
            setGender({value: cdi.genderid, label: cdi.gender});
            setRace({value: cdi.raceid, label: cdi.race});
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
        const params = {
            "locationAbbr": location.value.toUpperCase() || "",
            "locationName": location.label || "",
            "minYear": minYear.value || "",
            "maxYear": maxYear.value || "",
            "categoryId": category.value.toUpperCase() || "",
            "category": category.label || "",
            "indicator": indicator.label || "",
            "indicatorId": indicator.value.toUpperCase() || "",
            "dataValue": dataValue || "",
            "dataType": dataType.label || "",
            "dataTypeId": dataType.value.toUpperCase() || "",
            "gender": gender.label || "",
            "genderId": gender.value != null ? gender.value.toUpperCase() : null,
            "race": race.label || "",
            "raceId": race.value.toUpperCase() || ""
        }
        setSearchParams(params)
        console.log("submitted")
    }

    // navigation
    const navigate = useNavigate();
    // const handleBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    //     e.preventDefault();
    //     navigate(-1);
    // }

    const handleDataValueChange = (e: { target: { value: React.SetStateAction<number | undefined>; }; }) => {
        setDataValue(e.target.value)
    }
    
    return(
        <div className={style.formDiv}>
            <span onClick={handleBack} className="material-symbols-outlined">
                arrow_back
            </span>

            <h4>{text}</h4>
            <div>
                <h6>Location</h6>
                <Select value={location} onChange={(options: SingleValue<any>) => setLocation(options)} isClearable options={locationOptions}/>
            </div>

            <div className="flex">
               <h6>Year</h6>
               <div className={style.minmax}>
                    <div>
                        <p>Min</p>
                        <Select value={minYear} onChange={(options: SingleValue<any>) => setMinYear(options || "")} options={minYearOptions} isClearable/>
                    </div>
                    <div>
                        <p>Max</p>
                        <Select value={maxYear} onChange={(options: SingleValue<any>) => setMaxYear(options || "")} options={maxYearOptions} isClearable/>
                    </div>
               </div>
            </div>

            <div>
                <h6>Category</h6> 
                <Select value={category} onChange={(options: SingleValue<any>) => setCategory(options)} isClearable options={categoryOptions}/>
            </div>

            <div>
                <h6>Indicator</h6>
                <Select value={indicator} onChange={(options: SingleValue<any>) => setIndicator(options)} isClearable options={indicatorOptions}/>
            </div>

            <div className={style.dataDiv}>
                <div>
                    <h6>Data value</h6>
                    <Input handleChange={handleDataValueChange} placeholder="Enter value..."/>
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

            <Button handleClick={handleSubmit} text={text} classBtn="blueBtn"/>
        
        </div>
    )
}