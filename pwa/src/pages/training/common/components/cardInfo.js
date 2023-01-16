import React from 'react';

import { CardItem } from '../../../../components/molecules';
import { CardItemContent } from '..';

const TrainingCardInfo = ({ onClick, title, id, borderColor, ...rest }) => (
    <CardItem onClick={onClick} borderColor={borderColor}>
        <CardItemContent title={title} id={id} {...rest} />
    </CardItem>
);

export default TrainingCardInfo;
