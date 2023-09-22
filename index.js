const S3rver = require('s3rver');
const { fromEvent } = require('rxjs');
const { filter } = require('rxjs/operators');
const corsConfig = require.resolve('s3rver/example/cors.xml');
const websiteConfig = require.resolve('s3rver/example/website.xml');
const fs = require("fs-extra");

const instance = new S3rver({
  port: 4569,
  address: '0.0.0.0',
  silent: false,
  serviceEndpoint: process.env.SERVICE_END_POINT? process.env.SERVICE_END_POINT : "http://localhost:4569",
  directory: process.env.DATA_DIR? process.env.DATA_DIR : '/Users/nicolasfodor/Documents/dev21-host/setip.io/s3test/s3rver_test_directory',
  configureBuckets: [
    {
      name: process.env.BUCKET_NAME ? process.env.BUCKET_NAME : 'host.docker.internal',
      configs: [fs.readFileSync(corsConfig), fs.readFileSync(websiteConfig)],
    },
  ],
}).run((err, { address, port } = {}) => {
  if (err) {
    console.error(err);
  } else {
    console.log('now listening at address %s and port %d', address, port);
  }
});

const s3Events = fromEvent(instance, 'event');
s3Events.subscribe((event) => console.log(event));
s3Events
  .pipe(filter((event) => event.Records[0].eventName == 'ObjectCreated:Copy'))
  .subscribe((event) => console.log(event));