import React, {Children, CSSProperties, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/macro';
import {css} from 'styled-components';
import {SharedCarouselProps} from '../../ts/interface';
import ArrowButton from '../UI/ArrowButton';
import {flex, OFFSETS} from '../../constants/style';
import {useSwipeable} from 'react-swipeable';
import {InputSlide} from '../../ts/enums';
import {Formik} from 'formik';
import {IoCheckmarkSharp} from 'react-icons/io5';

interface Props extends SharedCarouselProps {
    children: JSX.Element | JSX.Element[] | null | undefined;
    style?: CSSProperties;
    hideArrows?: boolean;
    ArrowsElement?: React.ElementType;
    draggable?: boolean;
}

const Carousel: React.FC<Props> = (props) => {
    const {
        children,
        style,
        offsetBefore,
        offsetAfter,
        betweenSlides,
        hoverEffect,
        hoverZoom,
        hoverTranslate,
        imageFit,
        hideArrows,
        ArrowsElement,
        borderRadius,
        transitionSpeed,
        transitionFnc,
        draggable
    } = props;

    const [activeSlide, setActiveSlide] = useState(0);
    const [sliderPosition, setSliderPosition] = useState(0);
    const childrenCount = Children.count(children);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const [slideFinalWidth, setSlideFinalWidth] = useState(0);
    const [inputSlide, setInputSlide] = useState<InputSlide | number>(InputSlide.Null);

    const changeSlide = (direction: 'prev' | 'next' | 'toSlide', slideIndex?: number) => {
        if (direction === 'toSlide' && slideIndex !== undefined) {
            let prettyIndex = Math.floor(slideIndex);
            if (prettyIndex < 1) {
                prettyIndex = 1;
            }
            if (prettyIndex > childrenCount) {
                prettyIndex = childrenCount - 1;
            }
            setActiveSlide(prettyIndex - 1);
            return setSliderPosition(prettyIndex * slideFinalWidth + (offsetBefore || 0));
        }
        if (direction === 'prev') {
            if (activeSlide > 0) {
                setActiveSlide((current) => current - 1);
                return setSliderPosition((activeSlide - 1) * slideFinalWidth + (offsetBefore || 0));
            }
            setActiveSlide(childrenCount - 1);
            return setSliderPosition((childrenCount - 1) * slideFinalWidth + (offsetBefore || 0));
        }
        if (direction === 'next') {
            if (activeSlide < childrenCount - 1) {
                setActiveSlide((current) => current + 1);
                return setSliderPosition(slideFinalWidth * (activeSlide + 1) + (offsetBefore || 0));
            }
            setActiveSlide(0);
            return setSliderPosition(0);
        }
    };

    const dragHandler = useSwipeable({
        onSwipedLeft: () => changeSlide('next'),
        onSwipedRight: () => changeSlide('prev'),
        trackMouse: true,
        trackTouch: true
    });

    useEffect(() => {
        if (sliderRef && sliderRef.current && childrenCount > 0 && !slideFinalWidth) {
            setSlideFinalWidth(
                (sliderRef.current.offsetWidth - (offsetBefore || 0) - (offsetAfter || 0)) / childrenCount
            );
        }
    }, [sliderRef, childrenCount, offsetAfter, offsetBefore, betweenSlides]);

    return (
        <Container style={style} {...(draggable ? dragHandler : null)} data-test-id="carousel-container">
            <Inner
                ref={sliderRef}
                style={{transform: `translateX(-${sliderPosition}px)`}}
                offsetBefore={offsetBefore}
                offsetAfter={offsetAfter}
                transitionSpeed={transitionSpeed}
                transitionFnc={transitionFnc}
                data-test-id="carousel-inner"
            >
                {children
                    ? Children.map(children, (child) =>
                          React.cloneElement(child, {
                              betweenSlides,
                              imageFit,
                              hoverEffect,
                              hoverZoom,
                              hoverTranslate,
                              borderRadius
                          })
                      )
                    : null}
            </Inner>
            {!hideArrows ? (
                ArrowsElement ? (
                    <ArrowsElement />
                ) : (
                    <Controls>
                        <ArrowButton arrow="left" onClick={() => changeSlide('prev')} data-test-id="prev-slide" />
                        {inputSlide === InputSlide.Editing ? (
                            <Formik
                                initialValues={{slide: 0}}
                                onSubmit={(values) => {
                                    changeSlide('toSlide', values.slide);
                                    setInputSlide(InputSlide.Null);
                                }}
                            >
                                {(props) => (
                                    <form onSubmit={props.handleSubmit}>
                                        <Counter>
                                            <Input
                                                type="number"
                                                name="slide"
                                                value={props.values.slide || ''}
                                                onChange={props.handleChange}
                                                data-test-id="slide-index-input"
                                            />
                                            <button type="submit" data-test-id="slide-index-enter">
                                                <IoCheckmarkSharp size={24} />
                                            </button>
                                        </Counter>
                                    </form>
                                )}
                            </Formik>
                        ) : (
                            <Counter onClick={() => setInputSlide(InputSlide.Editing)} data-test-id="change-index">
                                {activeSlide + 1} / {childrenCount}
                            </Counter>
                        )}
                        <ArrowButton arrow="right" onClick={() => changeSlide('next')} data-test-id="next-slide" />
                    </Controls>
                )
            ) : null}
        </Container>
    );
};

export default Carousel;

const Container = styled.div`
    //overflow: hidden;
`;

const Inner = styled.div<SharedCarouselProps>`
    position: relative;
    width: fit-content;
    width: -webkit-fit-content;
    ${flex.start}

    transition: transform ${({transitionSpeed}) => transitionSpeed || '0.4s'} ${({transitionFnc}) =>
        transitionFnc || ''};
    height: 100%;
    ${({offsetBefore}) =>
        offsetBefore &&
        css`
            padding-left: ${offsetBefore}px;
        `}
    ${({offsetAfter}) =>
        offsetAfter &&
        css`
            padding-right: ${offsetAfter}px;
        `}
`;

const Counter = styled.p`
    min-width: 60px;
    text-align: center;
    padding: 0 ${OFFSETS.small};
    ${flex.center}
`;

const Controls = styled.div`
    ${flex.center}
    padding-top: ${OFFSETS.large}
`;

const Input = styled.input`
    height: 100%;
    width: 45px;
    text-align: center;
    margin: 0 ${OFFSETS.small};
`;
