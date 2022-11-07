import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
    const router = useRouter();
    return(
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" id="accordionSidebar">
            <Link href="/">
            <a className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3"></div>
            </a>
            </Link>
            <hr className="sidebar-divider my-0" />
            
            <li className={router.pathname=="/" ? "nav-item active" : "nav-item" }>
                <Link href="/">
                <a className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </a>
                </Link>
            </li>
            
            <hr className="sidebar-divider my-0" />
            <li className={router.pathname=="/users" || router.pathname=="/user/[...action]" ? "nav-item active" : "nav-item" }>
                <Link href="/users">
                <a className="nav-link">
                    <i className="fas fa-fw fa-users"></i>
                    <span>Users</span>
                </a>
                </Link>
            </li>
            <hr className="sidebar-divider" />
        </ul>
    )
}