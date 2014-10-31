/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package twitterData;

import twitter4j.IDs;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;

/**
 *
 * @author S519374
 */
public class TwitterConnection {
    
    private static final String consumerKey = "5BrjRXqdRiGCD5pM7HrYwUglZ";
    private static final String consumerSecret = "5GZ46Ahzr4dr3xqhmP5nI04nTTOLHGlRVQXbnarGBB6NIiauf6";
    private static final String accessToken = "121478126-Q74F1jM1qNDVLKH2B3BUnOLmMWHRvGiejFQBK1KQ";
    private static final String accessTokenSecret = "TfF8Ce1QQNrqeeZPf7SOwHWccOYzAvBmWBl9R1vDPU768";
    
    Twitter twitter;
    
    public TwitterConnection(){
        twitter = new TwitterFactory().getInstance();
        twitter.setOAuthConsumer(consumerKey, consumerSecret);
        twitter.setOAuthAccessToken(new AccessToken(accessToken, accessTokenSecret, 12147812));
    }
    
    //To get Followers list for self
    public long[] getIds() throws TwitterException{
        IDs id1 = twitter.getFollowersIDs(-1);

        return id1.getIDs();
        
    }
    
    public long[] getFollowinglist() throws TwitterException{
        IDs id1 = twitter.getFriendsIDs(-1);
        
        return id1.getIDs();
    }
    
    public long[] listOfQueriedUser(long userId) throws TwitterException{
        IDs id1 = twitter.getFollowersIDs(userId, -1);
        
        return id1.getIDs();
    }
    
    
    
    
}
