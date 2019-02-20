/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(() => {
  const validate = () => {
    const tweet = $('#tweet-input-textarea').val();
    if (tweet === "") {
      alert('there is no tweet');
      return false;
    } else if (tweet.length > 140) {
      alert('Tweet Too long, please keep under 140 characters');
      return false;
    }
    return true;
  }

  $(() => {
    $('#tweetForm').submit((event) => {
      event.preventDefault();
      const valid = validate();
      if (valid) {
        console.log('performing ajax call');
        $.post('/tweets', $('#tweetForm').serialize())
          .then(() => {
            console.log('complete!');
            $('#all-tweets').empty();
            loadTweets();
          });
      }
    });
  });

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((moreTweets) => {
        console.log('more Tweets: ', moreTweets);
        renderTweets(moreTweets);
      });
  }


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

  <p id="tweet-text">${escape(tweet.content.text)}</p>

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

  loadTweets();
});

