import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';

export default function Footer() {
  const {t} = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {icon: 'ri-facebook-fill', url: '#', label: 'Facebook'},
    {icon: 'ri-instagram-line', url: '#', label: 'Instagram'},
    {icon: 'ri-mail-line', url: 'mailto:contact@example.com', label: 'Email'},
    {icon: 'ri-phone-line', url: 'tel:+84123456789', label: 'Phone'},
  ];

  return (
    <footer className='py-12 bg-gray-800 dark:bg-gray-950 text-white'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <motion.div
            className='text-center md:text-left mb-8 md:mb-0'
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5}}
          >
            <h3 className='font-script text-3xl text-primary dark:text-secondary mb-4'>
              {t('footer.coupleNames')}
            </h3>
            <p className='mb-2 text-gray-300'>{t('footer.date')}</p>
            <p className='text-gray-400'>{t('footer.venue')}</p>
          </motion.div>

          <motion.div
            className='flex flex-col items-center md:items-end'
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: 0.2}}
          >
            <div className='flex space-x-4 mb-4'>
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className='text-xl hover:text-primary dark:hover:text-secondary transition-colors'
                  aria-label={link.label}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>

            <p className='text-gray-400 text-sm'>
              &copy; {currentYear} {t('footer.copyright')}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
