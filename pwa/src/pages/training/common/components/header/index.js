import React from 'react';

import styles, { Header, SubTitle, Title } from './styles';
import { CloseIcon } from '../../../../../components/organisms/filterPage/styles';

const DetailsHeader = ({ title, subtitle, onClick }) => {
    return (
        <Header>
            <div>
                <Title>{title}</Title>

                <SubTitle>{subtitle}</SubTitle>
            </div>

            <CloseIcon color={styles.icon} onClick={onClick} />
        </Header>
    );
};

export default DetailsHeader;
