import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import ClubDataType from "../../../types/clubDataType";
import useDate from "../../../utils/useDate";

type ClubListType = {
  clubData: ClubDataType;
};

export default function ClubList({ clubData }: ClubListType) {
  const { name, description, coverUrl, id } = clubData.club;
  const place =
    clubData.club.place === "강남" || clubData.club.place === "안국"
      ? clubData.club.place + " 아지트"
      : clubData.club.place;
  const date = useDate(clubData.club.meetings[0].startedAt);

  return (
    <StyledClubListContainer>
      <Link to={`/clubs/${id}`}>
        <div className="clubListWrapper">
          <div>
            <img src={coverUrl} alt={name} loading="lazy" />
          </div>
          <div className="clubTitleWrapper">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div className="clubPlaceWrapper">
            <span className="clubPlace">{place}</span>
            <span>|</span>
            <span className="clubTime">첫 모임일 {date}</span>
          </div>
        </div>
      </Link>
    </StyledClubListContainer>
  );
}

const StyledClubListContainer = styled.li`
  height: 500px;
  a {
    width: 100%;
    height: 100%;
  }
  .clubImgWrapper {
    width: 100%;
    height: 210px;
  }
  img {
    width: 100%;
    height: 210px;
    border-radius: 4px 4px 0 0;
  }
  .clubListWrapper {
    border: 1px solid rgb(236, 236, 233);
    border-top: none;
    border-radius: 4px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .clubTitleWrapper {
    flex-grow: 1;
    border-bottom: 1px solid rgb(236, 236, 233);
    padding: 10px 20px;
    p {
      padding-top: 5px;
      color: ${({ theme }) => theme.color.grey};
      font-size: 14px;
    }
  }
  .clubPlaceWrapper {
    padding: 10px 20px;
    color: ${({ theme }) => theme.color.grey};
    font-size: 11px;
    .clubPlace {
      padding-right: 6px;
    }
    .clubTime {
      padding-left: 6px;
    }
  }
`;
