import React from "react";
import facebook from "../assets/facebook.svg";
import aws from "../assets/aws.svg";
import twitter from "../assets/twitter.svg";
import apple from "../assets/apple.svg";
import google from "../assets/google.svg";

const Card = ({ title, body, show }) => {
  const getIcon = iconName => {
    let icon;
    console.log(iconName);
    if (iconName === "Facebook") {
      icon = facebook;
    }
    if (iconName === "Google") {
      icon = google;
    }
    if (iconName === "Apple") {
      icon = apple;
    }
    if (iconName === "Twitter") {
      icon = twitter;
    }
    if (iconName === "Amazon") {
      icon = aws;
    }

    return icon;
  };

  let icon = getIcon(title);
  console.log(icon);
  
  return (
    <div className="card">
      <div className="card-title bold">{title}</div>
      <img src={icon}  alt="" />
      <div className="card-body">
        <div className="row">
          <div className="bold">Symbol:</div>
          <div>{body.symbol}</div>
        </div>
        <div className="row">
          <div className="bold">Price:</div>
          <div className="bold">{body.price}</div>
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
