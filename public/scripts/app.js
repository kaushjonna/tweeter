
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Helper Functions
const escape = (str) => {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const timeCalc = (uTime) => {
  const date = new Date();
  const diffTime = date - uTime;
  const daysElapsed = Math.round(diffTime / 24 / 60 / 60 / 1000);
  return daysElapsed;
}

$(document).ready(() => { //checks for document readyness. everything is loaded up before executing these functions.

  const validate = () => {
    const tweet = $('#tweet-input-textarea').val();
    if (tweet === "") {
      $('#alerts').css({ 'visibility': 'visible' });
      $('#alerts').slideDown(() => {
        $('#alerts').text("Warning: No content to tweet. Please enter something in the box.");
        setTimeout(() => {
          $('#alerts').slideUp(() => {
            console.log('done')
          });
        }, 4000);
        console.log('triggered');
      });
      return false;
    } else if (tweet.length > 140) {
      $('#alerts').css({ 'visibility': 'visible' });
      $('#alerts').slideDown(() => {
        $('#alerts').text("Warning: tweet longer than 140 characters.");
        setTimeout(() => {
          $('#alerts').slideUp(() => {
            console.log('done')
          });
        }, 4000);
        console.log('triggered');
      });
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
        $('#tweet-input-textarea').val("");
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
    tweets.reverse().forEach(element => {
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

  $(() => {
    $('#compose-tweet').click(() => {
      $('#tweetForm').slideToggle("slow", () => {
        $('#tweet-input-textarea').focus();
      });
    });
  });

  loadTweets();
});

