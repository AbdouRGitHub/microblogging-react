import {useCallback} from "react";

type UseIntersectionObserverOptions = {
    root?: Element | null;
    threshold?: number;
    rootMargin?: string;
    onIntersect: () => void,
    enabledFetching?: boolean
};


export function useInfiniteScroll({
                                      root = null,
                                      threshold = 1.0,
                                      rootMargin = "0px 0px 100px 0px", onIntersect, enabledFetching = false
                                  }: UseIntersectionObserverOptions): (node: HTMLDivElement) => (() => void) | undefined {

    return useCallback((node: HTMLDivElement): (() => void) | undefined => {
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!enabledFetching) return;
                    onIntersect();
                }
            },
            {
                root,
                threshold,
                rootMargin,
            }
        );
        observer.observe(node);

        return () => observer.disconnect();

    }, [root, threshold, rootMargin, enabledFetching, onIntersect]);
}