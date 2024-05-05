import React from 'react';

function Message({ data }) {
  let parsedData;
  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    return <div className="message-box">Error in message data.</div>;
  }

  // Check if there is an image in the message and set it up for rendering
  const imageUrl = parsedData.image;
  
  return (
    <div className="message-box">
      <div className="message-header">{parsedData.body} - Source: {parsedData.source} ({parsedData.sourceName || ''}) | Coin: {parsedData.coin}</div>
      <h3>{parsedData.title}</h3>
      <p className="message-content">{parsedData.description }</p>
      <a href={parsedData.url} target="_blank" rel="noopener noreferrer">source</a>
      <div>Created At: {new Date(parsedData.createdAt).toLocaleString()}</div>
      {imageUrl && <img src={imageUrl} alt="Attached" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      <img src={parsedData.icon} alt="Profile Icon" style={{ height: '50px', borderRadius: '50%' }} />
      <div>Posted by: {parsedData.name} (@{parsedData.username})</div>
    </div>
  );
}

export default Message;