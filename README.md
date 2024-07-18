<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

Claro, aquí te dejo un ejemplo de cómo podría ser un archivo `README.md` en formato Markdown para un proyecto de backend que implementa la lógica de un e-commerce con los requisitos mencionados:

---

# Backend para E-commerce

Este proyecto de backend implementa la lógica necesaria para un e-commerce, incluyendo endpoints para consultar productos, crear entregas, manejar transacciones y conectar con una pasarela de pagos. A continuación se detallan los principales componentes y funcionalidades del proyecto.

## Funcionalidades

- Consultar varios productos.
- Consultar un producto por su ID.
- Crear entregas.
- Crear transacciones.
- Consumir un webhook de la pasarela de pagos para actualizar el estado de una transacción.
- Conectarse a la API de una pasarela de pagos para crear y consultar transacciones por su ID.

## Tecnologías Utilizadas

- Nest.js
- PostgreSql (o base de datos de tu elección)
- Integración con pasarela de pagos (ejemplo: Stripe, PayPal)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Estebanvg120/Backend-Test.git
   cd tu-proyecto
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno necesarias (ver sección siguiente).

## Configuración de Variables de Entorno

El proyecto utiliza variables de entorno para configurar las credenciales y otros datos sensibles. Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DATABASE=namedatabase
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true
PUBLIC_KEY = keypublic
PRIVATE_KEY = keypriv
URL_CONSUMO_BASE =https://pasareladepagos.com/v1/
PREFIJO=01test-v1-
INTEGRITY=keyintegrity
```

Asegúrate de reemplazar `your_stripe_secret_key` y `your_paypal_client_id` con las claves y tokens reales proporcionados por la pasarela de pagos correspondiente.

## Uso

Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

```bash
npm start
```

Esto iniciará el servidor en el puerto especificado en tus variables de entorno (`PORT`).

## Endpoints
Para encontrar la documentación con cada endpoint, consultar la siguiente ruta
```bash
   http://ec2-18-208-169-227.compute-1.amazonaws.com:3000/api
   ```

## Contribuciones

Si deseas contribuir a este proyecto, por favor realiza un fork del repositorio y envía tus pull requests. Si encuentras algún problema o tienes sugerencias, abre un issue en el repositorio.

---
