import { URLSearchParamsInit, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Form } from "./Form"
import { useEffect, useState } from "react";
import { getCdi, updateCdi } from "../../data/cdi";
import React from "react";

export const EditForm = () => {
    const {id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
 

    useEffect(() => {
        try {
            if (searchParams.toString() && id) {
                updateCdi(id, searchParams.toString());
                navigate('/');
            }
        } catch (e) {
            console.log(e)
        }
        
    }, [searchParams])

    return (
        <Form text="Edit data" searchParams={searchParams} setSearchParams={setSearchParams} handleBack={() => navigate(-1)} cdiId={id}/>
    )
}
 