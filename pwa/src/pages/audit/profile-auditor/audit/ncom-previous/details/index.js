import React, { Fragment, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Photo, WhiteHeaderBack } from '../../../../../../components/atoms';
import TabWithoutHeader from '../../../../../../components/organisms/tab-without-header';
import ItemListLargeGroup from '../../../../../../components/molecules/items-list-large-group';
import {
    Container,
    Section,
    SectionTitle,
    ContainerPhotos,
    ListPhotos,
    CardContainer,
    ContainerItem,
    Label,
    Line,
    Value,
    ContainerValues,
    Dots,
    ContainerItemColumn,
    LabelCriticism,
    ValueCriticism,
    LinkAction,
    ContainerButton,
    ContainerNotFound,
    ContainerIconNotFound,
    TextNotFound
} from './styles';
import { FaAngleRight, FaExclamationCircle } from 'react-icons/fa';
import moment from 'moment';

function AuditNCOMPreviousDetails() {
    const history = useHistory();

    const { dealt = null } = history.location.state;

    const [tabs, setTab] = useState([
        {
            name: 'Detalhes',
            selected: true
        },
        {
            name: 'Ações de melhoria',
            selected: false
        }
    ]);

    const handleOpenPhoto = (photoUrl) => {
        history.push({
            pathname: '/audit/view-photo',
            state: { photo: { url: photoUrl } }
        });
    };

    const renderPhotos = () => {
        return dealt?.photos?.map((item, index) => (
            <Photo
                showOptions={false}
                src={item.file}
                key={index}
                onClick={() => handleOpenPhoto(item.file)}
            />
        ));
    };

    const handleSelectTab = (index) => {
        const tempTabs = tabs.map((item) => ({ ...item, selected: false }));

        tempTabs[index].selected = true;

        setTab(tempTabs);
    };

    if (!dealt) {
        return <Redirect to="/audit/profile-auditor" />
    } else if (tabs[0].selected) {
        return (
            <Fragment>
                <WhiteHeaderBack
                    title={'Detalhes das NC/OM'}
                    onBack={history.goBack}
                />
                <TabWithoutHeader
                    tabs={tabs}
                    handleSelectTab={handleSelectTab}
                    zIndex={'100000'}
                    position={'relative'}
                    boxShadow={'inset white 20px 20px 0px 0px;'}
                />
                <Container>
                    <CardContainer>
                        <ContainerItem>
                            <Label>{dealt?.themeTitle}</Label>
                        </ContainerItem>
                        <Line />
                        <ContainerItemColumn>
                            <LabelCriticism>
                                #{dealt?.id}
                            </LabelCriticism>
                            <ValueCriticism>
                                {dealt?.orderLabel} {dealt?.requirementTitle}
                            </ValueCriticism>
                        </ContainerItemColumn>
                        <Line />
                        <ItemListLargeGroup
                            data={[
                                {
                                    label: dealt?.responsibleProcesses?.length > 1
                                        ? 'Responsáveis'
                                        : 'Responsável',
                                    value: dealt?.responsibleProcessesLabel
                                },
                                {
                                    label: 'Data',
                                    value: dealt?.inclusionDate
                                },
                                {
                                    label: 'Justificativa',
                                    value: dealt?.justification
                                },
                                dealt?.descriptionAnalysisCause ?
                                    {
                                        label: 'Descrição da análise da causa',
                                        value: dealt?.descriptionAnalysisCause
                                    }
                                    : null
                            ]}
                        />
                        {dealt?.photos?.length > 0 && (
                            <Section>
                                <SectionTitle>
                                    Fotos da observação
                                </SectionTitle>
                                <ContainerPhotos>
                                    <ListPhotos>
                                        {renderPhotos()}
                                    </ListPhotos>
                                </ContainerPhotos>
                            </Section>
                        )}
                    </CardContainer>
                </Container>
            </Fragment>
        );
    } else if (tabs[1].selected) {
        return (
            <Fragment>
                <WhiteHeaderBack
                    title={'Detalhes das NC/OM'}
                    onBack={history.goBack}
                />
                <TabWithoutHeader
                    tabs={tabs}
                    handleSelectTab={handleSelectTab}
                    zIndex={'100000'}
                    position={'relative'}
                    boxShadow={'inset white 20px 20px 0px 0px;'}
                />
                <Container>
                    {dealt?.improvementActions?.length ? (
                        dealt?.improvementActions?.map((item, index) => {
                            return (
                                <CardContainer key={index}>
                                    <ContainerItem>
                                        <Label>
                                            ID da ação {item.id}
                                        </Label>
                                    </ContainerItem>
                                    <Line />
                                    <ContainerItem>
                                        <Label>
                                            Criticidade
                                        </Label>
                                        <ContainerValues>
                                            <Dots color={item.criticism.color} />
                                            <Value>{item.criticism.description}</Value>
                                        </ContainerValues>
                                    </ContainerItem>
                                    <Line />
                                    <ItemListLargeGroup
                                        data={[
                                            {
                                                label: 'Item auditado',
                                                value: `${dealt?.orderLabel} ${dealt?.requirementTitle}`
                                            },
                                            {
                                                label: 'Tipo de ação',
                                                value: item?.type?.description
                                            },
                                            {
                                                label: 'Prazo',
                                                value: item?.deadline && moment(item.deadline).isValid() ? moment(item.deadline).format('DD/MM/YYYY') : item.deadline
                                            },
                                            {
                                                label: 'Responsável',
                                                value: item?.responsible?.name
                                            },
                                            {
                                                label: 'Data',
                                                value: item?.date
                                            },
                                            {
                                                label: 'Descrição da ação',
                                                value: item?.description
                                            }
                                        ]}
                                    />
                                    <ContainerButton
                                        onClick={() => history.push(`/action/details/${item.id}`)}
                                    >
                                        <LinkAction>
                                            Abrir no plano de ação
                                        </LinkAction>
                                        <FaAngleRight
                                            color={' #faa50a'}
                                        />
                                    </ContainerButton>
                                </CardContainer>
                            );
                        })
                    ) : (
                        <ContainerNotFound>
                            <ContainerIconNotFound>
                                <FaExclamationCircle />
                            </ContainerIconNotFound>
                            <TextNotFound>
                                Esta não conformidade ainda não possui
                                ações de melhoria cadastradas.
                            </TextNotFound>
                        </ContainerNotFound>
                    )}
                </Container>
            </Fragment>
        );
    }
}

export default AuditNCOMPreviousDetails;
