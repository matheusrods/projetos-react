function sortByNumber(a, b) {
    return a.order - b.order;
}

function sortByTitle(a, b) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
}

function transformResponseProcesses(processes = []) {
    if (!Array.isArray(processes)) {
        return [];
    }

    const processesFormatted = processes.map((item) => {

        const themes = item.requisitos_disponiveis?.reduce(
            (previous, current) => {
            const themeIndex = previous.findIndex(theme => theme.id === current.codigo_tema);

            const orderLabelRequirement = `${current.auditoria_tema_titulo_ordem}.${current.ordem}`;

            if (themeIndex === -1) {
                const theme = {
                    id: current.codigo_tema,
                    title: current.auditoria_tema,
                    description: current.auditoria_tema_descricao,
                    knowMore: current.auditoria_tema_saiba_mais,
                    titles: [
                        {
                            id: current.codigo_tema_titulo,
                            order: parseFloat(current.auditoria_tema_titulo_ordem),
                            orderLabel: current.auditoria_tema_titulo_ordem,
                            title: current.auditoria_tema_titulo_titulo,
                            requirements: [
                                {
                                    id: current.codigo,
                                    value: current.codigo,
                                    order: parseFloat(orderLabelRequirement),
                                    orderLabel: orderLabelRequirement,
                                    label: current.requisito,
                                    title: current.requisito,
                                    knowMore: current.requisito_saiba_mais || null
                                }
                            ]
                        }
                    ]
                };

                previous.push(theme);
            } else {
                const titles = previous[themeIndex].titles;
                const titleIndex = titles.findIndex(title => title.id === current.codigo_tema_titulo);

                if (titleIndex === -1) {
                    titles.push({
                        id: current.codigo_tema_titulo,
                        order: parseFloat(current.auditoria_tema_titulo_ordem),
                        orderLabel: current.auditoria_tema_titulo_ordem,
                        title: current.auditoria_tema_titulo_titulo,
                        requirements: [
                            {
                                id: current.codigo,
                                value: current.codigo,
                                order: parseFloat(orderLabelRequirement),
                                orderLabel: orderLabelRequirement,
                                label: current.requisito,
                                title: current.requisito,
                                knowMore: current.requisito_saiba_mais || null
                            }
                        ]
                    });
                } else {
                    const requirements = titles[titleIndex].requirements;
                    const requirementIndex = requirements.findIndex(requirement => requirement.id === current.codigo);

                    if (requirementIndex === -1) {
                        requirements.push({
                            id: current.codigo,
                            value: current.codigo,
                            order: parseFloat(orderLabelRequirement),
                            orderLabel: orderLabelRequirement,
                            label: current.requisito,
                            title: current.requisito,
                            knowMore: current.requisito_saiba_mais || null
                        });
                    }

                    titles[titleIndex] = {
                        ...titles[titleIndex],
                        requirements: requirements.sort(sortByNumber)
                    };
                }

                previous[themeIndex] = {
                    ...previous[themeIndex],
                    titles: titles.sort(sortByNumber)
                };
            }

            return previous.sort(sortByTitle);
        }, [])

        return {
            id: item.codigo,
            name: item.descricao,
            value: item.codigo,
            label: item.descricao,
            processAreaId: item.codigo_area_processo,
            themes
        }
    });

    return {
        processesFormatted
    };
};

export { transformResponseProcesses };
