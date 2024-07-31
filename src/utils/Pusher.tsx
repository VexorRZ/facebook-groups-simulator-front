import React, { useEffect } from "react";
require("dotenv").config();
import Pusher from "pusher-js";
function PusherFunction() {
  //This will be called when your component is mounted
  useEffect(() => {
    //@ts-ignore
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: "mt1",
    });
    const channel1 = pusher.subscribe("channel_name1");
    // You can bind more channels here like this
    // const channel2 = pusher.subscribe('channel_name2')
    channel1.bind("private_channel_id", function (data: any) {
      console.log(data);
      // Code that runs when channel1 listens to a new message
    });

    return () => {
      pusher.unsubscribe("channel_name1");
      // pusher.unsubscribe('channel_name2')
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // [] would ensure that useEffect is executed only once

  return <div>{/* Render Code here */}</div>;
}
