import Question from 'App/Models/Question';

export default ({ request }) => {
  const { slug } = request.params();
  const { page } = request.all();

  return Question
    .query()
    .select('id', 'created_at', 'content', 'answered_at', 'answer', 'tweet_id')
    .where('is_deleted', false)
    .whereHas('user', (query) => {
      query.where('slug', slug);
    })
    .paginate(page || 1, 20);
};
