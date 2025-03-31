import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';

export default function CoupleSection() {
  const {t} = useTranslation();

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -5,
      boxShadow:
        '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id='couple' className='py-20 bg-light-bg dark:bg-dark-bg'>
      <div className='container mx-auto px-6'>
        <motion.div
          className='text-center mb-16'
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
        >
          <h2 className='font-script text-3xl md:text-5xl text-primary dark:text-secondary mb-3'>
            {t('couple.title')}
          </h2>
          <div className='w-24 h-1 bg-primary dark:bg-secondary mx-auto'></div>
        </motion.div>

        <motion.div
          className='flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-24'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{once: true}}
        >
          {/* Groom */}
          <motion.div
            className='w-full md:w-1/3 flex flex-col items-center'
            variants={itemVariants}
            whileHover='hover'
          >
            <div className='mb-6 relative'>
              <div className='w-64 h-64 rounded-full overflow-hidden border-4 border-accent'>
                <img
                  src='https://res.cloudinary.com/quang42000/image/upload/v1679719016/Photos/IMG20221124170724_hlr4dy.jpg'
                  alt={t('couple.groom.imageAlt')}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -bottom-2 -right-2 w-16 h-16 bg-primary dark:bg-secondary rounded-full flex items-center justify-center text-white dark:text-dark-bg font-heading text-2xl'>
                <i className='ri-men-line'></i>
              </div>
            </div>
            <h3 className='font-heading text-2xl md:text-3xl mb-2'>
              {t('couple.groom.name')}
            </h3>
            <p className='text-gray-600 dark:text-gray-300 text-center mb-4'>
              {t('couple.groom.description')}
            </p>
            <div className='flex space-x-3'>
              <a
                href='#'
                className='text-primary dark:text-secondary hover:opacity-80 transition-opacity'
              >
                <i className='ri-facebook-fill text-xl'></i>
              </a>
              <a
                href='#'
                className='text-primary dark:text-secondary hover:opacity-80 transition-opacity'
              >
                <i className='ri-instagram-line text-xl'></i>
              </a>
            </div>
          </motion.div>

          {/* Center Symbol */}
          <motion.div className='py-8 md:py-0' variants={itemVariants}>
            <div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 dark:bg-secondary/10 flex items-center justify-center'>
              <span className='font-script text-4xl md:text-5xl text-primary dark:text-secondary'>
                &
              </span>
            </div>
          </motion.div>

          {/* Bride */}
          <motion.div
            className='w-full md:w-1/3 flex flex-col items-center'
            variants={itemVariants}
            whileHover='hover'
          >
            <div className='mb-6 relative'>
              <div className='w-64 h-64 rounded-full overflow-hidden border-4 border-accent'>
                <img
                  src='https://res.cloudinary.com/quang42000/image/upload/v1679719096/Photos/IMG20230225173600_gkk4jd.jpg'
                  alt={t('couple.bride.imageAlt')}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -bottom-2 -right-2 w-16 h-16 bg-primary dark:bg-secondary rounded-full flex items-center justify-center text-white dark:text-dark-bg font-heading text-2xl'>
                <i className='ri-women-line'></i>
              </div>
            </div>
            <h3 className='font-heading text-2xl md:text-3xl mb-2'>
              {t('couple.bride.name')}
            </h3>
            <p className='text-gray-600 dark:text-gray-300 text-center mb-4'>
              {t('couple.bride.description')}
            </p>
            <div className='flex space-x-3'>
              <a
                href='#'
                className='text-primary dark:text-secondary hover:opacity-80 transition-opacity'
              >
                <i className='ri-facebook-fill text-xl'></i>
              </a>
              <a
                href='#'
                className='text-primary dark:text-secondary hover:opacity-80 transition-opacity'
              >
                <i className='ri-instagram-line text-xl'></i>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className='mt-16 md:mt-24 text-center'
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5, delay: 0.8}}
        >
          <p className='italic text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            {t('couple.quote.text')}
            <span className='text-sm mt-2 block'>
              {t('couple.quote.author')}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
