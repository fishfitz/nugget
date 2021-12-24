export default async ({ auth }) => {
  await auth.use('web').logout();
};
