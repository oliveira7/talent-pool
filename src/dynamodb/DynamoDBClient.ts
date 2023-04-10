import { DynamoDB } from '@aws-sdk/client-dynamodb';

export class DynamoDBClient {
  private client: DynamoDB;

  constructor() {
    this.client = new DynamoDB({ region: 'us-east-1' });
  }

  public getClient(): DynamoDB {
    return this.client;
  }
}