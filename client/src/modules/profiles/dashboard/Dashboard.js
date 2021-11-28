import React, {useEffect} from 'react';
import * as userReducer from '../../../redux/users/user.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../../layout/misc/spinner/Spinner";
import * as profileActions from '../../../redux/profiles/profile.actions';
import * as profileReducer from '../../../redux/profiles/profile.reducer';
import {Link} from "react-router-dom";

let Dashboard = () => {
    let dispatch = useDispatch();

    let userInfo = useSelector((state) => {
        return state[userReducer.usersFeatureKey];
    });

    let profileInfo = useSelector((state) => {
        return state[profileReducer.profileFeatureKey];
    });

    let {profile, loading} = profileInfo;

    useEffect(() => {
        dispatch(profileActions.getProfile());
    }, []);

    let {user} = userInfo;

    let clickDeleteExperience = (experienceId) => {
        dispatch(profileActions.deleteExperience(experienceId));
    };

    let clickDeleteEducation = (educationId) => {
        dispatch(profileActions.deleteEducation(educationId));
    };

    return (
        <React.Fragment>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        <section className="p-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <p className="h3 text-teal">
                                            <i className="fa fa-sitemap"/>
                                            Dashboard
                                        </p>
                                        {
                                            Object.keys(user).length > 0 &&
                                            <p className="h5">Welcome {user.name}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
            }
            {
                Object.keys(profile).length > 0 ?
                    <React.Fragment>
                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <Link to="/profiles/edit-profile" className="btn btn-primary text-white btn-sm">
                                           <i className="fa fa-user-cog"/> Edit Profile</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment> :
                    <React.Fragment>
                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <small>You don't have a profile yet! , please create one.</small><br/>
                                        <Link to="/profiles/create-profile" className="btn btn-secondary text-white btn-sm">
                                            <i className="fa fa-user-cog"/> Create Profile</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default Dashboard;
