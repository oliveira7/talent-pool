import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand, PutCommandOutput, QueryCommand, QueryCommandOutput} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '../dynamodb/DynamoDBClient';
import { env } from '../env';
import { TalentAlreadyExists } from '../http/errors/TalentAlreadyExists';

export interface ITalentsRepository {
  persist(params): Promise<void>;
  verifyByEmail(email): Promise<void>;
  paginate(pageSize);
}
export class TalentsRepository implements ITalentsRepository {
  private client;

  constructor() {
    this.client = new DynamoDBClient().getClient();
  }

  async persist(params): Promise<void> {
    await this.verifyByEmail(params.email);

    await this.client.send(new PutCommand({
      TableName: env.TABLE_NAME,
      Item: params,
      ConditionExpression: 'attribute_not_exists(email)',
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

  async paginate(pageSize) {
    const client = new DynamoDBClient().getClient();

    let results: Record<string, any>[] = [];
    let lastEvaluatedKey;
    do {
      const params = {
        TableName: 'talents-table-dev',
        Limit: pageSize,
        ExclusiveStartKey: lastEvaluatedKey,
      };
  
      const { Items, LastEvaluatedKey } = await client.send(new QueryCommand(params));
  
      if (Items) {
        results = results.concat(Items);
      }
  
      lastEvaluatedKey = LastEvaluatedKey;
    } while (lastEvaluatedKey);
  
    return results;
  }
}