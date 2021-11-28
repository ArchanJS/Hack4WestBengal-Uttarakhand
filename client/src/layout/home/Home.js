import React from 'react';
import {Link} from "react-router-dom";


let Home = () => {
    return (
        <React.Fragment>
            <div className="landing-page">
                <div className="wrapper">
                    <div className="d-flex flex-column justify-content-center align-items-center text-center h-100" >
                        <h5 className="display-4 animated zoomIn">Udaan</h5>
                        <p className="animated zoomIn">An initiative to help the businessmen to regain their lost businesses</p>
                        <div className="animated jello">
                            {!localStorage.getItem("react-social-token")?<><Link to="/users/register" className="btn btn-primary btn-sm text-white">Register</Link>
                            <Link to="/users/login" className="btn btn-success btn-sm">Login</Link></>
                            :
                            null}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};
export default Home;
