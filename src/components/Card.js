import React from "react";

const Card = ({ title, body }) => {
  return (
    <div className="card">
      <div className="card-title bold">{title}</div>
      <div className="card-body">
        <div className="row">
          <div className="bold">Symbol:</div>
          <div>{body.symbol}</div>
        </div>
        <div className="row">
          <div className="bold">Date:</div>
          <div>{body.date}</div>
        </div>
        <div className="row">
          <div className="bold">Open:</div>
          <div>{body.open}</div>
        </div>
        <div className="row">
          <div className="bold">Price:</div>
          <div>{body.price}</div>
        </div>
        <div className="row">
          <div className="bold">Low:</div>
          <div>{body.low}</div>
        </div>
        <div className="row">
          <div className="bold">High:</div>
          <div>{body.high}</div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Card);
