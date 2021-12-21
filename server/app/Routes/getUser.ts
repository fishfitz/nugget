import User from 'App/Models/User';

export default ({ request }) => {
  const { slug } = request.params();
  return User
    .query()
    .select('slug', 'name', 'biography')
    .where('slug', slug)
    .firstOrFail();
};
