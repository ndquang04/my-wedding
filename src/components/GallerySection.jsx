import {useTranslation} from 'react-i18next';
import {useState, useRef, useEffect} from 'react';
import {motion} from 'framer-motion';

export default function GallerySection() {
  const {t} = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Gallery images from translation
  const galleryImages = [
    {
      id: 'engagement',
      src: 'https://res.cloudinary.com/quang42000/image/upload/v1742392912/foodorder/fnpo8sqlgtqbk7rwcg80.jpg',
      alt: t('gallery.images.engagement.alt'),
      title: t('gallery.images.engagement.title'),
      date: t('gallery.images.engagement.date'),
    },
    {
      id: 'prewedding',
      src: 'https://res.cloudinary.com/quang42000/image/upload/v1679719099/Photos/IMG20230311194407_ehflkr.jpg',
      alt: t('gallery.images.prewedding.alt'),
      title: t('gallery.images.prewedding.title'),
      date: t('gallery.images.prewedding.date'),
    },
    {
      id: 'firstDate',
      src: 'https://res.cloudinary.com/quang42000/image/upload/v1679719095/Photos/IMG20230225173538_epag5m.jpg',
      alt: t('gallery.images.firstDate.alt'),
      title: t('gallery.images.firstDate.title'),
      date: t('gallery.images.firstDate.date'),
    },
    {
      id: 'anniversary',
      src: 'https://res.cloudinary.com/quang42000/image/upload/v1679719008/Photos/IMG20221106213037_qzwkes.jpg',
      alt: t('gallery.images.anniversary.alt'),
      title: t('gallery.images.anniversary.title'),
      date: t('gallery.images.anniversary.date'),
    },
    {
      id: 'proposal',
      src: 'https://res.cloudinary.com/quang42000/image/upload/v1679718983/Photos/IMG20230312145226_d8gnf6.jpg',
      alt: t('gallery.images.proposal.alt'),
      title: t('gallery.images.proposal.title'),
      date: t('gallery.images.proposal.date'),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Update slider position when currentSlide changes
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth =
        sliderRef.current.querySelector('.gallery-slide')?.clientWidth || 0;
      sliderRef.current.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth',
      });
    }
  }, [currentSlide]);

  return (
    <section
      id='gallery'
      className='py-20 bg-light-bg dark:bg-dark-bg overflow-hidden'
    >
      <div className='container mx-auto px-6'>
        <motion.div
          className='text-center mb-16'
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
        >
          <h2 className='font-script text-3xl md:text-5xl text-primary dark:text-secondary mb-3'>
            {t('gallery.title')}
          </h2>
          <div className='w-24 h-1 bg-primary dark:bg-secondary mx-auto'></div>
          <p className='mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto'>
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        <div className='relative'>
          {/* Gallery Controls */}
          <div className='flex justify-between items-center mb-6'>
            <button
              onClick={prevSlide}
              className='p-2 rounded-full bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary hover:bg-primary/20 dark:hover:bg-secondary/20 transition-colors'
              aria-label={t('accessibility.previousSlide')}
            >
              <i className='ri-arrow-left-s-line text-2xl'></i>
            </button>

            <div className='flex space-x-2'>
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index
                      ? 'bg-primary dark:bg-secondary'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={t('accessibility.goToSlide', {number: index + 1})}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className='p-2 rounded-full bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary hover:bg-primary/20 dark:hover:bg-secondary/20 transition-colors'
              aria-label={t('accessibility.nextSlide')}
            >
              <i className='ri-arrow-right-s-line text-2xl'></i>
            </button>
          </div>

          {/* Gallery Slider */}
          <div
            ref={sliderRef}
            className='gallery-slider flex overflow-x-auto no-scrollbar pb-4 hide-scrollbar'
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className='gallery-slide flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2'
                initial={{opacity: 0, scale: 0.9}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: index * 0.1}}
              >
                <motion.div
                  className='relative group overflow-hidden rounded-lg shadow-md'
                  whileHover={{
                    y: -5,
                    boxShadow:
                      '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  }}
                  transition={{duration: 0.3}}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className='w-full h-64 object-cover'
                  />
                  <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                    <div className='text-white text-center p-4'>
                      <p className='font-script text-xl mb-2'>{image.title}</p>
                      <p className='text-sm'>{image.date}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className='text-center mt-10'
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5, delay: 0.5}}
        >
          <a
            href='#'
            className='inline-flex items-center py-3 px-6 bg-primary/10 dark:bg-secondary/10 text-primary dark:text-secondary hover:bg-primary/20 dark:hover:bg-secondary/20 rounded-full transition-colors'
          >
            <span>{t('gallery.viewAllButton')}</span>
            <i className='ri-external-link-line ml-2'></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
