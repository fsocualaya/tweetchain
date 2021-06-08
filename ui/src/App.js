import React from 'react';
import './App.css';
import TweetInput from './components/TweetInput'
import Tweets from './components/Tweets'
import Web3 from 'web3';

import {GAS_LIMIT, TWEETCHAIN_ADDRESS, TWEETCHAIN_ABI} from './config'

class App extends React.Component {

	componentWillMount(){
		this.loadBlockchainData();
	}

	async loadBlockchainData(){
		
		let web3;
		if(window.ethereum){
			web3 = new Web3(window.ethereum);
			try { 
				window.ethereum.enable().then(function() {
					// User has allowed account access to DApp...
					// alert("Great!")
				});
			} catch(e) {
				// User has denied account access to DApp...

				// alert("Woops! You need to enable Metamask")
				web3 = new Web3( Web3.givenProvider || "http://localhost:8545" );
			}
		}

		const accounts = await web3.eth.getAccounts();
		this.setState({ account: accounts[0]});

		const tweetChain = new web3.eth.Contract(TWEETCHAIN_ABI, TWEETCHAIN_ADDRESS);
		this.setState({ tweetChain });
		const tweetCount = await tweetChain.methods.tweetCount().call();
		this.setState({ tweetCount});

		if(tweetCount !== 0){
			for(let i=tweetCount-1;i>=0;--i){
				const tweet = await tweetChain.methods.tweets(i).call();
				this.setState(
					{tweets: [...this.state.tweets, tweet]}
				)
			}
		}
		console.log(this.state.tweets);
	}

	constructor(props){
		super(props);
		this.state = {account: '', tweetCount: 0, tweets: [], loading: true};
		this.createTweet = this.createTweet.bind(this);
	}

	createTweet(content){
		this.setState({ loading: true });
		this.state.tweetChain.methods.createTweet(content).send({ from: this.state.account, gas: GAS_LIMIT })
		.once('receipt', (receipt) => {
			this.setState({ loading: false })
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>TweetChain</h1>
				</header>

				<p style={{color:"white"}}>
					Hello <span style={{fontWeight:"bold"}}>{this.state.account}</span> ! 
				</p>

				<div>
					<TweetInput 
						accountAddress={this.state.account}
						createTweet={this.createTweet}	
					/>

					<p style={{color:"white"}}>
					Number of tweets: {this.state.tweetCount}
					</p>
					<Tweets 
						tweets={this.state.tweets}
						tweetChain={this.state.tweetChain}
					/>
				</div>
			</div>
		);
	}
	
}

export default App;
