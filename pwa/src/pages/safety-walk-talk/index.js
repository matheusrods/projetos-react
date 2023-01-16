import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Header from '../../components/organisms/header';
import colors from '../../styles/colors';
import ModalFilter from './modal-filter';
import { flowResult } from 'mobx';
import { inject, observer } from 'mobx-react';
import { FaCaretRight, FaCheck, FaFilter } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { SafetyCard, AddButton } from '../../components/atoms';

import {
    Container,
    SectionTitle,
    Flex,
    SmallCard,
    Strong,
    FilterActionsButton,
    SeeNow,
    LoadingContainer,
    LoadingIcon
} from './styles';
import { toast } from 'react-toastify';
import moment from '../../config/moment';
import { EmptyListContainer } from '../../components/molecules';

const SafetyWalkTalk = ({ NewRegisterSWT, HomeStore }) => {
    const history = useHistory();

    const { setCurrentRecord } = NewRegisterSWT;

    const [modalFilterOpen, setModalFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        author: 0,
        initialDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
        finalDate: moment().add(30, 'days').format('YYYY-MM-DD')
    });
    const [meta, setMeta] = useState(null);

    const [completed, setCompleted] = useState([]);
    const [pending, setPending] = useState([]);
    const [inProgress, setInProgress] = useState([]);

    const fetchSwtData = useCallback(
        async (options = {}) => {
            setLoading(true);

            if (Object.keys(options).length === 3) {
                setFilters(options);
            }

            const { author, initialDate, finalDate } = options;

            await flowResult(HomeStore.fetch(author, initialDate, finalDate));

            if (HomeStore.state === 'done') {
                setMeta(HomeStore.meta);
                setInProgress(HomeStore.inProgress);
                setPending(HomeStore.pending);
                setCompleted(HomeStore.completed);
                setLoading(false);
            }

            if (HomeStore.state === 'error') {
                setLoading(false);

                toast.error('Algo inesperado aconteceu, tente novamente mais tarde');
            }
        },
        [HomeStore]
    );

    const handleRegister = (id = null) => {
        const pathRecord = setCurrentRecord(id);

        if (pathRecord) {
            history.push(pathRecord);
        }
    };

    useEffect(() => fetchSwtData(), [fetchSwtData]);

    return (
        <Fragment>
            <Header />
            <Container>
                {loading ? (
                    <LoadingContainer>
                        <LoadingIcon size={48} color={colors.client} />
                        <span>Carregando...</span>
                    </LoadingContainer>
                ) : (
                    <Fragment>
                        <SmallCard
                            color={colors.client}
                            to={'/safety-walk-talk/goals'}
                        >
                            <Flex>
                                <FaCheck size={16} />
                                <div>
                                    <span>{meta.msg ?? 'Não informado'}</span>
                                    <SeeNow>
                                        <Strong>
                                            {meta.total.split(' ')[0] ??
                                                'Não informado'}
                                        </Strong>{' '}
                                        Walk & Talks realizados
                                    </SeeNow>
                                </div>
                            </Flex>
                            <FaCaretRight size={16} />
                        </SmallCard>
                        {inProgress?.length > 0 && (
                            <Fragment>
                                <SectionTitle>
                                    Registros em andamento ({inProgress.length})
                                </SectionTitle>
                                {inProgress.map((safety, index) => (
                                    <SafetyCard
                                        key={index}
                                        typeOfSafety={safety?.typeOfSafety}
                                        borderColor={colors.blueAux}
                                        safety={safety}
                                        onClickNameCard={() => {
                                            if (safety?.uuid) {
                                                history.push(
                                                    `/safety-walk-talk/details/${safety?.uuid}`
                                                );
                                            } else {
                                                history.push(
                                                    `/safety-walk-talk/details/${safety?.codigo}`
                                                );
                                            }
                                        }}
                                        onClickContinue={() => {
                                            if (safety?.uuid) {
                                                handleRegister(safety.uuid);
                                            } else {
                                                history.push(
                                                    `/safety-walk-talk/details/${safety?.codigo}`
                                                );
                                            }
                                        }}
                                    />
                                ))}
                            </Fragment>
                        )}
                        <SectionTitle>
                            Registros aguardando análise de qualidade
                            ({pending.length})
                        </SectionTitle>{' '}
                        {pending?.length > 0 ? pending.map((safety, index) => (
                            <SafetyCard
                                key={index}
                                borderColor={safety.status_cor}
                                safety={safety}
                                onClickNameCard={() =>
                                    history.push(
                                        `/safety-walk-talk/details/${safety?.codigo}`
                                    )
                                }
                                onClickContinue={() =>
                                    history.push(
                                        `/safety-walk-talk/quality-analysis/${safety?.codigo}`
                                    )
                                }
                            />
                        )) : <EmptyListContainer hasBackground />}
                        <SectionTitle>
                            Registros concluídos ({completed?.length})
                        </SectionTitle>
                        {completed?.length > 0 ?  completed.map((safety, index) => (
                            <SafetyCard
                                key={index}
                                borderColor={safety.status_cor}
                                safety={safety}
                                onClickNameCard={() =>
                                    history.push(
                                        `/safety-walk-talk/details/${safety?.codigo}`
                                    )
                                }
                                onClickContinue={() =>
                                    history.push(
                                        `/safety-walk-talk/details/${safety?.codigo}`
                                    )
                                }
                            />
                        )) : <EmptyListContainer hasBackground />}
                        <AddButton onClick={() => handleRegister()} />
                        <FilterActionsButton
                            onClick={() => setModalFilterOpen(true)}
                        >
                            <FaFilter size={21} color={'#fff'} />
                        </FilterActionsButton>
                    </Fragment>
                )}
            </Container>
            {modalFilterOpen && (
                <ModalFilter
                    handleFilter={fetchSwtData}
                    onClose={() => setModalFilterOpen(false)}
                    filters={filters}
                />
            )}
        </Fragment>
    );
};

export default inject('NewRegisterSWT', 'HomeStore')(observer(SafetyWalkTalk));
