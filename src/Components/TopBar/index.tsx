import React, { useEffect, useState, useCallback } from "react";
import { Search, Chat, Notifications } from "@material-ui/icons";
import { Container, TopbarIconBadge } from "./styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { io } from "socket.io-client";
import defaultProfilePic from "../../assets/images/default-profile-pic.png";

import { AsyncLogoutFn } from "../../Contexts/AuthContext/middlewares";

interface IinputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TopBar = ({ onChange }: IinputProps) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const { dispatch, userData } = useAuth();
  useEffect(() => {}, [userData]);

  useEffect(() => {
    // @ts-expect-error
    setSocket(io("http://localhost:3333"));
  }, []);

  useEffect(() => {
    if (socket) {
      // @ts-expect-error
      socket.on("getNotification", (data: any) => {
        // @ts-expect-error
        setNotifications((prev) => [...prev, data]);
      });
    }
    console.log(notifications);
  }, [socket]);

  useEffect(() => {
    if (socket) {
      // @ts-expect-error
      socket.emit("newUser", userData);
    }
  }, [socket, userData]);

  // useEffect(() => {
  //   socket?.emit("newUser", userData);
  // }, [socket, userData]);

  // useEffect(() => {
  //   socket?.on("getNotification", (data: any) => {
  //     setNotifications([...notifications, data]);
  //   });
  // }, [socket]);

  // console.log(notifications);
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

  const generateProfilePic = useCallback(() => {
    if (userData.avatar !== null || userData.avatar || "") {
      return userData.avatar.path;
    } else {
      return defaultProfilePic;
    }
  }, []);

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
          <input
            placeholder="Buscar por grupos"
            onChange={onChange}
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Chat
              style={{
                color: "#565f82",
              }}
            />
            <TopbarIconBadge className="topbarIconBadge">2</TopbarIconBadge>
            <div>grupos</div>
          </div>
          <div className="topbarIconItem">
            <Notifications
              style={{
                color: "#565f82",
              }}
            />
            <div>notificações</div>
            <TopbarIconBadge className="topbarIconBadge" isRingBell>
              1
            </TopbarIconBadge>
          </div>
        </div>
        <img
          src={generateProfilePic()}
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
