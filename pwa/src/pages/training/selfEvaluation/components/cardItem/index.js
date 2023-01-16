import React from 'react';

import { capitalize } from '../../../../../utils/helpers';
import { Card, CardSubtitle, CardTitle } from './styles';
import { Row, Ball } from '../../../common/styles';

const CardItem = ({ nome, status, onClick }) => {
    return (
        <Card onClick={() => status === 'PENDENTE' && onClick()}>
            <CardTitle>{nome}</CardTitle>

            <Row>
                <CardSubtitle>{capitalize(status)}</CardSubtitle>

                <Ball status={status} />
            </Row>
        </Card>
    );
};

export default CardItem;
