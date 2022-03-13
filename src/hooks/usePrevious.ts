// MutablaRefObject - we're telling that its content is ever changing as we passed and using generics
// to handle the value that we need for referencing.
import { useEffect, useRef, type MutableRefObject } from 'react';

const usePrevious = <T>(value?: T): MutableRefObject<T | undefined>['current'] => {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export default usePrevious;