import React from 'react';
import { Suspense } from 'react';

export const withSuspence = (Component) => {
    return (props) => {
        return <Suspense fallback={<div>Loading...</div>}>
        <Component {...props}/>
        </Suspense>
    }
}
