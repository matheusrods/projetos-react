import React from 'react';

import {
    StarRating,
    TextAreaDefault
} from '../../../../../../components/atoms';

const TrainingRating = ({ tipo, ...rest }) => {
    const formTypes = {
        star: ({ titulo, value, codigo, onChange }) => (
            <StarRating
                label={titulo}
                selectedStars={value}
                onChange={(value) =>
                    onChange((curRating) => ({
                        ...curRating,
                        [codigo]: value
                    }))
                }
                style={{ margin: '16px 0' }}
            />
        ),
        textArea: ({ titulo, value, codigo, onChange }) => (
            <TextAreaDefault
                name={'justification'}
                placeholder="Descreva aqui..."
                label={titulo}
                value={value}
                onChange={({ target }) =>
                    onChange((curRating) => ({
                        ...curRating,
                        [codigo]: target.value
                    }))
                }
            />
        )
    };

    return formTypes[tipo](rest);
};

export default TrainingRating;
