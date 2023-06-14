export function setupVoting(callback) {
  const eyes = document.querySelectorAll('.eye');
  let currentVote = 0;

  function highlightEyes(vote) {
    for (let i = 0; i < eyes.length; i++) {
      if (i < vote) {
        eyes[i].classList.add('highlight');
      } else {
        eyes[i].classList.remove('highlight');
      }
    }
  }

  function handleVote(vote) {
    currentVote = vote;
    highlightEyes(currentVote);
    callback(currentVote); // Chama a função de callback com o voto selecionado
  }

  eyes.forEach((eye) => {
    const vote = parseInt(eye.dataset.value);

    eye.addEventListener('mouseover', function () {
      highlightEyes(vote);
    });

    eye.addEventListener('mouseleave', function () {
      highlightEyes(currentVote);
    });

    eye.addEventListener('click', function () {
      handleVote(vote);
    });
  });
}
