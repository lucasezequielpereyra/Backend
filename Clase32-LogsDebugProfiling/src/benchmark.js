import autocannon from 'autocannon';
import { PassThrough } from 'stream';

const run = url => {
  const buf = [];
  const outputStream = new PassThrough();

  const inst = autocannon({
    url,
    connections: 100,
    pipelining: 1,
    duration: 20,
  });

  autocannon.track(inst, { outputStream });

  outputStream.on('data', data => buf.push(data));
  inst.on('done', () => {
    process.stdout.write(Buffer.concat(buf));
  });
};

console.log('Running benchmark...');

run('http://localhost:8081/info');
