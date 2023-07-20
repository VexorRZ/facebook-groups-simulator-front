/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styled from "styled-components";

interface ITopbarIconBadgeProps {
  isRingBell?: boolean;
}

export const Container = styled.div`
  height: 64px;
  width: 100%;
  background-color: #1877f2;
  display: flex;
  align-items: center;
  top: 0;
  z-index: 999;
  border-radius: 6px;

  .topbarLeft {
    flex: 3;

    .logo {
      font-size: 24px;
      margin-left: 20px;
      font-weight: bold;
      color: white;
      cursor: pointer;
    }
  }

  .topbarCenter {
    flex: 4;

    .searchbar {
      width: 100%;
      height: 30px;
      background-color: white;
      border-radius: 6px;
      display: flex;
      align-items: center;

      .searchIcon {
        font-size: 20px !important;
        margin-left: 10px;
      }
      .searchInput {
        border: none;
        width: 70%;
      }
      .searchInput:focus {
        outline: none;
      }
    }
  }

  .topbarRight {
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;

    .topbarLink {
      margin-right: 10px;
      font-size: 14px;
      cursor: pointer;
    }

    .topbarIcons {
      display: flex;

      .topbarIconItem {
        margin-right: 17px;
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    .topbarImg {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
    }
  }
`;

export const TopbarIconBadge = styled.span<ITopbarIconBadgeProps>`
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -5px;
  right: ${(props) => (props.isRingBell ? "24px" : "5px")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;
