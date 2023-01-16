import React from "react";
import {
    Card,
} from "./styles";

import colors from '../../../styles/colors';


const ShapeCard = ({
    backgroundColor = colors.shapeCard,
    shadow = false,
    children,
}) => {
    return (
        <Card
            backgroundColor={backgroundColor}
            shadow={shadow}
        >
            {children}
        </Card>
    );
};

export default ShapeCard;
