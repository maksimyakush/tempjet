import {JetApp, EmptyRouter, HashRouter} from 'webix-jet';
import './styles/app.css';

/* eslint-disable */
export default class MyApp extends JetApp {
    constructor(config) {
        const defaults = {
            mode: 'readonly',
            id: APPNAME,
            version: VERSION,
            router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
            debug: !PRODUCTION,
            start: '/top/contactsDatatable'
        };
        
        super({...defaults, ...config});
    }
}

if (!BUILD_AS_MODULE) {
    // const app = new MyApp();
    
    webix.ready(() => new MyApp().render());
}
/* eslint-enable */
