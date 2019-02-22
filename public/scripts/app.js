
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => { //checks for document readyness. everything is loaded up before executing these functions.

  //Checks for a submit event, validates the form and posts tweet. Uses helper functions for validations and addition to DOM.
  $(() => {
    $('#tweetForm').submit((event) => {
      event.preventDefault();
      const valid = validate();
      if (valid) {
        console.log('Loading...');
        $.post('/tweets', $('#tweetForm').serialize())
          .then(() => {
            $('#all-tweets').empty();
            loadTweets();
          });
        $('#tweet-input-textarea').val("");
      }
    });
  });

  //Makes a call to the databse and displays all tweets. 
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then((moreTweets) => {
        renderTweets(moreTweets);
      });
  }


  //Render new tweets onto the DOM
  const renderTweets = (tweets) => {
    tweets.reverse().forEach(element => {
      let tweet = createTweetElement(element);
      insertTweet(tweet);
    });
  }

  //Creates the structure to place new tweets in.
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
          ${timeCalc(tweet.created_at)}
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


  //Listens for the click on the 'Compose Tweet' button and shows and focuses on the input form upon click.
  $(() => {
    $('#compose-tweet').click(() => {
      $('#tweetForm').slideToggle("slow", () => {
        $('#tweet-input-textarea').focus();
      });
    });
  });

  loadTweets();
});

