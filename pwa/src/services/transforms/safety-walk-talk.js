const safetyWalkTalkSimplifiedFactory = (item, selected) => ({
    id: parseInt(item.codigo),
    status: {
        label: item?.status_desc,
        color: item?.status_cor ?? null,
    },
    user: {
        avatar: item?.avatar ?? null,
        name: item?.nome,
    },
    location: item?.localidade,
    date: item?.data,
    formId: item?.codigo_form ? parseInt(item.codigo_form) : null,
    formType: item?.form_tipo ? parseInt(item.form_tipo) : null,
    clientId: item?.codigo_cliente_localidade ? parseInt(item.codigo_cliente_localidade) : null,
    selected: selected === parseInt(item.codigo) ? true : false,
});

const questionsSimplifiedFactory = (item, selected) => ({
    id: parseInt(item.codigo),
    name: item?.questao,
    selected: selected === parseInt(item.codigo) ? true : false,
});

export const transformResponseSimplified = (data, selected = null) => {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    const registers = data.map((item) => safetyWalkTalkSimplifiedFactory(item, selected))

    return registers.sort((a, b) => b.id - a.id);
};

export const transformQuestionsResponseSimplified = (data, selected = null) => {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }
    const registers = [];

    data.forEach(({ questoes }) => {
        questoes.forEach(item => {
            registers.push(questionsSimplifiedFactory(item, selected));
        });
    });

    return registers.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }

        return 0;
    });
};
