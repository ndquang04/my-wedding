import {useTranslation} from 'react-i18next';
import {motion, AnimatePresence} from 'framer-motion';
import {useEffect} from 'react';

export default function EmojiPicker({isOpen, onClose, onSelect, emojis}) {
  const {t} = useTranslation();

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEmojiClick = (emoji) => {
    onSelect(emoji);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center z-50'
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          onClick={handleBackdropClick}
        >
          <motion.div
            className='bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4'
            initial={{scale: 0.9, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.9, opacity: 0}}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-4'>
              <h3 className='font-semibold text-lg'>
                {t('emojiPicker.title')}
              </h3>
              <button
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                onClick={onClose}
                aria-label={t('accessibility.close')}
              >
                <i className='ri-close-line text-xl'></i>
              </button>
            </div>

            <div className='grid grid-cols-6 gap-2'>
              {emojis.map((emoji, index) => (
                <motion.button
                  key={index}
                  className='emoji-option text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded'
                  onClick={() => handleEmojiClick(emoji)}
                  whileHover={{scale: 1.1}}
                  whileTap={{scale: 0.95}}
                  aria-label={`${t('accessibility.selectEmoji')} ${emoji}`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
