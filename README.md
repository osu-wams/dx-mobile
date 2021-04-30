# Local Development

Local development requires the `dx`, `dx-server` and `dx-mobile` applications to be running.

- `dx` : Provides the necessary routing for the SAML authentication to pass through to dx-server.
- `dx-server` : The API server provides authentication and data.
- `dx-mobile` : The mobile app.

## Open three windows to run each of the commands;

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
