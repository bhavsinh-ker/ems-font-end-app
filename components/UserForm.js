import { useEffect, useState } from "react";

const UserForm = (props) => {

    const userData = props.userData;
    const [formData, setFormData] = useState(userData);

    const formSubmit = (event)=> {
        event.preventDefault();
        props.formActionCb(formData);
    };

    useEffect(()=>{
        if( userData.first_name ) {
            setFormData(userData);
        }        
    },[userData]);

    return(
        <>
            <form onSubmit={formSubmit}>
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">
                                User Details
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="first_name">First Name*</label>
                                        <input type="text" className="form-control" id="first_name" onChange={(e)=>{
                                            setFormData({
                                                ...formData,
                                                first_name: e.target.value
                                            })
                                        }} value={formData.first_name} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="last_name">Last Name*</label>
                                        <input type="text" className="form-control" id="last_name" onChange={(e)=>{
                                            setFormData({
                                                ...formData,
                                                last_name: e.target.value
                                            })
                                        }} value={formData.last_name} />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="email">Email*</label>
                                            <input type="email" className="form-control" id="email" onChange={(e)=>{
                                            setFormData({
                                                ...formData,
                                                email: e.target.value
                                            })
                                        }} value={formData.email} />
                                        </div>
                                        <div>
                                            <label className="w-100">Status</label>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status" id="status_1" value="1" onChange={(e)=>{
                                                    setFormData({
                                                        ...formData,
                                                        status: 1
                                                    })
                                                }} checked={formData.status == true ? true : false} />
                                                <label className="form-check-label" htmlFor="status_1">Enable</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status" id="status_0" value="0" onChange={(e)=>{
                                                    setFormData({
                                                        ...formData,
                                                        status: 0
                                                    })
                                                }} checked={formData.status == false ? true : false} />
                                                <label className="form-check-label" htmlFor="status_0">Disable</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group col-6">
                                        <label htmlFor="address">Address</label>
                                        <textarea id="address" rows="4" className="form-control" onChange={(e)=>{
                                            setFormData({
                                                ...formData,
                                                address: e.target.value
                                            })
                                        }} value={formData.address}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                Action
                            </div>
                            <div className="card-body">
                                <button type="submit" className="btn btn-primary">Save</button>
                                &nbsp;
                                <button type="reset" className="btn btn-secondary">Clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default UserForm;