import React, {useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import * as profileActions from '../../../redux/profiles/profile.actions';
import * as profileReducer from '../../../redux/profiles/profile.reducer';
import * as userReducer from '../../../redux/users/user.reducer';
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../../layout/misc/spinner/Spinner";


let EditProfile = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [localProfile , setLocalProfile] = useState({
        image:'',
        website : '',
        location : '',
        bio : '',
    });


    let profileInfo = useSelector((state) => {
        return state[profileReducer.profileFeatureKey];
    });

    let userInfo = useSelector((state) => {
        return state[userReducer.usersFeatureKey];
    });

    let {user} = userInfo;

const uploadImage=async(e)=>{
    const file=e.target.files[0];
    const base64=await convertBase64(file);
    setLocalProfile({
        ...localProfile,
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

    let {loading , profile} = profileInfo;

    useEffect(() => {
        dispatch(profileActions.getProfile());
        setLocalProfile({
            image : user.avatar,
            location: profile.location ? profile.location : '',
            website: profile.website ? profile.website : '',
            bio: profile.bio ? profile.bio : '',
        });
    }, []);

    let updateInput = (event) => {
        setLocalProfile({
            ...localProfile,
            [event.target.name] : event.target.value
        });
    };

    let submitUpdateProfile = (event) => {
        event.preventDefault();
        dispatch(profileActions.updateProfile(localProfile , history));
    };

    return (
        <React.Fragment>
            {/* <pre>{JSON.stringify(profile.user)}</pre> */}
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">
                                <i className="fa fa-user-cog"/>
                               {" "} Edit Profile
                            </p>
                            <p>Edit your profile!</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                       {/* <pre>{JSON.stringify(localProfile)}</pre>*/}
                        <section>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8">
                                        <form onSubmit={submitUpdateProfile}>
                                        <div className="col-md-5 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  
                  <img className="rounded mt-5"
               src={localProfile.image} 
               
               style={{width:"80%"}}/>
               
               <span className="font-weight-bold">Upload Profile Photo</span><input type="file" className="text-center form-control" onChange={(e)=>{uploadImage(e)}}/></div>
            </div>
                                            <div className="form-group">
                                                <input
                                                     
                                                    name="company"
                                                    value={localProfile.company}
                                                    onChange={updateInput}
                                                    type="text" className="form-control" placeholder="Company"/>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                     
                                                    name="website"
                                                    value={localProfile.website}
                                                    onChange={updateInput}
                                                    type="text" className="form-control" placeholder="Website"/>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                     
                                                    name="location"
                                                    value={localProfile.location}
                                                    onChange={updateInput}
                                                    type="text" className="form-control" placeholder="Location"/>
                                            </div>
                                            
                                            <div className="form-group">
                                                <textarea
                                                     
                                                    name="bio"
                                                    value={localProfile.bio}
                                                    onChange={updateInput}
                                                    rows="3" className="form-control" placeholder="Biography"/>
                                            </div>
                                            
                                            <div>
                                                <input type="submit" className="btn btn-teal btn-sm" value="Update"/>
                                                <Link to="/profiles/dashboard" className="btn bg-light-grey btn-sm">Back</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment>
            }
            <div style={{marginBottom : '150px'}}/>
        </React.Fragment>
    )
};
export default EditProfile;
