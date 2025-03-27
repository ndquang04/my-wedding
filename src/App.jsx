import React, {useState} from 'react';
import Image, {dataImage} from './components/Images';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import Header from './components/Header';
console.log('dataImage', dataImage);

const App = () => {
  const [isActive, setIsActive] = useState(0);
  return (
    <div className='flex'>
      <Header />
      <div className='image-container flex m-auto max-w-[480px] overflow-hidden relative'>
        {dataImage.map((item) => (
          <>
            {isActive === item.id && (
              <Image
                key={item.id}
                name={item.name}
                // className={isActive === item.id + 1 ? 'slide' : ''}
              />
            )}

            {console.log(item.id)}
            {isActive !== 0 && (
              <FaArrowLeft
                className='icon icon-prev'
                size={40}
                onClick={() => setIsActive((prev) => prev - 1)}
              />
            )}
            {isActive !== dataImage.length - 1 && (
              <FaArrowRight
                className='icon icon-next'
                size={40}
                onClick={() => setIsActive((prev) => prev + 1)}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default App;
