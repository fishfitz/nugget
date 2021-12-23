import { pick } from 'lodash';
import Question from 'App/Models/Question';
import User from 'App/Models/User';

export default async ({ request }) => {
  const { slug } = request.params();
  const { content } = request.all();
  /* todo: sanitize content */

  const user = await User.findByOrFail('slug', slug);

  const question = await Question.create({
    content,
    userId: user.id,
    ip: request.ip()
  });

  return pick(
    question.toJSON(),
    ['id', 'created_at', 'content', 'answered_at', 'answer', 'tweet_id']
  );
};
