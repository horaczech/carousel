export interface SharedCarouselProps extends SlideProps {
    offsetBefore?: number;
    offsetAfter?: number;
    transitionSpeed?: string;
    transitionFnc?: string;
}

export interface SlideProps {
    betweenSlides?: number;
    hoverEffect?: 'zoom' | 'translate';
    hoverZoom?: number;
    hoverTranslate?: number;
    imageFit?: 'contain' | 'cover' | 'fill' | 'none';
    borderRadius?: number;
}
