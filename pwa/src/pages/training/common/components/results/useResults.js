import { useEffect, useState } from 'react';

const useResults = (result) => {
    const [{ score, pr }, setdata] = useState({ score: 0, pr: [] });
    const [approved, setapproved] = useState(false);

    useEffect(() => {
        if (result)
            setdata(
                result.questionario.questoes.reduce(
                    (acc, cur, idx) => {
                        const isCorrect =
                            cur.resposta === result.respostas[idx];

                        acc.pr.push({
                            pergunta: cur.pergunta,
                            resposta: cur.respostas.find(
                                ({ codigo }) => codigo === result.respostas[idx]
                            ).nome,
                            rightAnswer: cur.respostas.find(
                                ({ codigo }) => codigo === cur.resposta
                            ).nome,
                            isCorrect
                        });

                        acc.score = isCorrect ? acc?.score + 1 : acc.score;

                        return acc;
                    },
                    {
                        score: 0,
                        pr: []
                    }
                )
            );
    }, [result]);

    useEffect(() => {
        if (pr.length)
            setapproved(
                score >= parseInt(result.turma.treinamento.nota_minima.valor)
            );
    }, [score, pr, result]);

    return { score, pr, approved };
};

export default useResults;
