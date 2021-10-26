import React, { Suspense } from 'react';
import { Layout } from '@/view/Layout';
import { Home } from '@/view/Home';
import { Route, Switch } from 'react-router';
import { LocaleWrapper } from '@/components';

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="App">
                <Switch>
                    <LocaleWrapper>
                        <Layout>
                            <Route exact path="/" component={Home}/>
                        </Layout>
                    </LocaleWrapper>
                </Switch>
            </div>
        </Suspense>
    );
}

export default App;
