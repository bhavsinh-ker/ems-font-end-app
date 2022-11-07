import { useContext } from "react";
import emsContext from "../context";

const Alert = () => {

    const {alertData} = useContext(emsContext);
    
    if(alertData.length>0) {
        return(
            <>
            {alertData.map((alertdata, index)=>{
                let alertClassName = "alert alert-success";
                if(alertdata.type && alertdata.type == "error") {
                    alertClassName = "alert alert-danger"
                }
                return(
                    <div key={index} className={alertClassName}>{alertdata.message}</div>
                )
            })}
            </>
        );
    } else {
        return(
            <></>
        )
    }
    
}

export default Alert;