<h1 align="center">Build Guide</h1>
<p align="right"><b>Build Target:</b> dev</p>

## Build environment
* Node v16.x
* yarn v1.x

> **Note**  
> Currently Yarn 1.x is preferred due to compatibility reasons.  
> Due to Nuxt2's dependency issue, Node 16.x is preferred instead of 18.x.  

## Building Frontend
1. cd into `WEB(FE)`.
2. Run `yarn` to download dependencies.
3. Run `yarn build` to build initial frontend.
4. Run `yarn start` to start Nuxt server on your localhost.  
   Alternatively, You can use `pm2 start ecosystem.config.js`  

## Building Backend
1. cd into `WEB(BE)`.
2. Run `yarn` to download dependencies.
3. Edit `.env` to match your local setup. Please refer to `.env.example` for more information on each environment variables.
4. Run `yarn prisma db push` to synchronize `prisma.schema` file with your mySQL (or compatible) database
5. Run `yarn generate` to generate Typescript typings.
6. Run `yarn build` to build Typescript code into Javascript.
   > **Note**  
   > For faster deployment, backend build utilizes [SWC](https://github.com/swc-project/swc), A Super-fast TS/JS compiler for the web.  
   > If the compilation fails, you can always build with fallback to stock Typescript builder via running command `yarn build:types`  
7. Run `yarn start` to start your local fastify server.  
   Alternatively, You can use `pm2 start ecosystem.config.js`  

## Setting up Accounts Backend
1. Clone [upstream meiliNG repository](https://github.com/meili-NG/meiliNG)
2. Follow directions on [INSTALL.md](https://github.com/meili-NG/meiliNG/blob/main/INSTALL.md)  
3. Setup your meiliNG frontend.
   > **TODO**
   > Properly implement open-source meiliNG frontend. [Issue](https://github.com/meili-NG/meiliNG/issues/41)  
   >   
   > Use proprietary version at the moment

