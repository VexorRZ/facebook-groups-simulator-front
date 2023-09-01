import React from "react";
import { Search, Chat, Notifications } from "@material-ui/icons";
import { Container, TopbarIconBadge } from "./styles";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/fibonacci.jpg";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const Logout = () => {
    navigate("/");
    localStorage.removeItem("@name:user");
    localStorage.removeItem("@token");
  };
  return (
    <Container>
      <div className="topbarLeft">
        <span className="logo">Onyx</span>
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
        <img src={image} alt="" className="topbarImg" />
        <h4 onClick={Logout} className="logout">
          sair
        </h4>
      </div>
    </Container>
  );
};

export default TopBar;
