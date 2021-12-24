import Question from 'App/Models/Question';
import User from 'App/Models/User';

export default async ({ request, auth }) => {
  const { slug, id } = request.params();

  const user = await User.findByOrFail('slug', slug);
  await auth.use('web').authenticate();
  if (user.id !== auth.use('web').user.id) throw new Error('NOT_AUTHORIZED');

  const question = await Question.findOrFail(id);

  await question
    .merge({ isDeleted: true })
    .save();
};
