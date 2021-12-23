import Route from '@ioc:Adonis/Core/Route';
import getUser from 'App/Routes/getUser';
import getQuestion from 'App/Routes/getQuestion';
import getQuestions from 'App/Routes/getQuestions';
import ask from 'App/Routes/ask';
import answer from 'App/Routes/answer';
import deleteQuestion from 'App/Routes/deleteQuestion';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.get('/user/:slug', getUser);
Route.get('/user/:slug/questions', getQuestions);
Route.get('/user/:slug/question/:id', getQuestion);
Route.post('/user/:slug/ask', ask);
Route.post('/user/:slug/question/:id/answer', answer);
Route.delete('/user/:slug/question/:id', deleteQuestion);
