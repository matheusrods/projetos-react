import React from "react";
import {
    Card as CardComponent,
    CardTitle,
    LabelText
} from "./styles";
import { FiChevronRight } from 'react-icons/fi';
import colors from '../../../styles/colors';


const Card = ({
                  bordercolor = '',
    label= '',
    labelBold= true,
    icon = () => {},
    link = '',
}) => {
    return (
        <CardComponent
            bordercolor={bordercolor}
            to={link}
        >
            <CardTitle>
                {icon()}
                <LabelText bold={labelBold}>{label}</LabelText>
            </CardTitle>

            <FiChevronRight size={35} color={colors.subText} />
        </CardComponent>
    );
};

export default Card;
