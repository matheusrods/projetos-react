import React from 'react';

import {
    Container
} from './styles';
import {useLocation} from "react-router-dom";
import {InlineLabelValue, ShapeCard} from "../../../../../../components/atoms";
import colors from "../../../../../../styles/colors";
import {CardTitleValue} from "../../../../../../components/molecules";
import {BsDot} from "react-icons/all";
import {Wrapper} from "../type-confirm/styles";


const TypeAspect = ({
    inspection,
    form
}) => {
    const location = useLocation();


    return (
        <Container key={location.key}>

            <Wrapper>
                <CardTitleValue
                    title="Status da Inspeção"
                    subtitle={inspection.updateDate}
                    value={'Finalizada'}
                />
            </Wrapper>

            <ShapeCard>
                <InlineLabelValue
                    label={'Avaliação de engajamento'}
                    softLabel={`#${inspection.id}`}
                />
                <InlineLabelValue
                    label={'Avaliador'}
                    value={inspection.responsibleName}
                />
                <InlineLabelValue
                    label={'Data da avaliação'}
                    value={form.updateDate}
                />
                <InlineLabelValue
                    label={'Aspectos azuis'}
                    value={`Nível ${form.aspectBlue}`}
                    valueColor={colors.icons}
                />
                <InlineLabelValue
                    label={'Aspectos vermelhos'}
                    value={`Nível ${form.aspectRed}`}
                    valueColor={colors.icons}
                />
            </ShapeCard>
        </Container>
    );
};

export default TypeAspect;
