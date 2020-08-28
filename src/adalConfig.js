import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';


export const adalConfig = {
    tenant: 'Replace app tentant',
    clientId: 'Replace client id',
    endpoints: {
        api: window.location.origin,
    },
    cacheLocation:'localStorage'
};



export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);