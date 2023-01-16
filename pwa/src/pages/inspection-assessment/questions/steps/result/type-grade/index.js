import React from 'react';

import {
    Container
} from './styles';
import {useLocation} from "react-router-dom";
import {InlineLabelValue, Paragraph, ShapeCard} from "../../../../../../components/atoms";
import colors from "../../../../../../styles/colors";
import Title from "../../../../../../components/atoms/title";
import {BiBlock, BiCheck, BiInfoCircle, FiFlag} from "react-icons/all";

const TypeConformity = ({
    inspection,
    form
}) => {
    const location = useLocation();


    return (
        <Container key={location.key}>
            <ShapeCard shadow>
                {form.sight === '1' &&
                    <Title
                        text={'Equipamento condenado!'}
                        icon={<FiFlag size={30} color={colors.orange2}/>}
                    />
                }

                {form.sight === '2' &&
                    <Title
                        text={'Equipamento bloqueado!'}
                        icon={<BiBlock size={30} color={colors.redAux}/>}
                    />
                }
                {form.sight === '3' &&
                    <Title
                        text={'Equipamento validado!'}
                        icon={<BiCheck size={30} color={colors.greenAux}/>}
                    />
                }
                {form.sight === '4' &&
                    <Title
                        text={'Equipamento aprovado!'}
                        icon={<BiCheck size={30} color={colors.greenAux}/>}
                    />
                }
                {/*<Paragraph*/}
                {/*    text={'O equipamento está bloqueado e não pode ser inspecionado.'}*/}
                {/*    color={colors.gray3}*/}
                {/*/>*/}
            </ShapeCard>

            {form.sight === '1' &&
                <Paragraph
                    text={'Como o equipamento foi indicado como bloqueado, é necessário que as pessoas envolvidas sejam imediatamente notificadas a respeito.\n' +
                        'O gestor da área também será notificado para ações corretivas.'}
                    icon={<BiInfoCircle size={20} color={colors.orange2}/>}
                />
            }


            <ShapeCard>
                <InlineLabelValue
                    label={'Inspeção'}
                    value={inspection.name}
                />
                <InlineLabelValue
                    label={'Responsável'}
                    value={inspection.responsibleName}
                />
                <InlineLabelValue
                    label={'Parecer'}
                    value={form.sightDescription}
                />
                <InlineLabelValue
                    label={'Atendimento'}
                    value={`${form.attendance}%`}
                    valueColor={colors.orange2}
                />
            </ShapeCard>
        </Container>
    );
};

export default TypeConformity;
