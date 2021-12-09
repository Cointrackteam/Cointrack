import React, {useState } from 'react';
import { useForm}  from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup, FormControl, Spinner, Col, Row} from 'react-bootstrap'; 
import { requestAction } from '../helpers/etherscan';
import { useAppContext } from '../AppContext';

import AccountAddressButton from './AccountAddressButton';
import { payForAnalysis } from '../helpers/transactor';
import { generateOptions } from '../helpers/toasts';

import { toast } from 'react-toastify';
import { Outlet } from 'react-router-dom';
const slug = require('unique-slug');

export default function HeroForm(){
    const { injectedProvider, cexAddressData } = useAppContext();
    const [ paying, setPaying ] = useState(false); 
    const navigate = useNavigate();

    const { register, 
        setValue,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm({
        mode: 'onSubmit',
        revalidate: 'onChange',
        defaultValues: {
            ethAddress: ''
        }
    }) 

    const onSubmit = async (data, e) => { 
        try {
            setPaying(true);
            let transaction = await toast.promise(() => payForAnalysis(injectedProvider), {
                pending: {
                    render({data}){
                        return <div style={{width: "4rem"}}>...Paying</div>;
                    }
                }, 
                success: {
                    render({data: { hash } }){
                        return <div>transaction succesffully created with transactionHash {hash}</div>;
                    }
                }, 
                error: {
                    render({data: {code, message} }){
                        return <div>Error: {code}, message: {message}</div>;
                    }
                }
            }) // initialize payment flow
            
            let { transactionHash } = await toast.promise(() => transaction.wait(), {
                pending: {
                    render({data}){
                        return <div>...waiting for transaction to be mined </div>;
                    }
                }, 
                success: {
                    render({data: { hash } }){
                        return <div> successfully payment transaction hash: {hash}</div>;
                    }
                }, 
                error: {
                    render({data: {code, message} }){
                        return <div>Error: {code}, message: {message}</div>;
                    }
                }
            }) // wait for transaction to be mined
            setPaying(false); // paid successfully 

            toast(<div>...Analyzing transactions</div>, generateOptions('bottom-center', 'info', 0));
            let requestData = await requestAction('get_account_transactions', data.ethAddress); 
            return navigate(`/${slug()}`, {state: {data: requestData.result, client: data.ethAddress }}); 

        } catch (e){
            console.log(e);
        }
    } 

    const onError = (errors, e) => {
        console.log(errors);
        console.log(e);
    } 
    
    

    const spinnerButtonAnalyzing = (

        <Button variant="primary" >Analyzing...
            <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true"/>
        </Button>            
    )
    const spinnerButtonProcessing = (

        <Button variant="primary" >Processing...
            <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true"/>
        </Button>            
    )

    const spinnerButton = !paying ? spinnerButtonAnalyzing : spinnerButtonProcessing 

    const submitButton = (
        <>
            <Button type="submit" className="form-control-submit-button">Lets find out</Button>
        </>
    ) 
  
    const submitButtonDisabled = (
        <>
            <Button type="submit" className="form-control-submit-button" disabled>Lets find out</Button>
        </>
    )   

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group >
                {
                    <InputGroup className="mb-3" >
                        <FormControl placeholder="Ethereum Address" className="p-2" {...register("ethAddress", {required: "eth address invalid", maxLength: 42})}/>
                            { !isSubmitting ? !injectedProvider ? submitButtonDisabled : submitButton : spinnerButton}
                    </InputGroup>
                }
            </Form.Group>
            <Form.Group >
                <AccountAddressButton callback={setValue} />
                <Outlet />
            </Form.Group>
        </Form>
    )
}