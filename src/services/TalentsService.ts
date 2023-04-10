import { ITalentsRepository } from '../repositories/TalentsRepository';
import { TalentAlreadyExists } from '../http/errors/TalentAlreadyExists';
import { v4 as uuid } from 'uuid';

interface RegisterTalentParams {
    PK: string;
    SK: string;
    position: string;
    salary: number;
    yearsExperience: number;
    technologies: string;
    region: string;
    availability: string;
    name: string;
    email: string;
    education: string;
    languages: string;
    contact: string;
    occupation: string;
    createdAt: string;
}

export interface ITalentsService {
  getParams(body): RegisterTalentParams;
  create(params): Promise<void>;
}

export class TalentsService implements ITalentsService {
  constructor(private talentsRepository: ITalentsRepository){
    this.talentsRepository = talentsRepository;
  }

  getParams(body): RegisterTalentParams {
    const { 
      position, 
      salary, 
      yearsExperience, 
      technologies, 
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
      PK: `TALENT#${uuid()}`,
      SK: 'PROFILE#INFO',
      position: position,
      salary: parseInt(salary),
      yearsExperience: parseInt(yearsExperience),
      technologies: JSON.stringify(technologies),
      region: region,
      availability: availability,
      name: name,
      email: email,
      education: education,
      languages: JSON.stringify(languages),
      contact: contact,
      occupation: occupation,
      createdAt: new Date().toISOString()
    };
  }

  async create(params): Promise<void> {
    await this.talentsRepository.persist(params);
  }
}