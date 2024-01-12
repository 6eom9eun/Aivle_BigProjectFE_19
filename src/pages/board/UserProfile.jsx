import React, { useState, useEffect } from "react";
import axios from 'axios';
import { User } from "@nextui-org/react";

function UserProfile({ userId, token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `/accounts/profile/${userId}/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });

        if (response.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProfile();
  }, [userId, token]);

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

export default UserProfile;