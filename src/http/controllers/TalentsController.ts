import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';

const client = new DynamoDB({ region: 'us-east-1' });

class TalentsController {
  public async index(req: Request, res: Response, next: NextFunction) {
    res.send('Hello World!');
  }

  public async show(req: Request, res: Response, next: NextFunction) {
    res.send('Hello World!');
  }
  
  public async store(req: Request, res: Response, next: NextFunction) {
    const { 
      position, 
      salary, 
      yearsExperience, 
      skills, 
      region, 
      availability, 
      email, 
      name, 
      education, 
      languages, 
      contact,
      occupation
    } = req.body;
  
    const params = {
      TableName: 'talents-table-dev',
      Item: {
        PK: `TALENT#${uuid()}`,
        SK: 'PROFILE#INFO',
        position: position,
        salary: salary,
        yearsExperience: yearsExperience,
        skills: JSON.stringify(skills),
        region: region,
        availability: availability,
        email: email,
        name: name,
        education: education,
        languages: JSON.stringify(languages),
        contact: contact,
        occupation: occupation,
        createdAt: new Date().toISOString()
      }
    };
  
    const resource = await client.send(new PutCommand(params));
  
    return res.send({ resource });
  }
}

export default new TalentsController();