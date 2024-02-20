'use client'
import { useState, useEffect } from 'react';

function useUserData(key = 'user') {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    };

    setUserData(fetchUserData());
  }, [key]);

  return userData;
}

export default useUserData;
