import React from "react";
import { LoadingIcon } from "../index";

import { Container } from "./styles";

function Photo({
    src,
    loading = false,
    showOptions = true,
    onClickOptions = () => { },
    ...rest
}) {
    return showOptions ? (
        <Container
            isLoading={loading}
            clickable={!loading}
            onClick={() => !loading && onClickOptions()}
            {...rest}
        >
            <img src={src} alt={`photo_${rest.key}`} />
            {loading && <LoadingIcon />}
        </Container>
    ) : (
        <Container
            isLoading={loading}
            {...rest}
        >
            <img src={src} alt={`photo_${rest.key}`} />
            {loading && <LoadingIcon />}
        </Container>
    );
}

export default Photo;
