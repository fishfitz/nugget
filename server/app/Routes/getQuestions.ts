import Question from 'App/Models/Question';

export default ({ request }) => {
  const { slug } = request.params();
  const { page, answered } = request.all();

  let query = Question
    .query()
    .select('id', 'created_at', 'content', 'answered_at', 'answer', 'tweet_id')
    .where('is_deleted', false)
    .whereHas('user', (query) => {
      query.where('slug', slug);
    });

  if (answered) query = query.where('answered_at', 'IS', 'NOT NULL');

  return query.paginate(page || 1, 20);
};
