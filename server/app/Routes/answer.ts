import { pick } from 'lodash';
import { DateTime } from 'luxon';
import stripHtml from 'striptags';
import Question from 'App/Models/Question';
import User from 'App/Models/User';
import { postTweet } from 'App/Utils/twitter';

export default async ({ request, auth }) => {
  const { slug, id } = request.params();
  const { answer, tweet } = request.all();

  const user = await User.findByOrFail('slug', slug);
  await auth.use('web').authenticate();
  if (user.id !== auth.use('web').user.id) throw new Error('NOT_AUTHORIZED');

  const question = await Question.findOrFail(id);

  await question
    .merge({
      answer: stripHtml(answer || '').slice(0, 2500),
      answeredAt: DateTime.now(),
      tweetId: tweet ? (await postTweet({ user, question, answer })) : undefined
    })
    .save();

  return pick(
    question.toJSON(),
    ['id', 'created_at', 'content', 'answered_at', 'answer', 'tweet_id']
  );
};
