import Question from 'App/Models/Question';
import User from 'App/Models/User';

export default async ({ request }) => {
  const { slug, id } = request.params();

  const user = await User.findByOrFail('slug', slug);
  /* todo: check if user is auth user */

  const question = await Question.findOrFail(id);

  await question
    .merge({ isDeleted: true })
    .save();
};
