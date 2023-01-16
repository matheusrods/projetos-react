import React, { Fragment, useEffect, useRef, useState } from 'react';
import mergeImages from 'merge-images';
import CanvasDraw from 'react-canvas-draw';
import {
    Container,
    Header,
    Footer,
    Color,
    Button,
    DotButton,
    ContainerActions,
    WeightLine
} from './styles';

const colors = [
    '#000000',
    '#FF0000',
    '#00FFFF',
    '#0000FF',
    '#0000A0',
    '#ADD8E6',
    '#800080',
    '#FFFF00',
    '#00FF00',
    '#FF00FF'
];

const sizeLines = [5, 7, 9, 11, 13];

const EditPhoto = ({
   onClose,
   file,
   fileBase64,
   setStep,
   setPictures,
   updatePicture,
   pictures
}) => {

    const refCanvas = useRef(null);

    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const updatePictureLocal = (picture, index) => {
        if(setPictures !== null){
            const newPictures = [...pictures];
            newPictures[index] = picture;
            setPictures(newPictures);
        }else{
            updatePicture(picture, file);
        }
        onClose();
    }
    useEffect(() => {
        getDimensionsDraw(fileBase64);

        window.addEventListener("resize", () => {
            getDimensionsDraw(fileBase64);
        });
    }, [fileBase64]);

    const getDimensionsDraw = async (base64) => {
        function getDimensionsBase64(fileSrc) {
            return new Promise(function (resolved) {
                const image = new Image();

                image.onload = function () {
                    resolved({ widthImage: image.width, heightImage: image.height });
                };

                image.src = fileSrc;
            });
        }

        const { widthImage = 0, heightImage = 0 } = await getDimensionsBase64(base64);

        if (
            widthImage !== 0
            && heightImage !== 0
            && (
                widthImage > window.innerWidth
                || heightImage > (window.innerHeight - (window.innerWidth <= 768 ? 80 : 159))
            )
        ) {
            const proportion = widthImage > heightImage ? heightImage / widthImage : widthImage / heightImage;

            if (window.innerWidth > (window.innerHeight - (window.innerWidth <= 768 ? 80 : 159))) {
                if (widthImage > heightImage) {
                    setWidth(window.innerHeight - (window.innerWidth <= 768 ? 80 : 159));
                    setHeight((window.innerHeight - (window.innerWidth <= 768 ? 80 : 159)) * proportion);
                } else {
                    setWidth((window.innerHeight - (window.innerWidth <= 768 ? 80 : 159)) * proportion);
                    setHeight(window.innerHeight - (window.innerWidth <= 768 ? 80 : 159));
                }
            } else {
                if (widthImage > heightImage) {
                    setWidth(window.innerWidth);
                    setHeight(window.innerWidth * proportion);
                } else {
                    setWidth(window.innerWidth * proportion);
                    setHeight(window.innerWidth);
                }
            }
        } else {
            setWidth(widthImage > window.innerWidth ? window.innerWidth : widthImage);
            setHeight(
                heightImage > (window.innerHeight - 80 - (window.innerWidth <= 768 ? 0 : 79))
                    ? (window.innerHeight - 80 - (window.innerWidth <= 768 ? 0 : 79))
                    : heightImage
            );
        }
    }

    return (
        <Fragment>
            <Container>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Header>
                        <Button onClick={() => onClose()}>Fechar</Button>
                        <ContainerActions>
                            <DotButton
                                onClick={() =>
                                    setSize(sizeLines[size + 1] ? size + 1 : 0)
                                }
                            >
                                <WeightLine size={sizeLines[size]} />
                            </DotButton>
                            <Button onClick={() => refCanvas.current.undo()}>
                                Desfazer
                            </Button>
                            <Button onClick={() => refCanvas.current.clear()}>
                                Limpar
                            </Button>
                            <Button
                                onClick={() => {
                                    mergeImages(
                                        [
                                            {
                                                src: refCanvas.current.canvas.grid.toDataURL()
                                            },
                                            {
                                                src: refCanvas.current.canvas.drawing.toDataURL()
                                            }
                                        ],
                                        {
                                            format: "image/png",
                                            quality: 1,
                                            height: height,
                                            width: width,
                                        }
                                    ).then((b64) => {
                                        updatePictureLocal(b64, file);

                                    });
                                }}
                            >
                                Salvar
                            </Button>
                        </ContainerActions>
                    </Header>
                    <div style={{ flex: 1, backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CanvasDraw
                            hideGrid
                            ref={refCanvas}
                            canvasHeight={height}
                            canvasWidth={width}
                            brushColor={color}
                            lazyRadius={10}
                            brushRadius={sizeLines[size]}
                            imgSrc={fileBase64}
                        />
                    </div>
                    <Footer>
                        {colors.map((colorHex, index) => {
                            return (
                                <Color
                                    key={index.toString()}
                                    color={colorHex}
                                    onClick={() => setColor(colorHex)}
                                />
                            );
                        })}
                    </Footer>
                </div>
            </Container>
        </Fragment>
    );
};

export default EditPhoto;
