import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "food",
    Item: {
      foodId: uuid.v1(),
	  brand: data.brand,
	  foodname: data.name,
	  servingsize: data.servingsize,
	  servingpercontainer: data.servingpercontainer,
	  amtperserving: data.amtperserving,
	  calories: data.calories,
	  totalfat: data.totalfat,
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

