import Event from '@ioc:Adonis/Core/Event';

Event.on('db:query', ({ sql, bindings }) => {
  console.log(sql, bindings);
});
