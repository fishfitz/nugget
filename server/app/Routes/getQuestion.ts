import Question from 'App/Models/Question';

export default ({ request }) => {
  const { slug, id } = request.params();

  return Question
    .query()
    .select('id', 'created_at', 'content', 'answered_at', 'answer', 'tweet_id')
    .where('id', id)
    .where('is_deleted', false)
    .whereHas('user', (query) => {
      query.where('slug', slug);
    })
    .firstOrFail();
};
