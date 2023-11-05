import React, { useEffect, useState } from "react";
import style from "../Form/Form.module.scss";
import Select, { SingleValue } from "react-select";
import { Button } from "../Button/Button";
import { sortOptions, locationOptions, genderOptions, raceOptions, categoryOptions, indicatorOptions, yearOptions } from "../../data/options";
import { Options } from "../../types/OptionType";
import { Input } from "../Input/NumericInput/Input";

export const Filter = ({searchParams, setSearchParams}: {searchParams: any, setSearchParams: any}) => {
    const [minYearOptions, setMinYearOptions] = useState<Options[]>(yearOptions);
    const [maxYearOptions, setMaxYearOptions] = useState<Options[]>(yearOptions);
    const [isClearable, setIsClearable] = useState(true);

    const [locations, setLocations] = useState<Options[]>([]);
    const [sort, setSort] = useState<Options>(sortOptions[0]);
    const [minYear, setMinYear] = useState<any>("");
    const [maxYear, setMaxYear] = useState<any>("");
    const [categories, setCategories] = useState<Options[]>([]);
    const [indicators, setIndicators] = useState<Options[]>([]);
    const [gender, setGender] = useState<any>("");
    const [races, setRaces] = useState<Options[]>([]);

    
    useEffect(() => { 
        setLocations(convertToOption(searchParams.getAll("locations"), locationOptions) || []);
        setCategories(convertToOption(searchParams.getAll("categories"), categoryOptions) || []);
        setIndicators(convertToOption(searchParams.getAll("indicators"), indicatorOptions) || []);
        setMinYear(convertToOption(searchParams.get("minYear"), yearOptions) || "");
        setMaxYear(convertToOption(searchParams.get("maxYear"), yearOptions) || "");
        setGender(convertToOption(searchParams.get("gender"), genderOptions) || "");
        setRaces(convertToOption(searchParams.getAll("races"), raceOptions) || []);
        
    }, [searchParams])

    useEffect(() => {
        setMaxYearOptions(yearOptions.map((y: Options) => {
            if (parseInt(y.value) < (parseInt(minYear.value) || 0)) {
                return {...y, "isDisabled": true}
            } else {
                return y
            }
        }))
    }, [minYear])

    useEffect(() => {
        setMinYearOptions(yearOptions.map((y: Options) => {
            if (parseInt(y.value) > (parseInt(maxYear.value))) {
                return {...y, "isDisabled": true}
            } else {
                return y
            }
        }))
    }, [maxYear])

    

    const convertToOption = (value: number | string | string[], options: any[]) => {
        if (Array.isArray(value)) {
            let v = value.map((v) => options.find(o => o.value === v)) 
            return v
        } else {
            return options.find(o => o.value === value)
        }
    }
    
    const handleFilter = () => {        
        let params = {
            "locations": locations.map(l => l.value),
            "sort": sort.value,
            "minYear": minYear.value || "",
            "maxYear": maxYear.value || "",
            "gender": gender.value || "",
            "categories": categories.map(c => c.value),
            "indicators": indicators.map(i => i.value),
            "races": races.map(r => r.value),
            "pageNumber": 1
        }

        setSearchParams(params);
    }

    return(
        <div className={style.filterDiv}>
            <div>
                <h6>Location</h6>
                <Select value={locations} onChange={(options: any) => setLocations(options)} isMulti options={locationOptions}/>
            </div>
            <div>
                <h6>Sort by</h6>
                <Select value={sort} onChange={(options: SingleValue<any>) => setSort(options)} defaultValue={sortOptions[0]} options={sortOptions}/>
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
                <Select value={categories} onChange={(options: any) => setCategories(options)} isMulti options={categoryOptions}/>
            </div>
            <div>
                <h6>Indicator</h6>
                <Select value={indicators} onChange={(options: any) => setIndicators(options)} isMulti options={indicatorOptions}/>
            </div>
            <div>
                <h6>Gender</h6>
                <Select value={gender} onChange={(options: SingleValue<any>) => setGender(options  || "")} isClearable={isClearable} options={genderOptions}/>
            </div>
            <div>
                <h6>Race/ethnicity</h6>
                <Select value={races} onChange={(options: any) => setRaces(options)} isMulti options={raceOptions}/>
            </div>
            <Button handleClick={handleFilter} text="Filter" classBtn="blueBtn"/>
        </div>
        
    )
}