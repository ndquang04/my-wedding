import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useTranslation} from 'react-i18next';

export default function BackToTop() {
  const {t} = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 p-3 bg-primary dark:bg-secondary text-white dark:text-dark-bg rounded-full shadow-lg z-40 hover:bg-primary/90 dark:hover:bg-secondary/90'
          aria-label={t('accessibility.backToTop')}
          initial={{opacity: 0, scale: 0.5}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.5}}
          transition={{duration: 0.3}}
          whileHover={{y: -5}}
        >
          <i className='ri-arrow-up-line text-xl'></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
