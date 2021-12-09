import React, {useState, useEffect} from 'react';
import { createPDF } from '../helpers/pdfgenerator';
import { Button, Col} from 'react-bootstrap';
import { useAppContext } from '../AppContext';
import { generateOptions } from '../helpers/toasts';
import { toast } from 'react-toastify';
import { analyzeNormalTransActions } from '../helpers/analyzetx';
import { useLocation } from 'react-router-dom';


// dowload form 
export default function DownLoadPDF() {
    const { analysisResults, setAnalysisResults, cexAddressData, setCEXAddressData } = useAppContext();
    const [ alreadyTriggerred, setAlreadyTriggerred ] = useState();
    
    const {state: {client, data }} = useLocation();
        
    useEffect(()=>{
        if(cexAddressData) setAnalysisResults({clientAddress: client, results: analyzeNormalTransActions(data, cexAddressData)});
        if(!cexAddressData) setCEXAddressData();
    }, [cexAddressData]);
    
    useEffect(()=> {
        
        if(analysisResults && !alreadyTriggerred){
            toast(<div>Analysis Completete 'PDF ready for download'</div>, generateOptions('bottom-right', 'info', 0));
            setAlreadyTriggerred(true);
        }

    }, [analysisResults])

    const downloadButton = (
            <Col lg='5'>
                {analysisResults && <Button className="btn-solid-sm mt-2 pl-3 pr-3" style={{width: "100%"}} onClick={() =>  createPDF(analysisResults.clientAddress, analysisResults.results) }>Download Results</Button>}
            </Col>
        )

    return (
        <>
            {downloadButton}
        </>
    )
}
