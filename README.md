This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run with local Ganache
### Prepare the local ganche network (use node 12 as 14 failes to properly work with ganache)
1. `cd ganache-env`
2. `npm run start-ganache` (This will start a prcess that will block the terminal)
3. `npm run deploy-driver` (This will deploy all of the contracts + Start a basic scenario with ORBS assigned to the main local account + will create the JSONs holding the addresses of all deployed contracts)
### Start the app
1. `npm run start`

### Local accounts
1. The 'start-ganache' command will print the private keys of all generated accounts. The main one is `0xf2ce3a9eddde6e5d996f6fe7c1882960b0e8ee8d799e0ef608276b8de4dc7f19` - use it for local dev.


## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.