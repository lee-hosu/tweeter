$(document).ready(() => {
  const data = [
    {
      user: {
        name: 'Newton',
        avatars: 'https://i.imgur.com/73hZDYK.png',
        handle: '@SirIsaac',
      },
      content: {
        text: 'If I have seen further it is by standing on the shoulders of giants',
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: 'Descartes',
        avatars: 'https://i.imgur.com/nlhLi3I.png',
        handle: '@rd',
      },
      content: {
        text: 'Je pense , donc je suis',
      },
      created_at: 1461113959088,
    },
  ];

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
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
  <span class="post-date">${tweet.created_at}</span>
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

  renderTweets(data);

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
      },
      error: function (error) {
        console.log('Error:', error);
      },
    });
  });
});
