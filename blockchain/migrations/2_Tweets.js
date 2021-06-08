const Tweets = artifacts.require("Tweets.sol")

module.exports = function(deployer, network) {
    
    return deployer
        .then( () => {
            console.log("Starting deploying Tweets on " + network);
            return deployer.deploy(Tweets); 
        })
        .then( () => {
            console.log("Tweets succesfully deployed");
        })

}