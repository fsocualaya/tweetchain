pragma solidity >=0.4.22 <0.9.0;

contract Tweets {
    uint256 public tweetCount = 0;
    event newTweet(uint256 id, string content);

    struct Tweet {
        uint256 id;
        string content;
    }

    Tweet[] public tweets;

    mapping(uint256 => address) public idToAddress;

    function createTweet(string memory _content) public {
        tweets.push(Tweet(tweetCount, _content));
        idToAddress[tweetCount] = msg.sender;
        tweetCount++;

        emit newTweet(tweetCount, _content);
    }

    function getAddressById(uint256 id) public view returns (address) {
        return idToAddress[id];
    }
}
