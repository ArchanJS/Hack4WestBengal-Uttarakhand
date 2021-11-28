import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import * as profileActions from '../../../redux/profiles/profile.actions';
import * as userReducer from '../../../redux/users/user.reducer';

let CreateProfile = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [profile , setProfile] = useState({
        image: '',
        website : '',
        location : '',
        phone:'',
        bio : '',
    });

    
    let userInfo = useSelector((state) => {
        return state[userReducer.usersFeatureKey];
    });

    let {user} = userInfo;

    const uploadImage=async(e)=>{
        const file=e.target.files[0];
        const base64=await convertBase64(file);
        setProfile({
            ...profile,
            image : base64.toString()
        });
      }
      
      const convertBase64=(file)=>{
        return new Promise((resolve,reject)=>{
          const fileReader=new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload=()=>{
            resolve(fileReader.result);
          }
          
          fileReader.onerror=(err)=>{
            reject(err);
          }
        })
      }

    let updateInput = (e) => {
        setProfile({
            ...profile,
            [e.target.name] : e.target.value
        });
    };

    let submitCreateProfile = (e) => {
        e.preventDefault();
        dispatch(profileActions.createProfile(profile , history));
    };

    return (
        <React.Fragment>
           {/* <pre>{JSON.stringify(profile)}</pre>*/}
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">
                                <i className="fa fa-user-circle"/>
                                {' '} Create a Profile
                            </p>
                            <p>Welcome! Create your profile</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={submitCreateProfile}>
                            <div className="col-md-5 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  
                  <img className="rounded mt-5"
               src={profile.image} 
               
               style={{width:"80%"}}/>
               
               <span className="font-weight-bold">Upload Profile Photo</span><input type="file" className="text-center form-control" onChange={(e)=>{uploadImage(e)}}/></div>
            </div>
                                <div className="form-group">
                                    <input
                            
                                        name="website"
                                        value={profile.website}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Website"/>
                                </div>
                                <div className="form-group">
                                    <input
    
                                        name="location"
                                        value={profile.location}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Location"/>
                                </div>
                                <div className="form-group">
                                    <input
                                        name="phone"
                                        value={profile.phone}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Phone Number"/>
                                </div>
                                <div className="form-group">
                                    <textarea
                                        
                                        name="bio"
                                        value={profile.bio}
                                        onChange={updateInput}
                                        rows="3" className="form-control" placeholder="Biography"/>
                                </div>
                                
                                <div>
                                    <input type="submit" className="btn btn-teal btn-sm" value="Create Profile"/>
                                    <Link to="/profiles/dashboard" className="btn bg-light-grey btn-sm">Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default CreateProfile;
