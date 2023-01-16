import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { InputDefault, NextButton, WhiteHeaderBack } from '../../../../../../components/atoms';
import {
    Container,
    ContainerTitles,
    H2,
    H1,
    ContainerContent,
    ContainerMore,
    ContainerIcon
} from './styles';
import { CardMethodologyAudit, ModalComplex } from '../../../../../../components/molecules';
import * as Icon from 'react-icons/fi';
import { FaExclamationTriangle } from 'react-icons/fa';

const IshikawaOptionsSteps = ({ Auditing }) => {
    const history = useHistory();

    const {
        unConformityRequirement = null,
        dealInEditing,
        addResponseInMethodologyIshikawa,
        updateResponseInMethodologyIshikawa
    } = Auditing;

    const [modalAlertVisible, setModalAlertVisible] = useState(false);

    const handleSubmit = () => {
        const { response: { methodologyIshikawa: { typesResponse, typesSelected } } } = dealInEditing;

        let hasEmptyQuestion = false;

        for (const key in typesResponse) {
            if (!hasEmptyQuestion) {
                for (const item of typesResponse[key]) {
                    if (
                        item.cause === ''
                        && !hasEmptyQuestion
                        && typesSelected.find(type => type.id === key)
                    ) {
                        hasEmptyQuestion = true;
                    }
                }
            }
        }

        if (hasEmptyQuestion) {
            setModalAlertVisible(true);
        } else {
            history.push('/audit/responsible-dealt/steps/investigation-cause');
        }
    };

    const convertText = (text) => {
        let loweredText = text.toLowerCase().split('-').join(' ');
        let words = loweredText.split(' ');

        for (var a = 0; a < words.length; a++) {
            let w = words[a];

            let firstLetter = w[0];
            w = firstLetter.toUpperCase() + w.slice(1);

            words[a] = w;
        }

        return words.join('');
    };

    const renderIcon = (iconName, props = {}) => {
        try {
            const iconConverted = `Fi${convertText(iconName)}`;

            return Icon[iconConverted](props);
        } catch (error) {
            return Icon['FiCheck'](props);
        }
    };

    return unConformityRequirement ? (
        <>
            <WhiteHeaderBack
                title={'Tratativa de NC/OM'}
                onBack={history.goBack}
            />
            <Container>
                <ContainerContent>
                    <ContainerTitles>
                        <H2>Metodologia</H2>
                        <H1>Ishikawa</H1>
                    </ContainerTitles>
                    {dealInEditing?.response?.methodologyIshikawa?.typesSelected?.map((item, indexType) => (
                        <CardMethodologyAudit
                            key={indexType}
                            icon={renderIcon(item.iconName)}
                            fontColor={item.color}
                            title={item.label}
                        >
                            {dealInEditing?.response?.methodologyIshikawa?.typesResponse?.[item.id]?.map((typeCause, indexCause) => (
                                <InputDefault
                                    key={indexCause}
                                    placeholder={'Causa'}
                                    type={'text'}
                                    name={`cause-${item.id}-${indexCause}`}
                                    onChange={({ target: { value } }) =>
                                        updateResponseInMethodologyIshikawa(
                                            item.id,
                                            indexCause,
                                            value
                                        )
                                    }
                                    value={typeCause.cause}
                                    width={'100%'}
                                    flexDirection={'column'}
                                />
                            ))}
                            <ContainerMore onClick={() => addResponseInMethodologyIshikawa(item.id)}>
                                <ContainerIcon>{renderIcon('Plus')}</ContainerIcon>
                                Adicionar uma causa
                            </ContainerMore>
                        </CardMethodologyAudit>
                    ))}
                </ContainerContent>
                <NextButton
                    positionRelative={true}
                    onBack={history.goBack}
                    onNext={handleSubmit}
                    nextLabel={'Avançar'}
                />
            </Container>
            <ModalComplex
                title={"Atenção"}
                description={"É obrigatório preencher todos os campos."}
                nameModal={"alert-page"}
                visible={modalAlertVisible}
                onCancel={() => setModalAlertVisible(false)}
                onConfirm={() => setModalAlertVisible(false)}
                icon={<FaExclamationTriangle size={40} color={"#FAA50A"} />}
                confirmButtonLabel={"Ok"}
                uniqueFooterButton
            />
        </>
    ) : <Redirect to={'/audit/responsible-dealt'} />;
};

export default inject('Auditing')(observer(IshikawaOptionsSteps));
