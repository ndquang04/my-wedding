import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {apiRequest} from '../lib/queryClient';
import {useMutation} from '@tanstack/react-query';
import {useToast} from '../hooks/use-toast';

// Extend zod schema for form validation
const rsvpSchema = z.object({
  name: z.string().min(1, {message: 'Name is required'}),
  email: z.string().email({message: 'Invalid email address'}),
  phone: z.string().optional(),
  attending: z.enum(['yes', 'no'], {
    required_error: "Please indicate whether you'll attend",
  }),
  guests: z.number().min(0).max(10),
  events: z.array(z.string()).optional(),
  dietary: z.string().optional(),
  message: z.string().optional(),
});

export default function RSVPSection() {
  const {t} = useTranslation();
  const {toast} = useToast();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guests: 0,
      events: [],
    },
  });

  const isAttending = watch('attending') === 'yes';

  const rsvpMutation = useMutation({
    mutationFn: async (data) => {
      // Transform form data to match backend expectations
      const formattedData = {
        ...data,
        attending: data.attending === 'yes',
        events: data.events || [],
      };

      const response = await apiRequest('POST', '/api/rsvp', formattedData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t('rsvp.successToast.title'),
        description: t('rsvp.successToast.description'),
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: t('rsvp.errorToast.title'),
        description: error.message || t('rsvp.errorToast.description'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data) => {
    rsvpMutation.mutate(data);
  };

  return (
    <section id='rsvp' className='py-20 bg-light-bg dark:bg-dark-bg'>
      <div className='container mx-auto px-6'>
        <motion.div
          className='text-center mb-12'
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
        >
          <h2 className='font-script text-3xl md:text-5xl text-primary dark:text-secondary mb-3'>
            {t('rsvp.title')}
          </h2>
          <div className='w-24 h-1 bg-primary dark:bg-secondary mx-auto'></div>
          <p className='mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto'>
            {t('rsvp.subtitle')}{' '}
            <span className='font-semibold'>{t('rsvp.deadline')}</span>.
          </p>
        </motion.div>

        <motion.div
          className='max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-6'>
              <label
                htmlFor='name'
                className='block text-gray-700 dark:text-gray-300 mb-2'
              >
                {t('rsvp.form.nameLabel')}:
              </label>
              <input
                type='text'
                id='name'
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.name
                    ? 'border-red-500 dark:border-red-400'
                    : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-colors`}
                placeholder={t('rsvp.form.namePlaceholder')}
                {...register('name')}
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block text-gray-700 dark:text-gray-300 mb-2'
              >
                {t('rsvp.form.emailLabel')}:
              </label>
              <input
                type='email'
                id='email'
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.email
                    ? 'border-red-500 dark:border-red-400'
                    : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-colors`}
                placeholder={t('rsvp.form.emailPlaceholder')}
                {...register('email')}
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className='mb-6'>
              <label
                htmlFor='phone'
                className='block text-gray-700 dark:text-gray-300 mb-2'
              >
                {t('rsvp.form.phoneLabel')}:
              </label>
              <input
                type='tel'
                id='phone'
                className='w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-colors'
                placeholder={t('rsvp.form.phonePlaceholder')}
                {...register('phone')}
              />
            </div>

            <div className='mb-6'>
              <label className='block text-gray-700 dark:text-gray-300 mb-2'>
                {t('rsvp.form.attendingLabel')}
              </label>
              <div className='flex space-x-4'>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    value='yes'
                    className='mr-2 text-primary'
                    {...register('attending')}
                  />
                  <span>{t('rsvp.form.attendingYes')}</span>
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    value='no'
                    className='mr-2 text-primary'
                    {...register('attending')}
                  />
                  <span>{t('rsvp.form.attendingNo')}</span>
                </label>
              </div>
              {errors.attending && (
                <p className='mt-1 text-sm text-red-500 dark:text-red-400'>
                  {errors.attending.message}
                </p>
              )}
            </div>

            {isAttending && (
              <>
                <div className='mb-6'>
                  <label
                    htmlFor='guests'
                    className='block text-gray-700 dark:text-gray-300 mb-2'
                  >
                    {t('rsvp.form.guestsLabel')}:
                  </label>
                  <select
                    id='guests'
                    className='w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-colors'
                    {...register('guests', {valueAsNumber: true})}
                  >
                    <option value={0}>
                      {t('rsvp.form.guestsOptions.none')}
                    </option>
                    <option value={1}>
                      {t('rsvp.form.guestsOptions.one')}
                    </option>
                    <option value={2}>
                      {t('rsvp.form.guestsOptions.two')}
                    </option>
                    <option value={3}>
                      {t('rsvp.form.guestsOptions.three')}
                    </option>
                    <option value={4}>
                      {t('rsvp.form.guestsOptions.four')}
                    </option>
                    <option value={5}>
                      {t('rsvp.form.guestsOptions.fivePlus')}
                    </option>
                  </select>
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='events'
                    className='block text-gray-700 dark:text-gray-300 mb-2'
                  >
                    {t('rsvp.form.eventsLabel')}
                  </label>
                  <div className='space-y-2'>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        value='ceremony'
                        className='mr-2 text-primary'
                        {...register('events')}
                      />
                      <span>{t('rsvp.form.eventsCeremony')}</span>
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        value='reception'
                        className='mr-2 text-primary'
                        {...register('events')}
                      />
                      <span>{t('rsvp.form.eventsReception')}</span>
                    </label>
                  </div>
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='dietary'
                    className='block text-gray-700 dark:text-gray-300 mb-2'
                  >
                    {t('rsvp.form.dietaryLabel')}:
                  </label>
                  <textarea
                    id='dietary'
                    className='w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-colors'
                    placeholder={t('rsvp.form.dietaryPlaceholder')}
                    rows={3}
                    {...register('dietary')}
                  ></textarea>
                </div>
              </>
            )}

            <div className='mb-6'>
              <label
                htmlFor='message'
                className='block text-gray-700 dark:text-gray-300 mb-2'
              >
                {t('rsvp.form.messageLabel')}:
              </label>
              <textarea
                id='message'
                className='w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-colors'
                placeholder={t('rsvp.form.messagePlaceholder')}
                rows={4}
                {...register('message')}
              ></textarea>
            </div>

            <div className='text-center'>
              <button
                type='submit'
                disabled={rsvpMutation.isPending}
                className='py-3 px-8 bg-primary hover:bg-primary/90 dark:bg-secondary dark:hover:bg-secondary/90 text-white dark:text-dark-bg font-semibold rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {rsvpMutation.isPending
                  ? t('rsvp.form.submitting')
                  : t('rsvp.form.submitButton')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
