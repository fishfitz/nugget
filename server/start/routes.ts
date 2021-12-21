import Route from '@ioc:Adonis/Core/Route';
import getUser from 'App/Routes/getUser';
import getQuestions from 'App/Routes/getQuestions';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.get('/user/:slug', getUser);
Route.get('/user/:slug/questions', getQuestions);
