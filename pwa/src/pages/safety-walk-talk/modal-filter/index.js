import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import RadioButtonGroup from '../../../components/molecules/radio-button-group';
import ConfirmCancelFooter from '../../../components/organisms/confirmCancelFooter';
import moment from '../../../config/moment';
import {
    Container,
    Content,
    Header,
    InputWrapper,
    Section,
    SectionTitle,
    StyledInputDatePicker,
    Title,
    InputWrapperDatePicker
} from './styles';
import colors from '../../../styles/colors';
import { toast } from 'react-toastify';

const ModalFilter = ({ onClose, handleFilter, filters }) => {
    const [author, setAuthor] = useState(filters.author);
    const [initialDate, setInitialDate] = useState(filters.initialDate);
    const [finalDate, setFinalDate] = useState(filters.finalDate);

    const handleApply = async () => {
        if (initialDate !== null && finalDate !== null) {
            if (
                moment(finalDate).isAfter(initialDate) ||
                finalDate === initialDate
            ) {
                onClose();

                await handleFilter({
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
            toast.warning('A data inicial e final são obrigatórias!');
        }
    };

    const handleClear = () => {
        setInitialDate(moment().subtract(30, 'days').format('YYYY-MM-DD'));
        setFinalDate(moment().add(30, 'days').format('YYYY-MM-DD'));
        setAuthor(0);
    };

    return (
        <Container>
            <Header>
                <Title>Filtrar</Title>
                <FaTimes
                    color={'#5E687D'}
                    style={{ cursor: 'pointer' }}
                    size={20}
                    onClick={() => onClose()}
                />
            </Header>
            <Content>
                <Section>
                    <SectionTitle>Por autor</SectionTitle>
                    <InputWrapper>
                        <RadioButtonGroup
                            options={[
                                {
                                    id: 0,
                                    label: 'Todos os registros'
                                },
                                {
                                    id: 1,
                                    label: 'Registros da minha área'
                                },
                                {
                                    id: 2,
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
                    <InputWrapperDatePicker>
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
                    </InputWrapperDatePicker>
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
