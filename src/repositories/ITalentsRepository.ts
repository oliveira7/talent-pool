import { ITalent } from './ITalent';

export interface ITalentsRepository {
  index: () => Promise<string>;
  show: () => Promise<string>;
  persist: (params: ITalent) => Promise<any>;
}