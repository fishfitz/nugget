import { login } from 'App/Utils/twitter';

export default async ({ auth, request }) => {
  const { code, state } = request.all();
  const user = await login({ code, state });

  await auth.use('web').login(user);
};
