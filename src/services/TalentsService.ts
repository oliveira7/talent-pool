import { TalentsRepository } from '../repositories/TalentsRepository';
import { IRegisterTalentParams } from './IRegisterTalentParams';
import { ITalentsService } from './ITalentsService';
import { ITalent } from '../repositories/ITalent';
import { v4 as uuid } from 'uuid';

export class TalentsService implements ITalentsService {
  constructor(private talentsRepository: TalentsRepository){
    talentsRepository = this.talentsRepository;
  }

  getParams(body: IRegisterTalentParams): ITalent {
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
    } = body;

    return {
      TableName: 'talents-table-dev',
      Item: {
        PK: `TALENT#${uuid()}`,
        SK: 'PROFILE#INFO',
        position: position,
        salary: parseInt(salary),
        yearsExperience: parseInt(yearsExperience),
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
  }

  async registerTalent(params: ITalent) {
    // const talent = await this.talentsRepository.findTalentByEmail(params.email);

    // if(talent) {
    //   throw new TalentAlreadyExists();
    // }

    return this.talentsRepository.persist(params);
  }
}