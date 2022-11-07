export default function Topbar() {

    const userDropdown = (event) => {
        event.preventDefault();
        window.jQuery('#userDropdown').dropdown('toggle');
        // window.jQuery('#userDropdown').dropdown('dispose');
    }

    return(
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link" href="#" id="userDropdown" onClick={userDropdown} role="button">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
                        <img className="img-profile rounded-circle"
                            src="http://localhost/php-learn/php-crud/assets/img/undraw_profile.svg" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}