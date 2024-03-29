import React, { useState, useEffect } from "react";
import Profileimage1 from "../../assets/Images/Profilesimage/1.png";
import Profileimage2 from "../../assets/Images/Profilesimage/2.png";
import Profileimage3 from "../../assets/Images/Profilesimage/3.png";
import Heart from "../../assets/Images/Heart.png";
import SellerServices from "../../services/API/SellerServices"; //~/services/API/SellerServices
import { Link } from "react-router-dom";

const SavedSellers = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "John Doe", profileType: "User", imageUrl: Profileimage1 },
    { id: 2, name: "Jane Smith", profileType: "User", imageUrl: Profileimage2 },
    {
      id: 3,
      name: "Rachel Smith",
      profileType: "User",
      imageUrl: Profileimage3,
    },
    { id: 4, name: "Bil Smith", profileType: "Admin", imageUrl: Profileimage2 },
    // Add more profiles here
  ]);

  const [sortBy, setSortBy] = useState("profileType");
  const [isGrid, setIsGrid] = useState(true);
  const [saveseller, setSaveSeller] = useState({});
  const getUserSaveSeller = () => {
    SellerServices.getUserSaveSeller()
      .then((response) => {
      setSaveSeller(response);
    });
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewToggle = () => {
    setIsGrid(!isGrid);
  };

  const sortedProfiles = [...profiles].sort((a, b) => {
    if (sortBy === "profileType") {
      return a.profileType.localeCompare(b.profileType);
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const ProfileDetails = ({ profile }) => (
    <div className="profile-innerdetails" style={{ marginBottom: "20px" }}>
      <div className="prf-id-name" style={{ marginRight: "20px" }}>
        <div className="profileimagesid">
          <img src={Profileimage3} alt={profile.seller.fullname} />
        </div>
        <div>
          <h3>{profile.seller.fullname}</h3>
          <img className="heart" src={Heart} alt="Heart" />
          <Link to={`/sellershop/${profile.seller.guid}`}>Visit Profile</Link>
        </div>
      </div>
    </div>
  );

  const visitProfile = (profileId) => {
    // Logic to visit the profile with ID profileId
    console.log(`Visiting profile ${profileId}`);
  };

  const chunkProfiles = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );

  const profileRows = chunkProfiles(sortedProfiles, 2);
  useEffect(() => {
    getUserSaveSeller();
  }, []);
  return (
    <section id="savedsellers">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h3>Saved sellers</h3>
          {saveseller.length > 0 ? (
            <>
              <p>{saveseller.length} Saved sellers</p>
            </>
          ) : (
            ""
          )}
        </div>
        {saveseller.length > 0 ? (
          <>
          {saveseller.map((savseller, index) => {
            console.log('savseller', savseller)
            return(
              <></>
            )
          })}
            <div className="col-lg-6">
              <div className="sorting">
                <button onClick={handleViewToggle}>
                  {isGrid ? "List View" : "Grid View"}
                </button>
                <select id="sort" value={sortBy} onChange={handleSortChange}>
                  <option value="name">Sort by Names</option>
                  <option value="profileType">Sort by User</option>
                </select>
              </div>
            </div>

            <div className="row" style={{ paddingTop: "10px" }}>
              <div className="saved-profile">
                <div>
                  {isGrid ? (
                    <div className="grid">
                      {saveseller.map((savesell, index) =>{
                        return(
                          <>
                            <div className="grid-profile" key={index}>
                              <ProfileDetails
                                key={savesell.id}
                                profile={savesell}
                              />
                            </div>
                          </>
                          )
                      } )}
                      {/* {profileRows.map((row, index) => (
                        <div className="grid-profile" key={index}>
                          {row.map((profile) => (
                            <ProfileDetails
                              key={profile.id}
                              profile={profile}
                            />
                          ))}
                        </div>
                      ))} */}
                    </div>
                  ) : (
                    <div className="list">
                      {sortedProfiles.map((profile) => (
                        <ProfileDetails key={profile.id} profile={profile} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>No Save Seller Exists!</>
        )}
      </div>
    </section>
  );
};

const visitProfile = (profileId) => {
  // Logic to visit the profile with ID profileId
  console.log(`Visiting profile ${profileId}`);
};

export default SavedSellers;
