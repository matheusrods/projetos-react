import React from 'react';

import { LoadingTitle } from '../../../../../../components/atoms/loading/styles';
import { IconCheck, SuccessContainer } from '../styles';

const WizardSuccess = () => {
    return (
        <SuccessContainer>
            <IconCheck />

            <LoadingTitle>Feito!</LoadingTitle>
        </SuccessContainer>
    );
};

export default WizardSuccess;
