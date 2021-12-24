import { pick } from 'lodash';
import stripHtml from 'striptags';
import Question from 'App/Models/Question';
import User from 'App/Models/User';

export default async ({ request }) => {
  const { slug } = request.params();
  const { content } = request.all();

  const user = await User.findByOrFail('slug', slug);

  const question = await Question.create({
    content: stripHtml(content || '').slice(0, 2500),
    userId: user.id,
    ip: request.ip()
  });

  return pick(
    question.toJSON(),
    ['id', 'created_at', 'content', 'answered_at', 'answer', 'tweet_id']
  );
};
