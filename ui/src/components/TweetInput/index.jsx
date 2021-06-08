import React from 'react'
import styles from './TweetInput.module.css'

class TweetInput extends React.Component{

    refreshPage(){
        // window.location.reload(false);
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.createTweet(this.content.value);
                    this.refreshPage();
                }}>
                    <input id="newTweet" 
                        className={styles.tweetInput}
                        type="text" 
                        placeholder="What are you thinking?"
                        
                        ref = {(input) => {
                            this.content = input;
                        }}
                        
                        required/>
                    
                    <input className={styles.submitBtn} 
                        type="submit" 
                        value="Tweet"/>

                </form>
            </div>
        )
    }
}

export default TweetInput;