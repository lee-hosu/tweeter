$(document).ready(() => {
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      let insertTweet = createTweetElement(tweet);
      $('#tweets-container').append(insertTweet);
    }
  };

  const createTweetElement = function (tweet) {
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
  ${tweet.content.text}
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

  // Listen to Form submit event
  const $newTweetForm = $('form');
  $newTweetForm.on('submit', function (event) {
    event.preventDefault();
    let message = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: message,
      success: function (response) {
        console.log('Success:', response);
        loadTweets();
      },
      error: function (error) {
        console.log('Error:', error);
      },
    });
  });
});
