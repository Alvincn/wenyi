// KeywordContext.js

import React, { createContext, useState } from 'react';

const UserCenterContext = createContext();

export const UserCenterProvider = ({ children }) => {
  const [user, setUser] = useState('');

  return (
    <UserCenterContext.Provider value={{ user, setUser }}>
      {children}
    </UserCenterContext.Provider>
  );
};

export default UserCenterContext;
