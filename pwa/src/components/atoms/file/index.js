import React from "react";
import { FaTimes } from "react-icons/fa";
import { LoadingIcon } from "../index";

import {
    CardFile,
    HeaderCardFile,
    TitleFile,
    CloseButton,
    SizeFile,
} from "./styles";

function File({
    filename,
    size,
    url,
    loading = false,
    showRemove = true,
    onClickRemove = () => {},
    ...rest
}) {
    return (
        <CardFile isLoading={loading} {...rest}>
            <HeaderCardFile>
                <TitleFile href={url} target={"_black"} download={filename}>
                    {filename}
                </TitleFile>
                {showRemove && (
                    <CloseButton
                        type={"button"}
                        onClick={() => (loading ? {} : onClickRemove())}
                    >
                        {loading ? <LoadingIcon /> : <FaTimes />}
                    </CloseButton>
                )}
            </HeaderCardFile>
            <SizeFile>{size}</SizeFile>
        </CardFile>
    );
}

export default File;
