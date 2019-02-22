
//Helper Functions
const escape = (str) => {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//calculates the elapsed time.
const timeCalc = (uTime) => {
  const date = new Date();
  const diffTime = date - uTime;
  const outputTime = () => {
    let elapsedMinutes = diffTime / 60 / 1000;
    let elapsedHours = diffTime / 60 / 60 / 1000;
    let elapsedDays = diffTime / 24 / 60 / 60 / 1000;
    let elapsedWeeks = diffTime / 7 / 24 / 60 / 60 / 1000;

    if (elapsedWeeks < 1) {
      if (elapsedDays <= 6) {
        if (elapsedDays == 1) {
          return Math.round(elapsedDays) + ' day ago';
        } else if (elapsedDays < 1) {
          if (elapsedHours < 1) {
            if (elapsedMinutes < 1) {
              return 'About a minute ago';
            }
            return Math.round(elapsedMinutes) + ' minutes ago';
          }
          return Math.round(elapsedHours) + ' hours ago';
        }
        return Math.round(elapsedDays) + ' days ago';
      }
      return 'about a week ago';
    }

    if (elapsedWeeks > 52) {
      return Math.round(elapsedWeeks / 52) + ' years ago';
    }
    return Math.round(elapsedWeeks) + ' weeks ago';
  }
  return outputTime();
}


//Display error message upon false validation.
const validate = () => {
  const $tweet = $('#tweet-input-textarea').val();
  //checks for Empty tweet box and responds with appropriate error
  if ($tweet === "") {
    $('#alerts').css({ 'visibility': 'visible' });
    $('#alerts').slideDown(() => {
      $('#alerts').text("Warning: No content to tweet. Please enter something in the box.");
    });
    setTimeout(() => {
      $('#alerts').slideUp(() => {
        $('#alerts').text("");
      });
    }, 4000);

    $('#tweet-input-textarea').on('keypress', () => {
      $('#alerts').slideUp(() => {
        $('#alerts').text("");
      })
    });
    return false;

    //checks for tweet length over 140 characters.
  } else if ($tweet.length > 140) {
    $('#alerts').css({ 'visibility': 'visible' });
    $('#alerts').slideDown(() => {
      $('#alerts').text("Warning: tweet longer than 140 characters.");
    });
    setTimeout(() => {
      $('#alerts').slideUp(() => {
        $('#alerts').text("");
      });
    }, 4000);

    $('#tweet-input-textarea').on('keypress', () => {
      $('#alerts').slideUp(() => {
        $('#alerts').text("");
      })
    });
    return false;

  }
  return true;
}

//Adding all composed tweets to the DOM.
const insertTweet = (composedTweet) => {
  $('#all-tweets').append(composedTweet);
}
