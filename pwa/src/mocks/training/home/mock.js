import { resume, notifications } from './seeds';

const homeMock = (mock, baseURL) => {
    mock.onGet(`${baseURL}/resume`).reply(() => {
        console.log(`${baseURL}/resume`);

        return [200, { result: resume }];
    });

    mock.onGet(`${baseURL}/notifications`).reply(() => {
        console.log(`${baseURL}/notifications`);

        return [200, { result: notifications }];
    });

    mock.onPatch(/trainings\/notifications\/\/*/).reply(({ data, url }) => {
        console.log(`PATHCH: ${baseURL}/notifications`, data);

        const id = url?.split('notifications/')[1] || '';
        const find = notifications.find(
            ({ codigo }) => parseInt(id) === codigo
        );

        return [200, { result: { ...find, ...JSON.parse(data) } }];
    });
};

export default homeMock;
