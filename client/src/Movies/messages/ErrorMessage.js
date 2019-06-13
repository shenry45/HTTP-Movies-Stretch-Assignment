import React from 'react';

export default function ErrorMessage(props) {
  return (
    <div className="">
      <p>{props.error}</p>
    </div>
  )
}