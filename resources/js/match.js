const Match = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function () {
  const $game = $('#game');
  const values = Match.generateCards();
  Match.renderCards(values, $game);
});

/*
  Generates and returns an array of matching card values.
 */

Match.generateCards = function () {
  const cardSequence = [];

  for (let value = 1; value <= 8; value++) {
    cardSequence.push(value);
    cardSequence.push(value);
  } // [1, 1, 2, 2, ...]

  const cardValues = [];

  while (cardSequence.length > 0) {
    let randomIndex = Math.floor(Math.random() * cardSequence.length);
    let randomValue = cardSequence.splice(randomIndex, 1)[0];
    cardValues.push(randomValue);
  }

  return cardValues;

};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

Match.renderCards = function (cardValues, $game) {
  const colors = [
    'hsl(50, 85%, 65%)',
    'hsl(100, 85%, 65%)',
    'hsl(150, 5%, 5%)',
    'hsl(200, 85%, 65%)',
    'hsl(250, 85%, 65%)',
    'hsl(300, 85%, 65%)',
    'hsl(350, 85%, 65%)',
    'hsl(400, 85%, 65%)',
  ];

  $game.empty();
  $game.data('flippedCards', []);

  for (let valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
    let $cardElement = $('<div class="card"></div>');
    let value = cardValues[valueIndex];
    let color = colors[value - 1];
    const data = {
      value: value,
      isFlipped: false,
      color: color,
    };
    $cardElement.data(data);

    $game.append($cardElement);
  }
  $('.card').click(function () {
    Match.flipCard($(this), $('#game'));
  })

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

Match.flipCard = function ($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }
  $card.css('background-color', $card.data('color'))
    .text($card.data('value'))
    .data('isFlipped', true);

  let flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  let firstCard = flippedCards[0];
  let secondCard = flippedCards[1];

  if (flippedCards.length === 2) {
    if (firstCard.data('value') === secondCard.data('value')) {
      const matchCSS = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)',
      }

      firstCard.css(matchCSS);
      secondCard.css(matchCSS);
    } else {

      window.setTimeout(function () {
        firstCard.css('background-color', 'rgb(73, 162, 112)')
          .text('')
          .data('isFlipped', false);
        secondCard.css('background-color', 'rgb(73, 162, 112)')
          .text('')
          .data('isFlipped', false);
      }, 500)

    }

    $game.data('flippedCards', []);
  }

};