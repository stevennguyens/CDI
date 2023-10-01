import React, { useEffect, useState } from "react";
import style from "./Filter.module.scss";
import Select, { MultiValue, SingleValue } from "react-select";
import AsyncSelect from "react-select/async";
import { getAllCdiCategories, getAllIndicators, getAllLocations, getFilteredCdis, getMaxYear, getMinYear } from "../../data/cdi";
import { Button } from "../Button/Button";

const sortOptions = [
    { value: 'dateAsc', label: 'Date - Newest to Oldest' },
    { value: 'dateDesc', label: 'Date - Oldest to Newest'},
    { value: 'category', label: 'Category'}
]

const genderOptions = [
    { value: 'genf', label: 'Female' },
    { value: 'genm', label: 'Male' },
    { value: 'geno', label: 'Other' }
]

const raceOptions = [
    { value: 'aian', label: 'American Indian or Alaska Native' },
    { value: 'asian', label: 'Asian' },
    { value: 'blk', label: 'Black or African American' },
    { value: 'his', label: 'Hispanic or Latino'},
    { value: 'nhpi', label: 'Native Hawaiian or Other Pacific Islander'},
    { value: 'wht', label: 'White'}
]

const emptyOption = { value: "", label: ""}

export const Filter = ({searchParams, setSearchParams}: {searchParams: any, setSearchParams: any}) => {
    const [categoryOptions, setCategoriesOptions] = useState([]);
    const [indicatorOptions, setIndicatorOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState<any>([]);
    const [minYearOptions, setMinYearOptions] = useState<any>([]);
    const [maxYearOptions, setMaxYearOptions] = useState<any>([]);
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
        if (searchParams.toString() === "") {
            setLocations([]);
            setCategories([]);
            setIndicators([]);
            setMinYear("");
            setMaxYear("");
            setGender("");
            setRaces([]);
        }
    }, [searchParams])

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getAllCdiCategories();
            setCategoriesOptions(categories.map(({categoryid, categoryType} : {categoryid: string, categoryType: string}) => {
                return {
                    value: categoryid.toLowerCase(),
                    label: categoryType
                }
            }))
        }

        const getIndicators = async () => {
            const indicators = await getAllIndicators();
            setIndicatorOptions(indicators.map(({indicatorid, indicatortype} : {indicatorid: string, indicatortype: string}) => {
                return {
                    value: indicatorid.toLowerCase(),
                    label: indicatortype
                }
            }))
        }

        const getLocations = async () => {
            const locations = await getAllLocations();
            setLocationOptions(locations.map(({locationabbr, locationname} : {locationabbr: string, locationname: string}) => {
                return {
                    value: locationabbr.toLowerCase(),
                    label: locationname
                }
            }))
        }

        const getYearOptions = async () => {
            const minYear = await getMinYear();
            const maxYear = await getMaxYear(); 
            let yearOptions = [];
            for (let i = minYear; i <= maxYear; i++) {
                yearOptions.push({"value": i, "label": i})
            }
            setYearOptions(yearOptions);
            setMinYearOptions(yearOptions);
            setMaxYearOptions(yearOptions);
        }

        getCategories();
        getIndicators();
        getLocations();
        getYearOptions();
    }, [])


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
            if (parseInt(y.value) > (parseInt(maxYear.value) || 0)) {
                return {...y, "isDisabled": true}
            } else {
                return y
            }
        }))
    }, [maxYear])

    type Options = {
        value: string,
        label: string
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
                <Select value={locations} onChange={(options: any) => setLocations(options)} isMulti options={locationOptions} placeholder="Location"/>
            </div>
            <div>
                <h6>Sort by</h6>
                <Select onChange={(options: SingleValue<any>) => setSort(options.value)} defaultValue={sortOptions[0]} options={sortOptions}/>
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
                <Select onChange={(options: any) => setCategories(options)} isMulti options={categoryOptions}/>
            </div>
            <div>
                <h6>Indicator</h6>
                <Select onChange={(options: any) => setIndicators(options)} isMulti options={indicatorOptions}/>
            </div>
            <div>
                <h6>Gender</h6>
                <Select value={gender} onChange={(options: SingleValue<any>) => setGender(options  || "")} isClearable={isClearable} options={genderOptions}/>
            </div>
            <div>
                <h6>Race/ethnicity</h6>
                <Select onChange={(options: any) => setRaces(options)} isMulti options={raceOptions}/>
            </div>
            <Button handleClick={handleFilter} text="Filter" classBtn="filterBtn"/>
        </div>
        
    )
}