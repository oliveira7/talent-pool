export interface ITalent {
  TableName: string;
    Item: {
    PK: string;
    SK: string;
    position: string;
    salary: number;
    yearsExperience: number;
    skills: string;
    region: string;
    availability: string;
    email: string;
    name: string;
    education: string;
    languages: string;
    contact: string;
    occupation: string;
    createdAt: string;
  }
}