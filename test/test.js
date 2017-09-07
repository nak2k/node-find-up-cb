const test = require('tape');
const findUp = require('..');

test('test', t => {
  t.plan(2);

  findUp('foo.txt', { cwd: __dirname + '/data/foo' }, (err, path) => {
    t.error(err);
    t.equal(path, __dirname + '/data/foo.txt');
  });
});

test('test', t => {
  t.plan(2);

  findUp('package.json', (err, path) => {
    t.error(err);
    t.ok(path.endsWith('/package.json'));
  });
});
