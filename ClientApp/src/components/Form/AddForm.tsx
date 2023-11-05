import React, { useEffect } from "react"
import { addCdi } from "../../data/cdi"
import { Form } from "./Form"
import { Cdi } from "../../types/CdiType"
import { useNavigate, useSearchParams } from "react-router-dom"


export const AddForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (searchParams.toString()) {
            try {
                addCdi(searchParams.toString())
                navigate('/');
            } catch(e) {
                console.log(e)
            }
        }
    }, [searchParams])

    return (
        <Form title="Add data" setSearchParams={setSearchParams} btnText="Add" handleBack={() => navigate(-1)}/>
    )
}