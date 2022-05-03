import React from "react";
import '../../css/NavigationBar.css';
import logo from '../../imgs/logo.jpg'

const NavigationBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} className="navbar-logo" alt="logo"/>
                    </a>
                    <a className="navbar-brand" href="/">Spacely Space Sprockets</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/inventory">Inventory</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/customer">Customer</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/sales">Sales</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/sales-report">Sales Report</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavigationBar;
