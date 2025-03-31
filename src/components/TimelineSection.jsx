import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';

export default function TimelineSection() {
  const {t} = useTranslation();

  // Get wedding events from translation
  const events = [
    {
      id: 'engagement',
      title: t('timeline.events.engagement.title'),
      date: t('timeline.events.engagement.date'),
      time: t('timeline.events.engagement.time'),
      location: t('timeline.events.engagement.location'),
      description: t('timeline.events.engagement.description'),
      icon: 'ri-gift-line',
      position: 'left',
    },
    {
      id: 'ceremony-home',
      title: t('timeline.events.ceremonyHome.title'),
      date: t('timeline.events.ceremonyHome.date'),
      time: t('timeline.events.ceremonyHome.time'),
      location: t('timeline.events.ceremonyHome.location'),
      description: t('timeline.events.ceremonyHome.description'),
      icon: 'ri-home-heart-line',
      position: 'right',
    },
    {
      id: 'ceremony',
      title: t('timeline.events.ceremony.title'),
      date: t('timeline.events.ceremony.date'),
      time: t('timeline.events.ceremony.time'),
      location: t('timeline.events.ceremony.location'),
      description: t('timeline.events.ceremony.description'),
      icon: 'ri-heart-line',
      position: 'left',
    },
    {
      id: 'reception',
      title: t('timeline.events.reception.title'),
      date: t('timeline.events.reception.date'),
      time: t('timeline.events.reception.time'),
      location: t('timeline.events.reception.location'),
      description: t('timeline.events.reception.description'),
      icon: 'ri-cake-3-line',
      position: 'right',
    },
  ];

  const timelineItemVariants = {
    hidden: {opacity: 0, y: 50},
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id='schedule' className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-6'>
        <motion.div
          className='text-center mb-16'
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
        >
          <h2 className='font-script text-3xl md:text-5xl text-primary dark:text-secondary mb-3'>
            {t('timeline.title')}
          </h2>
          <div className='w-24 h-1 bg-primary dark:bg-secondary mx-auto'></div>
        </motion.div>

        <div className='relative'>
          {/* Vertical line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 dark:bg-secondary/30 z-0'></div>

          {/* Timeline events */}
          <div className='relative z-10'>
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className={`flex flex-col md:flex-row items-center mb-12 md:mb-20 ${
                  index === events.length - 1 ? '' : 'mb-12 md:mb-20'
                }`}
                custom={index}
                initial='hidden'
                whileInView='visible'
                viewport={{once: true, margin: '-100px'}}
                variants={timelineItemVariants}
              >
                {event.position === 'left' ? (
                  <>
                    <div className='md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 mt-6 md:mt-0'>
                      <h3 className='font-heading text-2xl md:text-3xl mb-2 text-primary dark:text-secondary'>
                        {event.title}
                      </h3>
                      <p className='text-lg text-gray-700 dark:text-gray-300 mb-1'>
                        <i className='ri-calendar-line mr-2'></i>
                        {event.date}
                      </p>
                      <p className='text-lg text-gray-700 dark:text-gray-300 mb-1'>
                        <i className='ri-time-line mr-2'></i>
                        {event.time}
                      </p>
                      <p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
                        <i className='ri-map-pin-line mr-2'></i>
                        {event.location}
                      </p>
                      <p className='text-gray-600 dark:text-gray-400'>
                        {event.description}
                      </p>
                    </div>
                    <div className='w-14 h-14 flex-shrink-0 bg-primary dark:bg-secondary rounded-full flex items-center justify-center z-10 order-1 md:order-2'>
                      <i
                        className={`${event.icon} text-2xl text-white dark:text-dark-bg`}
                      ></i>
                    </div>
                    <div className='md:w-1/2 md:pl-12 order-3'></div>
                  </>
                ) : (
                  <>
                    <div className='md:w-1/2 md:pr-12 order-1 invisible md:visible'></div>
                    <div className='w-14 h-14 flex-shrink-0 bg-primary dark:bg-secondary rounded-full flex items-center justify-center z-10 order-2'>
                      <i
                        className={`${event.icon} text-2xl text-white dark:text-dark-bg`}
                      ></i>
                    </div>
                    <div className='md:w-1/2 md:pl-12 md:text-left order-3 mt-6 md:mt-0'>
                      <h3 className='font-heading text-2xl md:text-3xl mb-2 text-primary dark:text-secondary'>
                        {event.title}
                      </h3>
                      <p className='text-lg text-gray-700 dark:text-gray-300 mb-1'>
                        <i className='ri-calendar-line mr-2'></i>
                        {event.date}
                      </p>
                      <p className='text-lg text-gray-700 dark:text-gray-300 mb-1'>
                        <i className='ri-time-line mr-2'></i>
                        {event.time}
                      </p>
                      <p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
                        <i className='ri-map-pin-line mr-2'></i>
                        {event.location}
                      </p>
                      <p className='text-gray-600 dark:text-gray-400'>
                        {event.description}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
