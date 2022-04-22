import React from 'react';

const ImageLink = ({link}) => {
  return (
    <img alt="flashcard content" className="quizimg" src={link} />
  )
}

export default ImageLink;