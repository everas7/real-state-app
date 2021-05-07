import { Example } from "../interfaces/example.interface";
import * as exampleRepository from '../repositories/example.repository';

export const getAllExamples = async (): Promise<Example[]> => {
  return exampleRepository.findAll();
};
