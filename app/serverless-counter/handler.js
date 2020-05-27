'use strict';
const aws = require("aws-sdk");
const Redis = require('ioredis');

// 保留
/**
let getDynamoClient = event => {
  const dynamodb = null;
  if ("isOffline" in event && event.isOffline) {
      dynamodb = new aws.DynamoDB.DocumentClient({
          region: "localhost",
          endpoint: 'http://dynamodb:8000'
      });
  } else {
      dynamodb = new aws.DynamoDB.DocumentClient();
  }
  return dynamodb;
};
*/

module.exports.get_counter = async event => {
  let count = 0;
  const redis = new Redis(6379, "redis");
  const regexp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
  await redis.get("total", (err, result) => {
    if (regexp.test(result)) {
      count = result;
    }
  });
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'get_counter',
        count: count,
        // query: event.queryStringParameters,
        // input: event
      },
      null,
      2
    ),
  };
};

module.exports.post_counter = async event => {
  const redis = new Redis(6379, "redis");
  redis.incr("total")
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'post_counter',
        // query: event.queryStringParameters,
        // input: event
      },
      null,
      2
    ),
  };
};
