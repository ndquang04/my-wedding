import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';

export default function HeroSection({scrollToSection}) {
  const {t} = useTranslation();

  const handleScrollToSection = (id, event) => {
    event.preventDefault();
    scrollToSection(id);
  };

  // Animation variants
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
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
        duration: 0.6,
      },
    },
  };

  const floatingElements = [
    {
      top: '15%',
      left: '10%',
      size: 'w-12 h-12',
      color: 'bg-secondary/30',
      delay: 0,
    },
    {
      top: '30%',
      right: '15%',
      size: 'w-8 h-8',
      color: 'bg-primary/30',
      delay: 0.5,
    },
    {
      bottom: '25%',
      left: '20%',
      size: 'w-10 h-10',
      color: 'bg-accent/30',
      delay: 1,
    },
    {
      bottom: '15%',
      right: '20%',
      size: 'w-14 h-14',
      color: 'bg-secondary/30',
      delay: 1.5,
    },
  ];

  return (
    <section
      id='home'
      className='relative h-screen flex items-center justify-center overflow-hidden'
    >
      <div className='absolute inset-0 bg-black/30 z-10'></div>
      <div className='absolute inset-0 z-0'>
        <img
          src='https://res.cloudinary.com/quang42000/image/upload/v1679718995/Photos/IMG20220813110800_jmphc2.jpg'
          alt={t('hero.backgroundAlt')}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Floating elements animation */}
      <div className='absolute inset-0 z-0 opacity-40 overflow-hidden'>
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full ${element.size} ${element.color}`}
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
              bottom: element.bottom,
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: element.delay,
            }}
          />
        ))}
      </div>

      <motion.div
        className='container mx-auto px-6 z-20 text-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.h3
          className='font-script text-2xl md:text-4xl text-white mb-2'
          variants={itemVariants}
        >
          {t('hero.weddingCeremony')}
        </motion.h3>

        <motion.h1
          className='font-script text-5xl md:text-7xl lg:text-8xl text-white mb-6 text-shadow'
          variants={itemVariants}
        >
          Duy Quang & Thu Sương
        </motion.h1>

        <motion.p
          className='text-xl md:text-2xl text-white mb-8 font-light'
          variants={itemVariants}
        >
          {t('hero.date')}
        </motion.p>

        <motion.div
          className='flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6'
          variants={itemVariants}
        >
          <a
            href='#rsvp'
            className='py-3 px-8 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all shadow-lg hover:shadow-xl'
            onClick={(e) => handleScrollToSection('rsvp', e)}
          >
            {t('hero.rsvpButton')}
          </a>
          <a
            href='#schedule'
            className='py-3 px-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold rounded-full transition-all border border-white/30'
            onClick={(e) => handleScrollToSection('schedule', e)}
          >
            {t('hero.scheduleButton')}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className='absolute bottom-8 left-1/2 z-20'
        style={{x: '-50%'}}
        animate={{y: [0, 10, 0]}}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <a
          href='#couple'
          className='text-white opacity-75 hover:opacity-100 transition-opacity'
          onClick={(e) => handleScrollToSection('couple', e)}
          aria-label={t('accessibility.scrollDown')}
        >
          <i className='ri-arrow-down-line text-3xl'></i>
        </a>
      </motion.div>
    </section>
  );
}
