import React from 'react';
import { inject, observer } from 'mobx-react';

import {
    Container,
} from './styles';
import {Wrapper} from "../../inspections/list-type/pending/styles";
import {ActionCard} from "../../../../components/atoms";
import colors from "../../../../styles/colors";


const ImprovementActionsInspection = ({ HomeInspectionStore }) => {
    const {inspection} = HomeInspectionStore;

    return (
        <Container>
            {inspection.actions.length > 0 ? (
                inspection.actions.map((item, index) => {
                    return (
                        <Wrapper key={`${item.id}-${index}`}>
                            <ActionCard
                                notDetailsButton={true}
                                backgroundColor={colors.gray1}
                                action={item}
                            />
                        </Wrapper>
                    )
                })
                ) :
                (
                 <>Nenhuma ação cadastrada</>
                )
            }

        </Container>
    );
};

export default inject('HomeInspectionStore')(observer(ImprovementActionsInspection));
