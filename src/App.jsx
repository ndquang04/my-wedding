import {Switch, Route} from 'wouter';
import {QueryClientProvider} from '@tanstack/react-query';
import {Suspense} from 'react';

import {ThemeProvider} from './contexts/ThemeContext';
import {LanguageProvider} from './contexts/LanguageContext';

import NotFound from './pages/not-found';
import Home from './pages/Home';

import {I18nextProvider} from 'react-i18next';
import i18n from './lib/i18n';
import {queryClient} from './lib/queryClient';
import {Toaster} from './components/ui/Toaster';

// Main Router Component
function Router() {
  return (
    <Switch>
      <Route path='/' component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback='Loading...'>
        <ThemeProvider>
          <LanguageProvider>
            <QueryClientProvider client={queryClient}>
              <Router />
              <Toaster />
            </QueryClientProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Suspense>
    </I18nextProvider>
  );
};

export default App;
