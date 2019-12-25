(function Circlle($) {
  $('.round').circleProgress({ fill: { color: '#3EC1D5' } })
    .on('circle-animation-progress', (event, progress, stepValue) => {
      $(this).find('strong').text(`${String(stepValue.toFixed(2)).substr(2)}%`);
    });
}(jQuery));
