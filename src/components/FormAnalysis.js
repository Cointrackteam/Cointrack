import React, {useState, useEffect} from 'react';
import { createPDF } from '../helpers/pdfgenerator';
import { Button } from 'react-bootstrap';
import { useAppContext } from '../AppContext';


// dowload form 
export default function FormAnalysis() {
    const [results, setResults] = useState();
    const { analysisResults } = useAppContext();

    // console.log(useAppContext());
    useEffect(()=>{
        setResults(analysisResults)
        
    }, [analysisResults])
    return (
        <div>
            <Button onClick={() => createPDF(analysisResults.clientAddress, analysisResults.results)}>CreatePDF</Button>
        </div>
    )
}
