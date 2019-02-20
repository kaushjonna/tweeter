/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  const renderTweets = (tweets) => {
    tweets.forEach(element => {
      let tweet = createTweetElement(element);
      console.log('done');
      insertTweet(tweet);
      console.log('more done');
    });
  }

  const createTweetElement = (tweet) => {
    const composed = $('<section id="tweet-container">').append(
      `<article>
      <header>
    <img src=${tweet.user.avatars.small}>
    <h1>${tweet.user.name}</h1>
    <p>${tweet.user.handle}</p>
  </header>

  <p id="tweet-text">${tweet.content.text}</p>

  <footer>
    ${timeCalc(tweet.created_at)} days ago.
    <span id="action-icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </span>
  </footer>
  </article>`
    );

    return composed;
  }

  const insertTweet = (composedTweet) => {
    $('#all-tweets').append(composedTweet);
  }

  const timeCalc = (uTime) => {
    const date = new Date();
    const diffTime = date - uTime;
    const daysElapsed = Math.round(diffTime / 24 / 60 / 60 / 1000);
    return daysElapsed;
  }

  renderTweets(data);
});

