import React, { useEffect, useState } from "react";
import { Search, Chat, Notifications } from "@material-ui/icons";
import { Container, TopbarIconBadge } from "./styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { io } from "socket.io-client";

import { AsyncLogoutFn } from "../../Contexts/AuthContext/middlewares";
import { NavBar } from "../../Pages/Group/styles";

const TopBar = () => {
  // const [socket, setSocket] = useState<any>(null);
  const [notifications, setNotifications] = useState<any>([]);
  const [user, setUser] = useState({});

  const { dispatch, userData } = useAuth();

  // useEffect(() => {
  //   setSocket(io("http://localhost:3333", { transports: ["websocket"] }));

  //   setUser(userData);
  // }, []);

  // useEffect(() => {
  //   socket?.emit("newUser", userData);
  // }, [socket, userData]);

  // useEffect(() => {
  //   socket?.on("getNotification", (data: any) => {
  //     setNotifications([...notifications, data]);
  //   });
  // }, [socket]);

  //console.log(notifications);
  // useEffect(() => {
  //   if (socket) {
  //     socket?.emit("newUser", user);
  //   }
  // }, [socket, user]);

  const navigate = useNavigate();

  const Logout = () => {
    AsyncLogoutFn(dispatch);
    navigate("/");
  };

  const openProfilePage = () => {
    navigate("/profile");
  };

  const openDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Container>
      <div className="topbarLeft">
        <span className="logo" onClick={openDashboard}>
          Onyx
        </span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Buscar por grupos" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Chat />
            <TopbarIconBadge className="topbarIconBadge">2</TopbarIconBadge>
            <div>grupos</div>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <div>notificações</div>
            <TopbarIconBadge className="topbarIconBadge" isRingBell>
              1
            </TopbarIconBadge>
          </div>
        </div>
        <img
          src={userData?.avatar.path as string}
          alt="avatar"
          className="topbarImg"
          onClick={openProfilePage}
        />
        <h4 onClick={Logout} className="logout">
          sair
        </h4>
      </div>
    </Container>
  );
};

export default TopBar;
