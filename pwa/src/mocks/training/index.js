import { homeMock } from './home';
import { selfEvaluationMock } from './self-evaluation';
import { trainingsMock } from './trainings';
import { evaluationsMock } from './evaluations';

const trainingMocks = (mock, baseURL) => {
    homeMock(mock, `${baseURL}`);
    selfEvaluationMock(mock, `${baseURL}/evaluations`);
    trainingsMock(mock, `${baseURL}/trainings`);
    evaluationsMock(mock, `${baseURL}/provas`);
};

export default trainingMocks;
