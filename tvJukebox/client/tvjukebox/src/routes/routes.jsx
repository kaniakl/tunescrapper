import React from 'react';
import {
    BrowserRouter as Router, Route, Link,
} from 'react-router-dom';
import Loading from '@components';

export function Routes() {
    return (
        <Router>
            <React.Suspense fallback={<Loading />}>
                
            </React.Suspense>
        </Router>
    );
}
