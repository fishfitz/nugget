import Route from '@ioc:Adonis/Core/Route';
import me from 'App/Routes/me';
import logout from 'App/Routes/logout';
import getUser from 'App/Routes/getUser';
import getQuestion from 'App/Routes/getQuestion';
import getQuestions from 'App/Routes/getQuestions';
import ask from 'App/Routes/ask';
import answer from 'App/Routes/answer';
import deleteQuestion from 'App/Routes/deleteQuestion';
import twitterRedirect from 'App/Routes/twitter/redirect';
import twitterCallback from 'App/Routes/twitter/callback';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.get('/me', me);
Route.post('/logout', logout);

Route.get('/user/:slug', getUser);
Route.get('/user/:slug/questions', getQuestions);
Route.get('/user/:slug/question/:id', getQuestion);
Route.post('/user/:slug/ask', ask);
Route.post('/user/:slug/question/:id/answer', answer);
Route.delete('/user/:slug/question/:id', deleteQuestion);

Route.get('/twitter/redirect', twitterRedirect);
Route.get('/twitter/callback', twitterCallback);
