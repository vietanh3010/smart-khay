import { memo } from 'react';
import './app.scss';
import AppRouter from './routers/AppRouter';

//primereact theme
import "primereact/resources/themes/lara-light-blue/theme.css";
//primereact core
import "primereact/resources/primereact.min.css";
//primereact config
import PrimeReact from 'primereact/api';
//primereact icon style
import 'primeicons/primeicons.css';
import useI18n from './hooks/useI18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


//use in a component
PrimeReact.inputStyle = 'filled';
PrimeReact.ripple = true;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: true,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: 1,
            retryDelay: 3000,
        },
    },
})

const App = (): JSX.Element => {
    useI18n();
    
    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter/>
        </QueryClientProvider>
    )
}

export default memo(App)
