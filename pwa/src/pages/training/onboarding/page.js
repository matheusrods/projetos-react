import React, { useContext, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/modules/pagination/pagination';

import * as OnboardingStyles from './styles';
import useTrainingOnboarding from './useOnboarding';
import { TrainingContext } from '..';

const Onboarding = () => {
    const { setDidOnboarding } = useContext(TrainingContext);
    const { sliders, curSlider, setcurSlider } = useTrainingOnboarding();

    const swiperRef = useRef(null);
    const lastOne = sliders.length - 1;

    const lastSlider = useMemo(
        () => curSlider !== lastOne,
        [curSlider, lastOne]
    );

    return (
        <OnboardingStyles.Container>
            <OnboardingStyles.Content>
                {lastSlider && (
                    <OnboardingStyles.OutlineButton
                        onClick={() =>
                            swiperRef.current.swiper.slideTo(lastOne)
                        }
                    >
                        Pular
                    </OnboardingStyles.OutlineButton>
                )}

                <OnboardingStyles.Caption>
                    {sliders[curSlider].caption}
                </OnboardingStyles.Caption>
            </OnboardingStyles.Content>

            <OnboardingStyles.Content>
                <Swiper
                    ref={swiperRef}
                    effect={'cards'}
                    grabCursor={true}
                    className="mySwiper"
                    pagination={true}
                    onPaginationUpdate={({ activeIndex }) =>
                        setcurSlider(activeIndex)
                    }
                    style={{ height: 320, width: 257 }}
                >
                    {sliders.map(({ title, content, icon, color }, idx) => (
                        <SwiperSlide key={`${title}_${idx}`}>
                            <OnboardingStyles.Card color={color}>
                                <OnboardingStyles.Icon color={color}>
                                    {icon}
                                </OnboardingStyles.Icon>

                                <OnboardingStyles.Title>
                                    {title}
                                </OnboardingStyles.Title>

                                <OnboardingStyles.Text>
                                    {content}
                                </OnboardingStyles.Text>
                            </OnboardingStyles.Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </OnboardingStyles.Content>

            <OnboardingStyles.Footer>
                <OnboardingStyles.ControlButton
                    onClick={() =>
                        lastSlider
                            ? swiperRef.current.swiper.slideNext()
                            : setDidOnboarding()
                    }
                >
                    {lastSlider ? 'Próximo' : 'Vamos começar'}
                </OnboardingStyles.ControlButton>
            </OnboardingStyles.Footer>
        </OnboardingStyles.Container>
    );
};

export default Onboarding;
