import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import RadioButtonGroup from '../../../components/molecules/radio-button-group';
import ConfirmCancelFooter from '../../../components/organisms/confirmCancelFooter';
import moment from '../../../config/moment';
import colors from '../../../styles/colors';

import {
    Container,
    Content,
    Header,
    InputWrapper,
    Section,
    SectionTitle,
    StyledInputDatePicker,
    Title
} from './styles';

const ModalFilter = ({ onClose, onFilter, filters }) => {
    const [author, setAuthor] = useState(filters.author);
    const [initialDate, setInitialDate] = useState(filters.initialDate);
    const [finalDate, setFinalDate] = useState(filters.finalDate);

    const handleApply = async () => {
        if (
            (initialDate !== null && finalDate === null) ||
            (initialDate === null && finalDate !== null)
        ) {
            toast.warning(
                'Para consultar por período é necessário preencher a data inicial e a data final!'
            );
        } else if (initialDate !== null && finalDate !== null) {
            if (
                moment(finalDate).isAfter(initialDate) ||
                finalDate === initialDate
            ) {
                onClose();

                await onFilter({
                    author,
                    initialDate,
                    finalDate
                });
            } else {
                toast.warning(
                    'A data final precisa ser igual ou maior que a data inicial!'
                );
            }
        } else {
            onClose();

            await onFilter({
                author,
                initialDate,
                finalDate
            });
        }
    };

    const handleClear = () => {
        setInitialDate(null);
        setFinalDate(null);
        setAuthor('area');
    };

    return (
        <Container>
            <Header>
                <Title>Filtrar</Title>
                <FaTimes
                    color={'#5E687D'}
                    size={20}
                    onClick={() => onClose()}
                    style={{ cursor: 'pointer' }}
                />
            </Header>
            <Content>
                <Section>
                    <SectionTitle>Por autor</SectionTitle>
                    <InputWrapper>
                        <RadioButtonGroup
                            options={[
                                {
                                    id: 'area',
                                    label: 'Todos os registros da minha área'
                                },
                                {
                                    id: 'usuario',
                                    label: 'Exibir apenas meus registros'
                                }
                            ]}
                            selected={author}
                            onSelect={(selected) => setAuthor(selected)}
                        />
                    </InputWrapper>
                </Section>
                <Section>
                    <SectionTitle>Por período</SectionTitle>
                    <InputWrapper>
                        <StyledInputDatePicker
                            label={'DE'}
                            name={'initialDate'}
                            initialValue={initialDate}
                            onChange={(value) => setInitialDate(value)}
                            clearIcon={<FaTimes color={colors.gray4_2} />}
                        />
                        <StyledInputDatePicker
                            label={'ATÉ'}
                            name={'endDate'}
                            initialValue={finalDate}
                            onChange={(value) => setFinalDate(value)}
                            clearIcon={<FaTimes color={colors.gray4_2} />}
                        />
                    </InputWrapper>
                </Section>
            </Content>
            <ConfirmCancelFooter
                fixed={true}
                confirmButtonLabel={'Aplicar'}
                confirmButtonIcon={<FaCheck size={14} />}
                cancelButtonLabel={'Limpar'}
                onConfirm={() => handleApply()}
                onCancel={() => handleClear()}
            />
        </Container>
    );
};

export default ModalFilter;
