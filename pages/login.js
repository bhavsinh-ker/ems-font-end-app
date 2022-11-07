import { setCookie } from 'cookies-next';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiCall } from "../services";

export default function Home() {
    const router = useRouter();
    const [userName, setUsername] = useState("");
    const [userPassword, setPassword] = useState("");
    const cookieID = process.env.NEXT_PUBLIC_LOGIN_KEY;
    
    const apiErrorInitial = {
        htmlClass: "",
        message: []
    };
    const [apiError, setApiError] = useState(apiErrorInitial);

    const logMeIn = ( event ) => {
        event.preventDefault();
        setApiError(apiErrorInitial);
        apiCall({
            endpoint: 'auth/login',
            method: 'POST',
            includeToken: false,
            body: {
                username: userName,
                password: userPassword
            }
        })
        .then((data)=>{
            const errorData = {
                htmlClass: "alert alert-danger",
                message: []
            }
            if( !data ) {
                errorData.message.push("Something is wrong! please try again.");
                setApiError(errorData);
                return;
            }
            if( data.error ) {
                if( Array.isArray(data.error) ) {
                    data.error.map( (error) => {
                        errorData.message.push(error.param+' '+error.msg);
                    });
                } else {
                    errorData.message.push(data.error);
                }
                setApiError(errorData);
                return;
            }
            
            const token = data.token;
            setCookie(cookieID, token, {
                maxAge: (60*60)*2
            });
            router.push("/");
            return;
        }).catch((error)=>{
            setApiError(error);
            console.log(error);
        })
    };
    
    useEffect(()=>{
        if( router.query.error ) {
            setApiError({
                ...apiError,
                htmlClass: "alert alert-danger",
                message: [router.query.error]
            })
        }
    }, [router.query.error]);
    
  return (
    <>
        <Head>
            <title>Login - EMS</title>
        </Head>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        
                                        {apiError.message.map((data, index) => {
                                            return <div key={index} className={apiError.htmlClass}>{data}</div>
                                        })}

                                        <form onSubmit={logMeIn} className="user">
                                            <div className="form-group">
                                                <input type="text" value={userName} className="form-control form-control-user" id="userName" placeholder="Username" onChange={(e) => setUsername(e.target.value) } />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" id="password" placeholder="Password"  value={userPassword} onChange={(e) => setPassword(e.target.value) } />
                                            </div>
                                            <button name="login" value="yes" type="submit" className="btn btn-primary btn-user btn-block">Login</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
