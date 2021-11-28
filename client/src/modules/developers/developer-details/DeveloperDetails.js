import React, { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as developerActions from "../../../redux/developers/developer.actions";
import * as developerReducer from "../../../redux/developers/developer.reducer";
import Spinner from "../../../layout/misc/spinner/Spinner";
import { ExternalLink } from 'react-external-link';


let DeveloperDetails = () => {
  let dispatch = useDispatch();

  let developerInfo = useSelector((state) => {
    return state[developerReducer.developerFeatureKey];
  });

  let { loading, selectedProfile } = developerInfo;

  let developerId = useParams().developerId;


//   function createDynamicURL()
// {
    
//     var URL;
//     URL+=selectedProfile.social.twitter
//     return URL;
// }


  useEffect(() => {
    dispatch(developerActions.fetchDeveloper(developerId));
  }, [developerId]);

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
            {/* <pre>{JSON.stringify(selectedProfile)}</pre> */}
          {Object.keys(selectedProfile).length > 0 && (
            <React.Fragment>
              <section className="p-3">
                <div className="container">
                  <div className="row animated zoomIn">
                    <div className="col">
                      <p className="h3 text-teal text-center">
                        <i className="fa fa-user-tie" />{" "}
                        {selectedProfile.user.name}'s Profile{" "}
                      </p>
                     
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className="container bg-success text-white text-center p-3">
                  <div className="row">
                    <div className="col">
                      <img
                        src={selectedProfile.user.avatar}
                        alt=""
                        width="200"
                        height="200"
                        className="rounded-circle profile-img"
                      />
                      <p className="h2">{selectedProfile.user.name}</p>
                      <p className="h6"><a href={selectedProfile.website} target="_blank" style={{color:'white'}}>{selectedProfile.website}</a></p>
                      <p className="h6">{selectedProfile.designation}</p>
                      <p className="h6">{selectedProfile.company}</p>
                      <p>{selectedProfile.location}</p>
                      <div className="d-flex flex-row justify-content-center">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container ">
                  <div className="row">
                    <div className="col text-center">
                      <div className="card my-2">
                        <div className="card-body bg-comment text-black">
                          <p className="h3">
                            {selectedProfile.user.name}'s Biography
                          </p>
                          <p>{selectedProfile.bio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      <div style={{ marginBottom: "150px" }} />
    </React.Fragment>
  );
};
export default DeveloperDetails;
