import React from 'react';

import styles, { CardSubTitle, CardTitle } from './styles';
import { Ball, Column, Row } from '../../styles';

const CardItemContent = ({ title, id, status, ballStatus }) => {
    return (
        <Column style={styles}>
            <CardTitle>{title}</CardTitle>

            <Row fullWidth>
                {status && (
                    <Row>
                        <Ball status={ballStatus} />

                        <CardSubTitle>{status}</CardSubTitle>
                    </Row>
                )}

                <CardSubTitle>{`#${id}`}</CardSubTitle>
            </Row>
        </Column>
    );
};

export default CardItemContent;
