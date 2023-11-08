import React, { useEffect } from "react"
import { addCdi } from "../../data/cdi"
import { Form } from "./Form"
import { Cdi } from "../../types/CdiType"
import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./Form.module.scss";


export const AddForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        const addData = async () => {
            if (searchParams.toString()) {
                try {
                    const res = await addCdi(searchParams.toString());
                    const id = res.id
                    navigate(`/cdis/${id}`);
                } catch(e) {
                    console.log(e)
                }
            }
        }
        addData()
    }, [searchParams])

    return (
        <div className={style.container}>
            <Form title="Add data" setSearchParams={setSearchParams} btnText="Add" handleBack={() => navigate(-1)}/>
        </div>
    )
}