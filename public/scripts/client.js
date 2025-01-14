$(document).ready(() => {
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      let insertTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(insertTweet);
    }
  };

  const createTweetElement = function (tweet) {
    const escape = function (str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $tweet = `
<article class="tweet">
<header class="tweet-header">
  <div class="user-name">
    <img src="${tweet.user.avatars}" />
    <span class="name">${tweet.user.name}</span>
  </div>
  <span class="user-id">${tweet.user.handle}</span>
</header>
<p class="post-content">
  ${escape(tweet.content.text)}
</p>
<div class="divider"></div>
<footer class="tweet-footer">
  <span class="post-date timeago">${timeago.format(tweet.created_at)}</span>
  <div class="icons">
    <i class="fa fa-flag"></i>
    <i class="fa fa-retweet"></i>
    <i class="fa fa-heart"></i>
  </div>
</footer>
</article>
`;

    return $tweet;
  };

  const loadTweets = function () {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (error) {
        console.log('Error:', error);
      },
    });
  };

  loadTweets();

  const loadNewTweets = function () {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      dataType: 'json',
      success: function (tweets) {
        const latestTweet = tweets[tweets.length - 1];
        let insertTweet = createTweetElement(latestTweet);
        $('#tweets-container').prepend(insertTweet);
      },
      error: function (error) {
        console.log('Error:', error);
      },
    });
  };

  // Listen to Form submit event
  const $newTweetForm = $('form');
  const $alert = $('.alert');
  $newTweetForm.on('submit', function (event) {
    event.preventDefault();
    // Form Validation
    const tweetText = $(this).find('textarea[name="text"]').val();
    if (!tweetText || tweetText.trim().length === 0) {
      $alert.text('⚠️ Tweet cannot be empty!').slideDown();
    } else if (tweetText.length > 140) {
      $alert.text('⚠️ Tweet cannot exceed 140 characters!').slideDown();
    } else {
      $alert.slideUp();
      let message = $(this).serialize();
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: message,
        success: function (response) {
          console.log('Success:', response);
          loadNewTweets();
          $newTweetForm.trigger('reset');
        },
        error: function (error) {
          console.log('Error:', error);
        },
      });
    }
  });
});
