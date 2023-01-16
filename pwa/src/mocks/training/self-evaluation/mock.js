import { questionarios, filters, avaliacoes } from './seeds';

const selfEvaluationMock = (mock, baseURL) => {
    mock.onGet(/trainings\/questions\/\/*/).reply(({ url }) => {
        console.log(`onGet: ${url}`);
        const id = url.split('questions/')[1] || '';

        return [
            200,
            {
                result: questionarios.find(
                    ({ codigo }) => codigo === parseInt(id)
                )
            }
        ];
    });

    mock.onGet(`${baseURL}/filters`).reply(() => {
        console.log(`${baseURL}/filters`);

        return [200, { result: filters }];
    });

    mock.onGet(/trainings\/evaluations\/?.*/).reply(({ url }) => {
        console.log(`onGet: ${url}`);

        const queryString = url?.replace(/.*\?/, '');
        const searchParams = new URLSearchParams(queryString);

        const c = JSON.parse(searchParams.get('competencias'));
        const s = JSON.parse(searchParams.get('status'));
        // const p = JSON.parse(searchParams.get('periodo'));

        return [
            200,
            {
                result: avaliacoes.reduce((acc, cur) => {
                    if (c.length || s.length) {
                        if (
                            c.indexOf(cur.codigo) >= 0 ||
                            s.indexOf(cur.status) >= 0
                        )
                            acc.push(cur);
                    } else {
                        acc.push(cur);
                    }

                    return acc;
                }, [])
            }
        ];
    });

    mock.onPatch(/trainings\/evaluations\/?.*/).reply(({ url, data }) => {
        console.log(`onPatch: ${url}`);
        const id = url.split('evaluations/')[1] || '';

        const evaluation = avaliacoes.find(
            ({ codigo }) => codigo === parseInt(id)
        );

        return [
            200,
            {
                result: {
                    ...evaluation,
                    respostas: data,
                    status: 'REALIZADO'
                }
            }
        ];
    });
};

export default selfEvaluationMock;
