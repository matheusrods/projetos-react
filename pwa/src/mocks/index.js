import AxiosMockAdapter from 'axios-mock-adapter';
import { api, getBaseURL } from '../services/api';

import trainingMock from './training';

const mocks = () => {
    const mock = new AxiosMockAdapter(api, {
        delayResponse: process.env.REACT_APP_MOCK_DELAY ?? 1000
    });
    const baseURL = getBaseURL();

    trainingMock(mock, `${baseURL}/trainings`);
};

export default mocks;
