import _ from 'lodash';
import { isEmpty } from '../../utils/helpers';

const sumTotal = (elements) => {
    if (isEmpty(elements)) {
        return 0;
    }
    const [head, ...rest] = elements;
    return head.total + sumTotal(rest);
};

const getClassificationWithPercentage = (classification) => {
    const grandTotal = sumTotal(classification);
    const mutedArray = classification.reduce((acc, current) => {
        const floatPercentage = (current.total / grandTotal) * 0.96;
        const percentage = Math.round(floatPercentage * 100);

        const newClassificationValue = { ...current, percentage };
        acc.push(newClassificationValue);

        return acc;
    }, []);

    return mutedArray;
};

const getClassificationWithBorder = (classification) => {
    const lastIndex = classification.length - 1;

    const mutedArray = classification.reduce((acc, current, index) => {
        let borderRadius = null;

        if (index === 0) {
            borderRadius = '8px 0px 0px 8px';
        }

        if (index === lastIndex) {
            borderRadius = '0px 8px 8px 0px';
        }

        const newClassificationValue = { ...current, borderRadius };
        acc.push(newClassificationValue);

        return acc;
    }, []);

    return mutedArray;
};

const getGroupedByCategory = (categories) => {
    const mutedArray = categories.reduce((acc, current) => {
        const groupIndex = acc.findIndex(
            (item) => item.category === current.category
        );

        if (groupIndex !== -1) {
            const classifications = [
                ...acc[groupIndex].classifications,
                {
                    code: current.code,
                    description: current.classification,
                    color: current?.color && !_.isNull(current.color) ? `#${current.color}` : null,
                    quantity: current.quantity
                }
            ];

            acc[groupIndex] = {
                ...acc[groupIndex],
                totalValue: acc[groupIndex].totalValue + current.quantity,
                classifications: classifications.sort(
                    (a, b) => a.value - b.value
                )
            };

            return acc;
        }

        acc.push({
            category: current.category,
            totalValue: current.quantity,
            classifications: [
                {
                    code: current.code,
                    description: current.classification,
                    color: current?.color && !_.isNull(current.color) ? `#${current.color}` : null,
                    quantity: current.quantity
                }
            ]
        });

        return acc;
    }, []);

    return mutedArray;
};

const classificationFactory = (item) => ({
    code: item.codigo,
    description: item.descricao,
    color: item.cor,
    border: '',
    total: Number(item.total)
});

const categoryFactory = (item) => ({
    code: item.codigo,
    category: item.categoria,
    classification: item.classificacao,
    color: item.cor,
    quantity: Number(item.total)
});

export const transformResponse = (data) => {
    if (isEmpty(data)) {
        return data;
    }

    const { classificacao, categoria } = data;

    let classification = classificacao.map((item) =>
        classificationFactory(item)
    );

    classification = getClassificationWithPercentage(classification);
    classification = getClassificationWithBorder(classification);

    let category = categoria.map((item) => categoryFactory(item));

    category = getGroupedByCategory(category);

    return { classification, category };
};
