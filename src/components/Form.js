import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import Spinner from './Spinner';
import { Button } from 'react-bootstrap'; 

export default function Form (){
    const [modalAccount, setModalAccount] = useState(); 
    const { register, 
        formState, 
        setFocus, 
        getValues, 
        setValue,
        resetField,
        reset, 
        handleSubmit,
        formState: {error, isDirty, isSubmitting, touchedFields, submitCount}
    } = useForm({
        mode: 'onSubmit',
        revalidate: 'onChange',
        defaultValues: {
            ethAddress: ''
        }
    }) 

    const input = (
        <div className="form-group">
                <input 
                type="text" 
                className="form-control-input" 
                placeholder="Ethereum Address" 
                {...register("eth Address", {required: "eth address invalid", maxLength: 42})} 
                />
        </div>
    )
    const spinnerButton = (
        <Button variant="primary" disabled>
            <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
        </Button> 
    )
    const submitButton = (
        <Button type="submit" className="form-control-submit-button">Lets find out</Button>
    ) 
    const addressRadio = (
        <input type="radio" unchecked/>
    )

    const buttons = (
        <div className="form-group">
            {isSubmitting ? spinnerButton : submitButton }
        </div>
    )

    return (
        <form onSubmit={handleSubmit}>
            {input}
            {addressRadio}
            {buttons}
        </form>
    )
}