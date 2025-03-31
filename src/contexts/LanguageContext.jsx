import React, {createContext, useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';

export const SUPPORTED_LANGUAGES = [
  {code: 'vi', name: 'Tiếng Việt'},
  {code: 'en', name: 'English'},
  // {code: 'ko', name: '한국어'},
  // {code: 'ja', name: '日本語'},
];

const LanguageContext = createContext(undefined);

export function LanguageProvider({children}) {
  const {i18n} = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <LanguageContext.Provider
      value={{
        language: i18n.language,
        changeLanguage,
        toggleLanguageDropdown,
        isDropdownOpen,
        closeDropdown,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
