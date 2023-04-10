import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { ITalentsRepository } from './ITalentsRepository';
import { ITalent } from './ITalent';
import { injectable } from 'tsyringe';

const client = new DynamoDB({ region: 'us-east-1' }); //TODO: Remover essa dependencia daqui

@injectable()
export class TalentsRepository implements ITalentsRepository{
  async index() {
    return 'Hello World!';
  }

  async show() {
    return 'Hello World!';
  }
  
  async persist(params: ITalent): Promise<any> {
    return await client.send(new PutCommand(params));
  }
}