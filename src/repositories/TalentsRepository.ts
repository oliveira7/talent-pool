import { ScanCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '../dynamodb/DynamoDBClient';
import { TalentAlreadyExists } from '../http/errors/TalentAlreadyExists';
import { env } from '../env';

export interface ITalentsRepository {
  retrieveAll(queries);
  persist(params): Promise<void>;
  verifyByEmail(email): Promise<void>;
}
export class TalentsRepository implements ITalentsRepository {
  private client;

  constructor() {
    this.client = new DynamoDBClient().getClient();
  }

  async retrieveAll(queries) {
    const { position, salary } = queries;

    const params = {
      TableName: env.TABLE_NAME,
      IndexName: 'PositionSalaryIndex',
      KeyConditionExpression: '#position = :position AND salary > :salary',
      ExpressionAttributeNames: {
        '#position': 'position',
      },
      ExpressionAttributeValues: {
        ':position': { S: position },
        ':salary': { N: salary }
      },
      Select: 'ALL_ATTRIBUTES'
    };

    return await this.client.send(new QueryCommand(params));
  }

  async persist(params): Promise<void> {
    await this.verifyByEmail(params.email);

    await this.client.send(new PutCommand({
      TableName: env.TABLE_NAME,
      Item: params
    }));
  }

  async verifyByEmail(email): Promise<void> {
    const resource = await this.client.send(new ScanCommand({
      TableName: env.TABLE_NAME,
      IndexName: 'EmailIndex',
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': { S: email },
      },
      Select: 'COUNT',
    }));

    if(resource.Count > 0) {
      throw new TalentAlreadyExists();
    }
  }
}