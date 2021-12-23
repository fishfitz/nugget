import { pick } from 'lodash';
import { DateTime } from 'luxon';
import Question from 'App/Models/Question';
import User from 'App/Models/User';
import { postTweet } from 'App/Utils/twitter';

export default async ({ request }) => {
  const { slug, id } = request.params();
  const { answer, tweet } = request.all();
  /* todo: sanitize answer */

  const user = await User.findByOrFail('slug', slug);
  /* todo: check if user is auth user */

  const question = await Question.findOrFail(id);

  await question
    .merge({
      answer,
      answeredAt: DateTime.now(),
      tweetId: tweet ? (await postTweet(user, answer)) : undefined
    })
    .save();

  return pick(
    question.toJSON(),
    ['id', 'created_at', 'content', 'answered_at', 'answer', 'tweet_id']
  );
};
