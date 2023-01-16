import React from 'react';
import { Redirect, useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { NextButton, WhiteHeaderBack } from '../../../../../components/atoms';
import colors from '../../../../../styles/colors';
import {
    Container,
    ContainerTitles,
    H2,
    H1,
    Text,
    ContainerMethodologyCheckbox,
    Title,
    ContainerCheckbox,
    ContainerContent
} from './styles';
import { CardMethodologyAudit } from '../../../../../components/molecules';
import CheckboxGroup from '../../../../../components/molecules/checkbox-group';
import { FiAlertTriangle } from 'react-icons/fi';

const typeOptions = [
    {
        id: 'method',
        label: 'Método',
        color: '#F2994A',
        iconName: 'Box'
    },
    {
        id: 'labor',
        label: 'Mão-de-obra',
        color: '#2D9CDB',
        iconName: 'Users'
    },
    {
        id: 'machine',
        label: 'Máquina',
        color: '#9B51E0',
        iconName: 'Truck'
    },
    {
        id: 'measure',
        label: 'Medida',
        color: '#27AE60',
        iconName: 'Clipboard'
    },
    {
        id: 'material',
        label: 'Material',
        color: '#009999',
        iconName: 'Tool'
    },
    {
        id: 'environment',
        label: 'Meio ambiente',
        color: '#97DC52',
        iconName: 'Feather'
    }
];

const AuditResponsibleDealtIshikawa = ({ Auditing }) => {
    const history = useHistory();

    const {
        unConformityRequirement = null,
        dealInEditing,
        updateResponseInMethodology
    } = Auditing;

    const handleSubmit = () => history.push('ishikawa/options');

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
                    <CardMethodologyAudit
                        icon={<FiAlertTriangle fontSize={'18px'} />}
                        fontColor={'#4F4F4F'}
                        title={'Não Conformidade'}
                    >
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </Text>
                    </CardMethodologyAudit>
                    <ContainerMethodologyCheckbox>
                        <Title>
                            Selecione as opções que serão utilizadas na
                            tratativa
                        </Title>
                        <ContainerCheckbox>
                            <CheckboxGroup
                                options={typeOptions}
                                selected={dealInEditing.response.methodologyIshikawa.typesSelected.map(item => item.id) || []}
                                onSelect={(type) => {
                                    let typesSelected = new Array(...dealInEditing.response.methodologyIshikawa.typesSelected);

                                    if (typesSelected.find(item => item.id === type)) {
                                        typesSelected = typesSelected.filter(item => item.id !== type);
                                    } else {
                                        const infoType = typeOptions.find(item => item.id === type);

                                        typesSelected.push(infoType);
                                    }

                                    updateResponseInMethodology(
                                        'methodologyIshikawa',
                                        null,
                                        null,
                                        'typesSelected',
                                        typesSelected
                                    );
                                }}
                                colorActive={colors.greenAux}
                                colorDefault={colors.gray2}
                                backgroundColor={colors.white}
                                borderColor={colors.white}
                                paddingCheck={'8px 0'}
                            />
                        </ContainerCheckbox>
                    </ContainerMethodologyCheckbox>
                </ContainerContent>
                <NextButton
                    positionRelative={true}
                    nextDisabled={dealInEditing.response.methodologyIshikawa.typesSelected.length === 0}
                    onBack={history.goBack}
                    onNext={handleSubmit}
                    nextLabel={'Avançar'}
                />
            </Container>
        </>
    ) : <Redirect to={'/audit/responsible-dealt'} />;
};

export default inject('Auditing')(observer(AuditResponsibleDealtIshikawa));
