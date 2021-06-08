import React from 'react'
import styles from './Tweets.module.css'

class TweetCard extends React.Component{

    componentWillMount(){
        this.getAddresbyId(this.props.tweet.id)
    }

    async getAddresbyId(id){
        const address = await this.props.tweetChain.methods.getAddressById(id).call();
        this.setState({address});
    }

    constructor(props){
		super(props);
		this.state = {address: ''};
	}

    render() {
        return(
            <div className={styles.tweetCard}>
                <div>
                    <span style={{fontWeight:"bold", paddingRight:".5rem"}}>
                        {this.state.address}
                    </span> 
                    · 
                    <span style={{color:'GrayText', paddingLeft:".5rem"}}>
                        {this.props.dateTime}
                    </span>
                </div>
                {this.props.tweet.content}
                
            </div>
        )
    }
}

class Tweets extends React.Component{
    render() {
        return (

            <div className={styles.tweetList}>

                {
                    this.props.tweets.map((tweet, key) => {
                        return(
                            <TweetCard
                                tweet={tweet}
                                tweetChain={this.props.tweetChain}
                            />
                        )
                    }) 
                }

            </div>

        )
    }
}

export default Tweets;