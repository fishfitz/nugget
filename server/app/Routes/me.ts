import { pick } from 'lodash';

export default async ({ auth }) => {
  try {
    await auth.use('web').authenticate();

    const user = auth.use('web').user;
    return pick(
      user.toJSON(),
      ['slug', 'name', 'picture']
    );
  }
  catch (e) {
    return null;
  }
};
