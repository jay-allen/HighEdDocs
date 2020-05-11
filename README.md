# Web Team Documentation

## Overview

The documentation site is running a combination of [11ty](https://www.11ty.dev), [Netlify CMS](https://www.netlifycms.org/), and custom PowerShell scripts. The site also uses a self-hosted [application](https://github.com/vencax/netlify-cms-github-oauth-provider) to handle OAuth authentication with Github.

The site is currently only accessible from on-campus.

## Installation - Local Development
* Clone the repo
* From the root directory run `npm install`


## Common Commands
* Run Locally - `npm start`
* Create Build - `npm run build`
* Compile SASS - `npm run styles`
* Deploy your local build to the remote server - `cd .\scripts; .\Sync-LocalToProd.ps1`

