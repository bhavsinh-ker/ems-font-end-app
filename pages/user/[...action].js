import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Alert from "../../components/Alert";
import UserForm from "../../components/UserForm";
import emsContext from "../../context";
import { createUser, getUser, updateUser } from "../../services";

const UserAction = () => {

    const router = useRouter();
    const { setAlertData } = useContext(emsContext);
    const { action } = router.query;
    const [pageTitle, setPageTitle] = useState("Add New User");
    const [userId, setUserId] = useState("");
    const [userAction, setUserAction] = useState("add");
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        status: true,
        address: ""
    });

    const formActionCb = (formdata) => {
        let useActionApi, successMessage;

        if(userAction == "add") {
            useActionApi = createUser(formdata);
            successMessage = "User created successfuly.";
        } else {
            useActionApi = updateUser(userId, formdata);
            successMessage = "User updated successfuly.";
        }

        useActionApi.then((data) => {
            if( data.error ){
                if( Array.isArray(data.error) ) {
                    const errorData = [];
                    data.error.map((errordata, index)=>{
                        errorData.push({
                            type: "error",
                            message: errordata.param+' '+errordata.msg
                        });
                    });
                    setAlertData(errorData);
                } else {
                    setAlertData([{
                        type: "error",
                        message: data.error
                    }]);
                }
                return;
            }

            const userid = (userAction == "add") ? data._id : data.data._id;
            
            if( !userid || userid == "" ) {
                setAlertData([{
                    type: "error",
                    message: "Something is wrong! please try again."
                }]);
                return;
            }

            setAlertData([{
                message: successMessage
            }]);

            router.push("/user/edit-user/"+userid);
            return;
        });
    }

    useEffect(()=>{
        if( action ) {
            action.map((data, index)=>{
                if(index==0 && data == "edit-user") {
                    setUserAction('edit');
                }
            });
        }
    }, [action]);

    useEffect(()=>{
        if(userAction == 'edit') {
            setUserId(action[1]);
            setPageTitle("Edit User");
        }
    }, [userAction]);

    useEffect(()=>{
        if(userId != '') {
            getUser(userId)
            .then(data=>{
                if( data.error ){
                    setAlertData([{
                        type: "error",
                        message: data.error
                    }]);
                    return;
                }
                setUserData(data.data);
            });
        }
    }, [userId]);

    useEffect(()=> {
        return () => {
            setAlertData([]);
        }
    }, []);

    return(
        <>
            <Head>
                <title>{pageTitle} - EMS</title>
            </Head>
            <h1 className="h3 mb-4 text-gray-800">{pageTitle}
                <Link href={'/users'}>
                <a className="btn btn-primary float-right">Back</a>
                </Link>
            </h1>
            <Alert />
            <UserForm formActionCb={formActionCb} userData={userData} />
        </>
    );
}

export default UserAction;