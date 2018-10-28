import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "doclog",
    Item: {
      userid: event.requestContext.identity.cognitoIdentityId,
      logid: uuid.v1(),
      medication: data.medication,
      dosage: data.dosage,
      question: data.question,
      complete: data.complete,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}