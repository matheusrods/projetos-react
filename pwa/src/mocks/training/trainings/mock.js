import { result, turmas, colaborador } from './seeds';

const trainingsMock = (mock, baseURL) => {
    mock.onGet(`${baseURL}`).reply(({ url }) => {
        console.log(`onGet: ${url}`);

        return [200, { result }];
    });

    mock.onGet(/trainings\/treinamentos\/\/*/).reply(({ url }) => {
        console.log(`onGet: ${url}`);
        const id = url.split('treinamentos/')[1] || '';

        return [
            200,
            { result: result.find(({ codigo }) => codigo === parseInt(id)) }
        ];
    });

    mock.onGet(/trainings\/turmas\/\/*/).reply(({ url }) => {
        console.log(`onGet: ${url}`);
        const id = url.split('turmas/')[1] || '';

        return [
            200,
            {
                result: turmas.filter(
                    ({ treinamento: { codigo } }) => codigo === parseInt(id)
                )
            }
        ];
    });

    mock.onPatch(/trainings\/treinamentos\/\/*/).reply(({ url, data }) => {
        console.log(`onPatch: ${url}`);
        // const id = url.split('treinamentos/')[1] || '';
        const payload = JSON.parse(data);

        // const find = result.find(({ codigo }) => codigo === parseInt(id));

        return [200, { result: payload }];
    });

    mock.onPost(baseURL).reply(({ url, data }) => {
        console.log(`onPost: ${url}`);

        const payload = JSON.parse(data);

        return [
            200,
            {
                result: {
                    ...payload,
                    codigo: colaborador.treinamentos.length + 1,
                    status: 2,
                    nota: 0,
                    confirmado: 2,
                    avaliacao: undefined
                }
            }
        ];
    });
};

export default trainingsMock;
