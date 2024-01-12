import React, { useState, useEffect } from "react";
import axios from 'axios';
import { User } from "@nextui-org/react";

function UserProfile2({ userId, token, profiles, setProfiles }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const userProfile = (userId) => {
      if (profiles[userId]) {
        setProfile(profiles[userId]);
      } else {
        axios.get(process.env.REACT_APP_API_URL + `/accounts/profile/${userId}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            if(response.data) {
              setProfiles(prevProfiles => ({...prevProfiles, [userId]: response.data}));
              setProfile(response.data);
            }
        })
        .catch(error => {
            console.error(error);
        });
      }
    };

    userProfile(userId);
  }, [userId, token, profiles, setProfiles]);

  if (!profile) {
    return <div>로딩 중...</div>;
  }

  return (
    <User   
      name={`Level ${profile.profile.user_level}`}
      description={profile.profile.introduction}
      avatarProps={{
        src: `${profile.profile.image}`
      }}
    />
  );
}

export default UserProfile2;
