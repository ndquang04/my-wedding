import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';

export default function LocationSection() {
  const {t} = useTranslation();

  const venues = [
    {
      id: 'ceremony',
      type: t('location.venues.ceremony.type'),
      name: t('location.venues.ceremony.name'),
      address: t('location.venues.ceremony.address'),
      time: t('location.venues.ceremony.time'),
      phone: t('location.venues.ceremony.phone'),
      mapImage:
        'https://res.cloudinary.com/quang42000/image/upload/v1679719022/Photos/IMG20230312132355_zeiv1k.jpg',
    },
    {
      id: 'reception',
      type: t('location.venues.reception.type'),
      name: t('location.venues.reception.name'),
      address: t('location.venues.reception.address'),
      time: t('location.venues.reception.time'),
      phone: t('location.venues.reception.phone'),
      mapImage:
        'https://res.cloudinary.com/quang42000/image/upload/v1679718999/Photos/IMG20220813162127_hm8ejo.jpg',
    },
  ];

  const accommodations = [
    {
      id: 'metropole',
      name: t('location.accommodations.hotel1.name'),
      address: t('location.accommodations.hotel1.address'),
      discountCode: t('location.accommodations.hotel1.discountCode'),
    },
    {
      id: 'hilton',
      name: t('location.accommodations.hotel2.name'),
      address: t('location.accommodations.hotel2.address'),
      discountCode: t('location.accommodations.hotel2.discountCode'),
    },
  ];

  // Here in a real application, we would integrate with Google Maps API
  // For now, we're using static images
  const renderMap = (venue) => {
    return (
      <img
        src={venue.mapImage}
        alt={`${venue.name} location map`}
        className='w-full h-full object-cover'
      />
    );
  };

  return (
    <section id='location' className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-6'>
        <motion.div
          className='text-center mb-16'
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
        >
          <h2 className='font-script text-3xl md:text-5xl text-primary dark:text-secondary mb-3'>
            {t('location.title')}
          </h2>
          <div className='w-24 h-1 bg-primary dark:bg-secondary mx-auto'></div>
        </motion.div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              className='w-full lg:w-1/2'
              initial={{opacity: 0, y: 50}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: index * 0.2}}
            >
              <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full'>
                <div className='h-64 bg-gray-200 dark:bg-gray-700 relative'>
                  {/* Google Maps integration would go here */}
                  {renderMap(venue)}
                  <div className='absolute top-4 left-4 bg-primary dark:bg-secondary text-white dark:text-dark-bg py-1 px-3 rounded-full text-sm'>
                    {venue.type}
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='font-heading text-2xl mb-3'>{venue.name}</h3>
                  <p className='flex items-start mb-2'>
                    <i className='ri-map-pin-line text-primary dark:text-secondary mr-2 mt-1'></i>
                    <span>{venue.address}</span>
                  </p>
                  <p className='flex items-start mb-2'>
                    <i className='ri-time-line text-primary dark:text-secondary mr-2 mt-1'></i>
                    <span>{venue.time}</span>
                  </p>
                  <p className='flex items-start mb-4'>
                    <i className='ri-phone-line text-primary dark:text-secondary mr-2 mt-1'></i>
                    <span>{venue.phone}</span>
                  </p>
                  <div className='flex space-x-3'>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        venue.address
                      )}`}
                      className='py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-md flex items-center transition-colors'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <i className='ri-navigation-line mr-2'></i>
                      <span>{t('location.getDirections')}</span>
                    </a>
                    <a
                      href='#'
                      className='py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md flex items-center transition-colors'
                    >
                      <i className='ri-information-line mr-2'></i>
                      <span>{t('location.moreInfo')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Accommodation Info */}
        <motion.div
          className='mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5, delay: 0.6}}
        >
          <h3 className='font-heading text-2xl mb-4 text-primary dark:text-secondary'>
            {t('location.accommodationsTitle')}
          </h3>
          <p className='mb-4 text-gray-600 dark:text-gray-300'>
            {t('location.accommodationsDescription')}
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {accommodations.map((hotel) => (
              <div key={hotel.id} className='flex items-start'>
                <i className='ri-hotel-line text-primary dark:text-secondary text-xl mt-1 mr-3'></i>
                <div>
                  <h4 className='font-semibold text-lg'>{hotel.name}</h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {hotel.address}
                    <br />
                    {t('location.discountCodeLabel')}: {hotel.discountCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
