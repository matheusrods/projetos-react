import React from 'react';
import { FaFilter } from 'react-icons/fa';
import { Form } from '@unform/web';

import useSelfEvaluation from './useSelfEvaluation';
import { Title } from './styles';
import { FloatingActionButton, Loading } from '../../../components/atoms';
import colors from '../../../styles/colors';
import { CardItem, FilterForm } from './components';
import { FilterPage } from '../../../components/organisms';
import { Wrapper } from '../../observer-ehs/details/styles';
import { TrainingModal, TrainingModalViews } from '../common';

const SelfEvaluation = () => {
    const {
        visible,
        formData,
        setformData,
        formRef,
        onTrainingSubmit,
        onFilterSubmit,
        onReset,
        avaliacoes,
        pending,
        selected,
        setselected,
        modalView,
        setmodalView,
        patchAvaliacoesRequest
    } = useSelfEvaluation();

    if (pending) return <Loading label="Carregando competências" />;

    return (
        <>
            <Title>Auto-avaliação</Title>

            <Wrapper>
                {avaliacoes.map((item) => (
                    <CardItem
                        {...item}
                        key={item.codigo}
                        onClick={() => setselected(item.questionario)}
                    />
                ))}
            </Wrapper>

            <FloatingActionButton
                onClick={() => setmodalView('filters')}
                bottom={68}
                right={12}
                position={'absolute'}
                backgroundColor={colors.gray5}
                size={21}
                color={colors.white}
                icon={<FaFilter />}
                disabled={pending}
            />

            <TrainingModal
                visible={visible}
                title={`Siemens`}
                subtitle={`Treinamentos`}
                onClick={() => setmodalView('')}
                withHeader={modalView !== 'filters'}
            >
                <TrainingModalViews
                    selected={selected}
                    onSubmit={onTrainingSubmit}
                    patchProvaRequest={patchAvaliacoesRequest}
                    setmodalView={setmodalView}
                    modalView={modalView}
                    filterView={
                        <Form
                            id={'form'}
                            ref={formRef}
                            onSubmit={onFilterSubmit}
                            initialData={formData}
                        >
                            <FilterPage
                                onClose={() => setmodalView('')}
                                onReset={onReset}
                                confirmButtonType="submit"
                                pending={pending}
                            >
                                <FilterForm
                                    formData={formData}
                                    setformData={setformData}
                                    formRef={formRef}
                                />
                            </FilterPage>
                        </Form>
                    }
                />
            </TrainingModal>
        </>
    );
};

export default SelfEvaluation;
