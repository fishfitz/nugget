import TwitterApi from 'twitter-api-v2';
import Env from '@ioc:Adonis/Core/Env';
import User from 'App/Models/User';
import ellipsis from 'text-ellipsis';

const client = new TwitterApi({ clientId: Env.get('TWITTER_CLIENT_ID'), clientSecret: Env.get('TWITTER_CLIENT_SECRET') });
const callback = `${Env.get('APP_URL')}`;

const syncUser = async (loggedClient, refreshToken) => {
  const { data } = await loggedClient.v2.me({ 'user.fields': ['id', 'name', 'username', 'description', 'profile_image_url'] });

  const user = await User.updateOrCreate({ twitter_id: data.id }, {
    slug: data.username,
    name: data.name,
    biography: data.description,
    picture: data.profile_image_url.replace('_normal', ''),
    twitter_id: data.id,
    refresh_token: refreshToken
  });

  return user;
};

const getLoggedClient = async (user) => {
  const { client: loggedClient, refreshToken } = await client.refreshOAuth2Token(user.refresh_token);
  user.refresh_token = refreshToken;
  await user.save();
  return loggedClient;
};

export async function postTweet({ user, question, answer }) {
  const link = `${Env.get('APP_URL')}u/${user.slug}?q=${question.id}`;
  const loggedClient = await getLoggedClient(user);
  const { data } = await loggedClient.v2.tweet(`${ellipsis(question.content, 119)}\n— ${ellipsis(answer, 119)}\n${link}`);
  return data.id;
}

const states = {};

export async function initLogin() {
  const { url, codeVerifier, state } = await client.generateOAuth2AuthLink(callback, { scope: ['tweet.read', 'users.read', 'tweet.write', 'offline.access'] });
  states[state] = codeVerifier;
  return url;
}

export async function login({ code, state }) {
  if (!states[state]) throw new Error('BAD_STATE');
  const { client: loggedClient, refreshToken } = await client.loginWithOAuth2({ code, codeVerifier: states[state], redirectUri: callback });
  return syncUser(loggedClient, refreshToken);
}
