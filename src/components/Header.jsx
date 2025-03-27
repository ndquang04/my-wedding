import React from 'react';

const Header = () => {
  return (
    <header>
      <a href='/' className='logo'>
        Wedding
      </a>
      <a href='#' className='menu'>
        <ion-icon name='menu-outline'></ion-icon>0
      </a>
      <ul className='nav'>
        <li>
          <a href='/' className='nav-btn active' data-target='/home'>
            <ion-icon name='home-outline'></ion-icon>
          </a>
        </li>
        <li>
          <a href='#' className='nav-btn' data-target='/about'>
            about
          </a>
        </li>
        <li>
          <a href='#' className='nav-btn' data-target='/services'>
            services
          </a>
        </li>
        <li>
          <a href='#' className='nav-btn' data-target='/portfolio'>
            portfolio
          </a>
        </li>
        <li>
          <a href='#' className='nav-btn' data-target='/contact'>
            contact
          </a>
        </li>
      </ul>
      <div className='search'>
        <input type='text' placeholder='Search' />
        <ion-icon name='search-outline'></ion-icon>
      </div>
    </header>
  );
};

export default Header;
