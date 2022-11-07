import { useRouter } from 'next/router';
import { getCookie, deleteCookie } from 'cookies-next';
import Footer from "./footer";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useEffect } from 'react';

export default function Layout({ children }) {

    const router = useRouter();
    const cookieID = process.env.NEXT_PUBLIC_LOGIN_KEY;

    const logmeOut = (e) => {
        e.preventDefault();
        deleteCookie(cookieID, {
            path: "/"
        });
        router.push("/login");        
    }
    useEffect(()=>{
        const token = getCookie(cookieID);
        if( !token || token == "" ) {
            router.push("/login?error=login first");
        }
    });

    return (
      <>
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <div className="container-fluid">
                        <main>{children}</main>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
        </a>
        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a className="btn btn-primary" data-dismiss="modal" onClick={logmeOut}>Logout</a>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}