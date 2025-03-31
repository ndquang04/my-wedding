import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../contexts/ThemeContext';
import {useLanguage, SUPPORTED_LANGUAGES} from '../contexts/LanguageContext';
import {Link} from 'wouter';
import {useScrollPosition} from '../hooks/useScrollPosition';

const Header = ({scrollToSection}) => {
  const {t} = useTranslation();
  const {theme, toggleTheme} = useTheme();
  const {
    language,
    changeLanguage,
    toggleLanguageDropdown,
    isDropdownOpen,
    closeDropdown,
  } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Add event listener to close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen) {
        closeDropdown();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen, closeDropdown]);

  const menuItems = [
    {id: 'home', label: t('menu.home')},
    {id: 'couple', label: t('menu.couple')},
    {id: 'schedule', label: t('menu.schedule')},
    {id: 'gallery', label: t('menu.gallery')},
    {id: 'location', label: t('menu.location')},
    {id: 'rsvp', label: t('menu.rsvp')},
    {id: 'wishes', label: t('menu.wishes')},
  ];

  const handleMenuItemClick = (id, event) => {
    event.preventDefault();
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageToggle = (event) => {
    event.stopPropagation();
    toggleLanguageDropdown();
  };

  const handleLanguageSelect = (lang, event) => {
    event.stopPropagation();
    changeLanguage(lang);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur 
        ${scrollPosition > 20 ? 'shadow-lg' : 'shadow-md'} 
        bg-white/80 dark:bg-gray-900/80`}
    >
      <div className='container mx-auto px-4 py-3'>
        <div className='flex justify-between items-center'>
          <Link
            href='#'
            className='font-script text-2xl md:text-3xl text-pri dark:text-secondary'
          >
            Duy Quang & Thu Sương
          </Link>

          <div className='flex items-center space-x-6'>
            {/* Desktop Menu */}
            <nav className='hidden md:flex space-x-6 items-center'>
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className='hover:text-primary dark:hover:text-secondary transition-colors'
                  onClick={(e) => handleMenuItemClick(item.id, e)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Language Switcher */}
            <div className='relative'>
              <button
                className='flex items-center hover:text-primary dark:hover:text-secondary transition-colors'
                onClick={handleLanguageToggle}
              >
                <i className='ri-global-line text-lg mr-1'></i>
                <span className='hidden md:inline'>
                  {language.toUpperCase()}
                </span>
                <i className='ri-arrow-down-s-line text-sm ml-1'></i>
              </button>

              {isDropdownOpen && (
                <div className='absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 w-32 z-50'>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <a
                      key={lang.code}
                      href='#'
                      className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        language === lang.code
                          ? 'font-semibold text-primary dark:text-secondary'
                          : ''
                      }`}
                      onClick={(e) => handleLanguageSelect(lang.code, e)}
                    >
                      {lang.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              className='text-xl hover:text-primary dark:hover:text-secondary transition-colors'
              onClick={toggleTheme}
              aria-label={
                theme === 'light'
                  ? t('accessibility.switchToDarkMode')
                  : t('accessibility.switchToLightMode')
              }
            >
              <i
                className={`${
                  theme === 'light' ? 'ri-sun-line' : 'ri-moon-line'
                }`}
              ></i>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className='md:hidden text-xl'
              onClick={(e) => {
                e.stopPropagation();
                toggleMobileMenu();
              }}
              aria-label={
                isMobileMenuOpen
                  ? t('accessibility.closeMenu')
                  : t('accessibility.openMenu')
              }
            >
              <i
                className={`${
                  isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'
                }`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden pt-4 pb-2 animate-fade-in-down'>
            <nav className='flex flex-col space-y-3'>
              {menuItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className='hover:text-primary dark:hover:text-secondary transition-colors py-2 border-b border-gray-200 dark:border-gray-700'
                  onClick={(e) => handleMenuItemClick(item.id, e)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
