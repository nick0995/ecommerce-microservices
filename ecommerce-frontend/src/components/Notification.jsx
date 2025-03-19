import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications, addNotification } from "../redux/notificationSlice";
import io from "socket.io-client";
import axios from "axios";

export default function Notification({ userId }) {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    axios.get(`/api/notifications/${userId}`)
      .then(res => dispatch(setNotifications(res.data)))
      .catch(err => console.error("Error fetching notifications:", err));

    const newSocket = io("http://localhost:5004");
    newSocket.emit("subscribe", userId);
    newSocket.on("newNotification", (notification) => {
      dispatch(addNotification(notification));
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [dispatch, userId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Notifications</h2>
      {notifications.map((n, index) => (
        <p key={index} className="border-b py-2">{n.message}</p>
      ))}
    </div>
  );
}
