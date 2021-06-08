# Tweetchain

Twitter clone based on blockchain.

## Docker commands

-   Execute `docker-compose -f docker-compose.migrate.yml up ` to build and start the containers for the first time and deploy to Ropsten.

-   Execute `docker-compose -f docker-compose.tests.yml up ` to run the tests through Ganache.

## Truffle commands

-   Execute `truffle compile ` to compile the contracts.
-   Execute `truffle migrate --network ropsten ` to migrate to the Ropsten network.
