import { IRegisterTalentParams } from './IRegisterTalentParams';
import { ITalent } from '../repositories/ITalent';

export interface ITalentsService {
    getParams(body: IRegisterTalentParams): object;
    registerTalent(params: ITalent): Promise<any>;
}