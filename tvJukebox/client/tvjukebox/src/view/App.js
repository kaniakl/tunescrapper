import React, { Suspense } from 'react';
import { Layout } from '@/view/Layout';
import { Home } from '@/view/Home';
import { Route, Switch } from 'react-router';
import { LocaleWrapper, BreakpointWrapper } from '@/components';

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="App">
                <Switch>
                    <LocaleWrapper>
                        <BreakpointWrapper>
                            <Layout>
                                <Route exact path="/" component={Home}/>
                            </Layout>
                        </BreakpointWrapper>
                    </LocaleWrapper>
                </Switch>
            </div>
        </Suspense>
    );
}

export default App;
