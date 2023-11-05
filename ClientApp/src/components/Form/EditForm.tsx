import { URLSearchParamsInit, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Form } from "./Form"
import { useEffect, useState } from "react";
import { deleteCdi, getCdi, updateCdi } from "../../data/cdi";
import React from "react";
import { Button } from "../Button/Button";

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

    const handleDelete = () => {
        if (id) {
            deleteCdi(id);
            navigate('/');
        }
    }

    return (
        <div>
            <Form title="Edit data" btnText="Save" setSearchParams={setSearchParams} handleBack={() => navigate(-1)} cdiId={id}/>
            <Button handleClick={handleDelete} classBtn="deleteBtn" text="Delete"/>
        </div>
        
    )
}
 