// KeywordContext.js

import React, { createContext, useState } from 'react';

const SearchKeywordContext = createContext();

export const SearchKeywordProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('');

  return (
    <SearchKeywordContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchKeywordContext.Provider>
  );
};

export default SearchKeywordContext;
