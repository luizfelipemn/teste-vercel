// showYouTubeTrailer.js

import React from 'react';

function getYouTubeVideoId(link) {
  // Função para extrair o ID do vídeo do YouTube a partir do link
  const regex = /(?:https?:\/\/(?:www\.)?)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|user\/(?:[\w#]+\/)+))([\w\-]{10,12})/i;
  const match = link.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

function ShowYouTubeTrailer({ trailerLink }) {
  const videoId = getYouTubeVideoId(trailerLink);
  if (!videoId) {
    return null;
  }

  return (
    <div>
      <iframe
        width="90%"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default ShowYouTubeTrailer;
