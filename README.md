# minehut-download
minehut-download is a helpful tool that allows you to quickly download a folder from your Minehut server.

## Installation
1. Clone this repository by running `git clone https://github.com/tarna/minehut-download`.
2. Install the dependencies by running either `npm install` or `yarn install`.

## Configuration
1. Create a file called `.env` in the root directory of the project.
2. Copy the contents of `.env.example` into `.env`.
3. Fill in the values with your Minehut account authorization. View the [authorization](#authorization) section for more information.

## Authorization
To get your Minehut auth details, open the browser console while on the Minehut website and paste in the following code:
```js
const getCookie = (name) => decodeURIComponent(document.cookie).split("; ").find(
  cookie => cookie.startsWith(name)
).slice(name.length + 1);

console.log(({
    minehutToken: getCookie("access_token_prd"),
    minehutSession: localStorage.minehut_session_id,
    slgUserToken: localStorage.slg_user_token,
}));
```
Then copy over the values into the `.env` file.

## Usage

### Using NPM
1. Run `npm run build` to build the project.
2. Then run `node build/index.js --server=tarna --folder=world` to run the project with your own server and folder.

### Using Yarn
1. Run `yarn start --server=tarna --folder=world` to run the project with your own server and folder.

## Errors
If you are receiving an error, recheck the following:
- Your `.env` file is filled out correctly.
- You have the correct server name and folder name.
- You have the correct authorization details.
- The folder exists on your server.
- You own the server you are trying to download from.