# Configuration

The mobile application has a few configurations to control behavior in local development and production, these files are not stored in revision control and need to be fetched from the external secrets management solution.

### Files

- `app/config/env.dev.ts` : Used for local development, typically would include a configured REFRESH token.
- `app/config/env.prod.ts` : Used for the deployed production application.

### Configurations

- API_URL: The full path the to API server. (ie. https://local.my.oregonstate.edu:4000/api)
- BASE_URL: The full path to the MyOSU base application. (ie. http://local.my.oregonstate.edu:4000)
- AUTH_REFRESH_JWT: A 'refresh' scoped JWT for use in local development to bypass the SAML authentication flow. (see: [dx-server README](https://github.com/osu-wams/dx-server#create-a-refresh-jwt-for-use-with-mobile-application-development))
- AUTH_STORE_KEY: A key name for mobile application secure storage on the device. (ie. dx_mobile_auth)

# Local Development

Local development requires the `dx`, `dx-server` and `dx-mobile` applications to be running.

- `dx` : Provides the necessary routing for the SAML authentication to pass through to dx-server.
- `dx-server` : The API server provides authentication and data.
- `dx-mobile` : The mobile app.

## Open three terminal windows to run each of the commands;

In the `dx-server` directory:

```shell
$ docker-compose up -d
$ yarn saml
```

In the `dx` directory:

```shell
$ yarn start
```

In the `dx-mobile` directory:

```shell
$ yarn start
```
