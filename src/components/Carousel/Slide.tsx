import React, {CSSProperties, ReactNode} from 'react';
import styled from 'styled-components/macro';
import {SlideProps} from '../../ts/interface';
import {css} from 'styled-components';

interface Props extends SlideProps {
    children: ReactNode;
    style?: CSSProperties;
    className?: 'string';
}

const Slide: React.FC<Props> = (props) => {
    const {children, style, betweenSlides, imageFit, borderRadius, className, hoverEffect, hoverZoom, hoverTranslate} =
        props;

    return (
        <CarouselSlide
            className={`slide ${className || ''}`}
            hoverEffect={hoverEffect}
            hoverTranslate={hoverTranslate}
            hoverZoom={hoverZoom}
            style={{...(betweenSlides && {marginRight: betweenSlides}), ...{borderRadius}, ...style}}
            imageFit={imageFit}
        >
            {children}
        </CarouselSlide>
    );
};

export default Slide;

const CarouselSlide = styled.div<SlideProps>`
    height: 100%;
    flex-shrink: 0;
    overflow: hidden;
    transition: transform 0.3s;

    * {
        user-select: none;
        pointer-events: none;
    }

    ${({hoverEffect, hoverZoom, hoverTranslate}) =>
        hoverEffect === 'zoom'
            ? css`
                  &:hover {
                      transform: scale(${hoverZoom || 1.1});
                  }
              `
            : hoverEffect === 'translate' &&
              css`
                  &:hover {
                      transform: translateY(${hoverTranslate || -5}px);
                  }
              `}

    img {
        object-fit: ${({imageFit}) => imageFit || 'contain'};
        width: 100%;
        height: 100%;
    }
`;
