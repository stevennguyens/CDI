import { URLSearchParamsInit, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Form } from "./Form"
import { useEffect, useState } from "react";
import { deleteCdi, getCdi, updateCdi } from "../../data/cdi";
import React from "react";
import { Button } from "../Button/Button";
import style from "./Form.module.scss";
import { Modal } from "../Modal/Modal";

export const EditForm = () => {
    const {id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); 
    const [modalValue, setModalValue] = useState();

    useEffect(() => {
        try {
            if (searchParams.toString() && id) {
                updateCdi(id, searchParams.toString());
                navigate(`/cdis/${id}`);
            }
        } catch (e) {
            console.log(e)
        }
        
    }, [searchParams])

    const handleDelete = () => {
        if (id) {
            setShowDeleteModal(true);
        }
    }
    
    useEffect(() => {
        if (modalValue === true) {
            if (id) {
                setShowDeleteModal(false);
                deleteCdi(id);
                navigate('/cdis');
            }
        } else if (modalValue === false) {
            setShowDeleteModal(false)
            setModalValue(undefined)
        } 
    }, [modalValue])

    return (
        <div className={`${style.container} ${showDeleteModal && style.noScroll}`}>
            {showDeleteModal && <Modal setModalValue={setModalValue} text="Confirm to delete this data permanately"/>}
            <Form title="Edit data" btnText="Save" setSearchParams={setSearchParams} handleBack={() => navigate(-1)} cdiId={id}/>
            <Button handleClick={handleDelete} classBtn="deleteBtn" text="Delete"/>
        </div>
        
    )
}
 