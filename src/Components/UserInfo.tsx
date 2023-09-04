import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserData {
  name: {
    first: string;
    last: string;
  };
  email: string;
}

const UserInfo: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      const { results } = response.data;
      if (results && results.length > 0) {
        setUserData(results[0]);
        localStorage.setItem("userData", JSON.stringify(results[0]));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      fetchUserData();
    }
  }, []);
 
  return (
    <>
      {!userData ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>User Information</h1>
          <button onClick={fetchUserData}>Refresh</button>
          <div>
            <p>Name: {`${userData.name?.first} ${userData.name?.last}`}</p>
            <p>Email: {userData.email}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;    
