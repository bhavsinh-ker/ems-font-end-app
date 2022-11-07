import moment from 'moment/moment';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Alert from '../components/Alert';
import emsContext from '../context';
import { getUsers, updateUser, deleteUser } from "../services";

const users = () => {

    const {alertData, setAlertData} =  useContext(emsContext);
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [prevPage, setPrevPage] = useState(0);
    const [nextPage, setNextPage] = useState(0);
    
    const loadUsers = () => {
        setLoading(true);
        getUsers(page, limit)
        .then(data => {
            setUsersData(data.data);
            setLoading(false);
            setTotalPages(data.total_pages);
        });
    }

    const updateUserStatus = (userId, userStatus) => {
        updateUser(userId, {
            status: !userStatus
        })
        .then((data)=>{
            if( data.error ) {
                setAlertData([{
                    type: "error",
                    message: data.error
                }]);
                return;
            }
            setAlertData([{
                message: "User status updated successfully."
            }]);
            loadUsers();
        });
    }

    const deleteMyUser = (event, userId) => {
        event.preventDefault();
        if(window.confirm("Are you sure?")) {
            deleteUser(userId)
            .then((data)=>{
                if(data.error) {
                    setAlertData([{
                        type: "error",
                        message: data.error
                    }]);
                    return;
                };
                setAlertData([{
                    message: "User status deleted successfully."
                }]);
                loadUsers();
            })
        }
    }

    useEffect(()=>{
        loadUsers();
    },[]);

    useEffect(()=>{
        if( page ) {
            loadUsers();
            if(Number(page)-1>0) {
                setPrevPage(Number(page)-1);
            }
            if(Number(page)+1 <= totalPages) {
                setNextPage(Number(page)+1);
            }
        }
        
    },[page, limit]);

    useEffect(()=>{
        setPage(router.query.page);
    },[router.query.page]);

    useEffect(()=> {
        return () => {
            setAlertData([]);
        }
    }, []);

    return(
        <>
        <Head>
            <title>Users - EMS</title>
        </Head>
        <h1 className="h3 mb-4 text-gray-800">
            Users
            <Link href={'/user/add-new'}>
                <a className="btn btn-primary float-right">Add New</a>
            </Link>
        </h1>
        <div className="row">
            <div className="col-12">
                <Alert />
                <table className="table table-bordered bg-white">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center" style={{width: '50px'}}>#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Create Date</th>
                            <th scope="col" className="text-center" style={{width: '50px'}}>Status</th>
                            <th scope="col" className="text-center" style={{width: '85px'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { !loading && usersData ?
                        usersData.map((user, index)=>{
                            const createDate = moment(user.create_date).format("d MMM, yy");
                            return(
                                <tr key={index}>
                                    <th scope="row" className="text-center">{index+1}</th>
                                    <td>{user.first_name+' '+user.last_name}</td>
                                    <td>
                                        <a href={'mailto:'+user.email}>{user.email}</a>
                                    </td>
                                    <td>{user.address}</td>
                                    <td>{createDate}</td>
                                    <td className="text-center">
                                        <a href="#" onClick={(e)=>{
                                            e.preventDefault();
                                            updateUserStatus(user._id, user.status);
                                        }}>
                                            <i className={user.status ? "fas fa-check-circle" : "far fa-check-circle"}></i>
                                        </a>
                                    </td>
                                    <td className="text-center">
                                        <Link href={'/user/edit-user/'+user._id}>
                                            <a href="#"><i className="far fa-edit"></i></a>
                                        </Link>
                                        &nbsp;
                                        <a href="#" onClick={(e)=>deleteMyUser(e, user._id)}>
                                            <i className="far fa-trash-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                            );
                        })
                        :
                        <tr className="table-info">
                            <td colSpan="7">
                                { !loading ? 'User not found' :
                                    <div className='text-center'>
                                        <div className="spinner-border text-info" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }
                            </td>
                        </tr>
                        }
                        
                    </tbody>
                </table>

                { !loading && totalPages > 1 &&
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        
                        <li className={ prevPage > 0 ? "page-item" : "page-item disabled"}>
                            <Link href={'/users?page='+prevPage}>
                                <a className="page-link" tabIndex="-1" aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </Link>
                        </li>
                        
                        {[...Array(totalPages)].map((data, index)=>{
                            const loopCurrentPage = index+1;
                            const currentPage = page ? page : 1;
                            return(
                                <li key={index} className={ loopCurrentPage==currentPage ? "page-item active" : "page-item" }>
                                    <Link href={'/users?page='+loopCurrentPage}>
                                        <a className="page-link">{loopCurrentPage}</a>
                                    </Link>
                                </li>
                            );
                        })}

                        <li className={ nextPage <= totalPages ? "page-item" : "page-item disabled"}>
                            <Link href={'/users?page='+nextPage}>
                                <a className="page-link" tabIndex="-1" aria-label="Next">
                                <span aria-hidden="true">»</span>
                                <span className="sr-only">Next</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                }
            </div>
        </div>
        </>
    );
}

export default users;