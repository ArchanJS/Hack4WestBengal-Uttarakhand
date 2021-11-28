import React, {useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as developerActions from '../../../redux/developers/developer.actions';
import * as developerReducer from '../../../redux/developers/developer.reducer';
import Spinner from "../../../layout/misc/spinner/Spinner";

const {useEffect} = require("react");

let DeveloperList = () => {
    let dispatch = useDispatch();

    let developerInfo = useSelector((state) => {
        return state[developerReducer.developerFeatureKey];
    });

    let {loading , profiles} = developerInfo;

    useEffect(() => {
        dispatch(developerActions.fetchAllDevelopers());
    }, []);

    const [profile, setProfiles] = useState([]);

    const getAllUsers=async()=>{
        try {
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                }
              }
                const {data} = await axios.get(`api/profiles/all`, config);
                console.log(data.profiles); 
              setProfiles(data.profiles);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // setProfiles(profile);
        getAllUsers();
    },[])

    const [addrtype, setAddrtype] = useState(["Select_your_business_type", "Vegetable_Fruits_vendor","Crockery_business","Garment_Fabric_related_business", "Cosmetics_related_business", "Handicrafts", "Grocery_related_business", "Pickles_Papad_business"])
  const Add = addrtype.map(Add => Add
  )

  const handleAddrTypeChange = async (e) => { 
      try {
        const businessType = addrtype[e.target.value];
      const config = {
          headers:{
              'Content-Type': 'application/json'
          }
        }
          const {data} = await axios.get(`api/profiles/getusers/${businessType}`, config);
        //   console.log(savedata); 
        setProfiles(data);
      } catch (error) {
        console.log(error)  
      }  
  }

    return (
        <React.Fragment>
            <section className="p-3">
                <div className="container">
                    <div className="row animated zoomIn">
                        <div className="col">
                            <p className="h3 text-teal">
                               <i className="fa fa-user-tie"/>{" "}Users</p>
                            {/* <p>List of registered user</p> */}
                            < select
                                    onChange={e => handleAddrTypeChange(e)}
                                    className="browser-default custom-select" >
                                    {
                                        Add.map((address, key) => <option value={key}>{address}</option>)
                                    }
                                </select >
                        </div>
                    </div>
                </div>
            </section>
            <section>
                {
                    loading ? <Spinner/> :
                        <React.Fragment>
                            {
                                profiles.length > 0 ?
                                    <React.Fragment>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    {
                                                        profile.map(profile => {
                                                            return (
                                                                <div className="card my-2 animated zoomIn" key={profile._id}>
                                                                    <div className="card-body bg-light-grey">
                                                                        <div className="row">
                                                                            <div className="col-md-2">
                                                                                <img src={profile.user.avatar} className="img-fluid img-thumbnail" alt=""/>
                                                                            </div>
                                                                            {
                                                                                console.log(profile.user)
                                                                            }
                                                                            <div className="col-md-5">
                                                                                <h2>{profile.user.name}</h2>
                                                                                <small className="h6">{profile.website}</small><br/>
                                                                                <small>{profile.location}</small><br/>
                                                                                <Link to={`/developers/${profile._id}`} className="btn btn-teal btn-sm">View Profile</Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment> : null
                            }
                        </React.Fragment>
                }
            </section>
        </React.Fragment>
    )
};
export default DeveloperList;
