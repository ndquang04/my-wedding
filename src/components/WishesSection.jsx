import {useTranslation} from 'react-i18next';
import {motion, AnimatePresence} from 'framer-motion';
import {useState, useRef} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {apiRequest} from '../lib/queryClient';
import {useToast} from '../hooks/use-toast';
import {format} from 'date-fns';
import {vi, enUS, ja, ko} from 'date-fns/locale';
import EmojiPicker from './EmojiPicker';
import {useLanguage} from '../contexts/LanguageContext';

// Emoji options for the picker
const EMOJI_OPTIONS = [
  '❤️',
  '👏',
  '🎉',
  '💍',
  '🥂',
  '💕',
  '💐',
  '🎊',
  '💒',
  '👰',
  '🤵',
  '😍',
];

export default function WishesSection() {
  const {t} = useTranslation();
  const {language} = useLanguage();
  const {toast} = useToast();
  const queryClient = useQueryClient();
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const nameInputRef = useRef(null);
  const commentTextareaRef = useRef(null);

  // Get appropriate locale for date formatting
  const getLocale = () => {
    switch (language) {
      case 'en':
        return enUS;
      case 'vi':
        return vi;
      case 'ja':
        return ja;
      case 'ko':
        return ko;
      default:
        return vi;
    }
  };

  // Fetch comments with pagination
  const {
    data: commentsData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQuery({
    queryKey: ['/api/comments'],
    queryFn: async () => {
      const res = await fetch('/api/comments?limit=10&offset=0');
      if (!res.ok) {
        throw new Error('Failed to fetch comments');
      }
      return res.json();
    },
  });

  // Add new comment
  const addCommentMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest('POST', '/api/comments', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t('wishes.successToast.title'),
        description: t('wishes.successToast.description'),
      });

      // Reset form
      if (nameInputRef.current) nameInputRef.current.value = '';
      if (commentTextareaRef.current) commentTextareaRef.current.value = '';

      // Invalidate comments query to refresh the list
      queryClient.invalidateQueries({queryKey: ['/api/comments']});
    },
    onError: (error) => {
      toast({
        title: t('wishes.errorToast.title'),
        description: error.message || t('wishes.errorToast.description'),
        variant: 'destructive',
      });
    },
  });

  // Add reaction to comment
  const addReactionMutation = useMutation({
    mutationFn: async (data) => {
      const response = await apiRequest('POST', '/api/reactions', data);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate comments query to refresh reactions
      queryClient.invalidateQueries({queryKey: ['/api/comments']});
      setIsEmojiPickerOpen(false);
    },
    onError: (error) => {
      toast({
        title: t('wishes.reactionErrorToast.title'),
        description:
          error.message || t('wishes.reactionErrorToast.description'),
        variant: 'destructive',
      });
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!nameInputRef.current || !commentTextareaRef.current) return;

    const name = nameInputRef.current.value.trim();
    const comment = commentTextareaRef.current.value.trim();

    if (!name || !comment) {
      toast({
        title: t('wishes.validationToast.title'),
        description: t('wishes.validationToast.description'),
        variant: 'destructive',
      });
      return;
    }

    addCommentMutation.mutate({name, comment});
  };

  const handleReaction = (emojiCode, commentId) => {
    addReactionMutation.mutate({
      comment_id: commentId,
      emoji: emojiCode,
    });
  };

  const handleEmojiPickerOpen = (commentId) => {
    setActiveCommentId(commentId);
    setIsEmojiPickerOpen(true);
  };

  const handleEmojiPickerClose = () => {
    setIsEmojiPickerOpen(false);
  };

  const handleEmojiSelect = (emoji) => {
    if (activeCommentId !== null) {
      handleReaction(emoji, activeCommentId);
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Format date based on current language
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'PP', {locale: getLocale()});
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <section id='wishes' className='py-20 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-6'>
        <motion.div
          className='text-center mb-12'
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
        >
          <h2 className='font-script text-3xl md:text-5xl text-primary dark:text-secondary mb-3'>
            {t('wishes.title')}
          </h2>
          <div className='w-24 h-1 bg-primary dark:bg-secondary mx-auto'></div>
          <p className='mt-4 text-gray-600 dark:text-gray-300 max-w-xl mx-auto'>
            {t('wishes.subtitle')}
          </p>
        </motion.div>

        {/* Add Comment Form */}
        <motion.div
          className='max-w-3xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
        >
          <form onSubmit={handleCommentSubmit}>
            <div className='mb-4'>
              <label
                htmlFor='commenterName'
                className='block text-gray-700 dark:text-gray-300 mb-2'
              >
                {t('wishes.form.nameLabel')}:
              </label>
              <input
                type='text'
                id='commenterName'
                ref={nameInputRef}
                className='w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-colors'
                placeholder={t('wishes.form.namePlaceholder')}
                required
              />
            </div>

            <div className='mb-6'>
              <label
                htmlFor='commentText'
                className='block text-gray-700 dark:text-gray-300 mb-2'
              >
                {t('wishes.form.commentLabel')}:
              </label>
              <textarea
                id='commentText'
                ref={commentTextareaRef}
                className='w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary transition-colors'
                placeholder={t('wishes.form.commentPlaceholder')}
                rows={4}
                required
              ></textarea>
            </div>

            <div className='text-right'>
              <button
                type='submit'
                disabled={addCommentMutation.isPending}
                className='py-2 px-6 bg-primary hover:bg-primary/90 dark:bg-secondary dark:hover:bg-secondary/90 text-white dark:text-dark-bg font-semibold rounded-md transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {addCommentMutation.isPending
                  ? t('wishes.form.submitting')
                  : t('wishes.form.submitButton')}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Comments List */}
        <div className='max-w-3xl mx-auto'>
          {isLoading ? (
            <div className='text-center py-8'>
              <p>{t('wishes.loading')}</p>
            </div>
          ) : error ? (
            <div className='text-center py-8 text-red-500 dark:text-red-400'>
              {/* <p>{t('wishes.error')}</p> */}
              <p></p>
            </div>
          ) : commentsData?.comments.length === 0 ? (
            <div className='text-center py-8'>
              <p>{t('wishes.noComments')}</p>
            </div>
          ) : (
            <>
              <AnimatePresence>
                {commentsData?.comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    className='mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.5, delay: index * 0.1}}
                  >
                    <div className='flex items-start mb-4'>
                      <div className='w-12 h-12 rounded-full bg-primary/20 dark:bg-secondary/20 flex items-center justify-center text-primary dark:text-secondary text-xl font-bold mr-4'>
                        {getInitials(comment.name)}
                      </div>
                      <div>
                        <h4 className='font-semibold text-lg'>
                          {comment.name}
                        </h4>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                          {formatDate(comment.created_at)}
                        </p>
                      </div>
                    </div>

                    <p className='text-gray-700 dark:text-gray-300 mb-4'>
                      {comment.comment}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {comment.reactions.map((reaction) => (
                        <button
                          key={reaction.id}
                          className='emoji-selector inline-flex items-center py-1 px-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm transition-colors'
                          onClick={() =>
                            handleReaction(reaction.emoji, comment.id)
                          }
                        >
                          <span className='mr-1'>{reaction.emoji}</span>
                          <span>{reaction.count}</span>
                        </button>
                      ))}
                      <button
                        className='emoji-add emoji-selector inline-flex items-center py-1 px-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm transition-colors'
                        onClick={() => handleEmojiPickerOpen(comment.id)}
                      >
                        <i className='ri-add-line'></i>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {hasNextPage && (
                <div className='text-center mt-10'>
                  <button
                    onClick={handleLoadMore}
                    disabled={isFetchingNextPage}
                    className='py-2 px-6 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-md border border-gray-300 dark:border-gray-600 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed'
                  >
                    {isFetchingNextPage
                      ? t('wishes.loadingMore')
                      : t('wishes.loadMoreButton')}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Emoji Picker */}
      <EmojiPicker
        isOpen={isEmojiPickerOpen}
        onClose={handleEmojiPickerClose}
        onSelect={handleEmojiSelect}
        emojis={EMOJI_OPTIONS}
      />
    </section>
  );
}
