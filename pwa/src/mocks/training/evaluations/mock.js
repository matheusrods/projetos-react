import { result, competencias, treinamentos } from './seeds';

const evaluationsMock = (mock, baseURL) => {
    mock.onGet(`${baseURL}`).reply(({ url }) => {
        console.log(`onGet: ${url}`);

        return [200, { result: { treinamentos, competencias } }];
    });

    mock.onGet(`${baseURL}/filtros`).reply(({ url }) => {
        console.log(`onGet: ${url}`);

        return [
            200,
            {
                result: {
                    treinamentos: treinamentos.map(
                        ({ questionario: { nome } }) => nome
                    ),
                    competencias: competencias.map(
                        ({ questionario: { nome } }) => nome
                    )
                }
            }
        ];
    });

    mock.onGet(/trainings\/provas\/?.*/).reply(({ url }) => {
        try {
            console.log(`onGet: ${url}`);

            const data = { treinamentos, competencias };

            const queryString = url?.replace(/.*\?/, '');
            const searchParams = new URLSearchParams(queryString);

            const t = searchParams.get('tipo');
            const n = JSON.parse(searchParams.get('nome'));
            // const p = JSON.parse(searchParams.get('periodo'));

            if (!t) throw new Error('O Tipo é obrigatório!');

            return [
                200,
                {
                    result: {
                        [t]: data[t].reduce((acc, cur) => {
                            if (n.length) {
                                if (n.indexOf(cur.questionario.nome) > -1)
                                    acc.push(cur);
                            } else acc.push(cur);

                            return acc;
                        }, [])
                    }
                }
            ];
        } catch (error) {
            console.log('>>>>>> why', error);
            return [400, error];
        }
    });

    mock.onPatch(/trainings\/provas\/\/*/).reply(({ url, data }) => {
        console.log(`onPatch: ${url}`);
        const id = url.split('provas/')[1] || '';
        const payload = JSON.parse(data);

        const find = result.find(
            ({ questionario }) => questionario.codigo === parseInt(id)
        );

        return [
            200,
            { result: { ...find, ...payload, tentativas: find.tentativas + 1 } }
        ];
    });
};

export default evaluationsMock;
