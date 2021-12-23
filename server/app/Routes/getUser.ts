import User from 'App/Models/User';

export default async ({ request }) => {
  const { slug } = request.params();

  return User
  .query()
  .select('slug', 'name', 'biography', 'picture')
  .where('slug', slug)
  .firstOrFail();
};
