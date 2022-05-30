import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import getClubData from "../../api/getClubData";
import ClubDataType from "../../types/clubDataType";
import useDate from "../../utils/useDate";

export default function Detail() {
  const [detailClubData, setDetailClubData] = useState<ClubDataType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const { clubId } = useParams();

  const onHandleClubData = async () => {
    const clubData: ClubDataType[] = await getClubData();
    for (let i = 0; i < clubData.length; i++) {
      if (clubData[i].club.id === clubId) {
        setDetailClubData(clubData[i]);
        break;
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    onHandleClubData();
  }, []);
  return (
    <>
      {!isLoading && detailClubData && (
        <StyledDetailContainer>
          <StyledDetailClubInfoContainer>
            <div>
              <div className="detailClubTitleWrapper">
                <h2>{detailClubData.club.name}</h2>
                <p className="detailClubDescription">
                  {detailClubData.club.description}
                </p>
              </div>
              <div>
                <h3>상세설명</h3>
                {detailClubData.leaders[0].name !== "" && (
                  <p>리더: {detailClubData.leaders[0].name}</p>
                )}
                {detailClubData.partners[0].name !== "" && (
                  <p>파트너: {detailClubData.partners[0].name}</p>
                )}
                <p>가격: {detailClubData.price.toLocaleString("ko-KR")}원</p>
                <p>모임장소: {detailClubData.club.place}</p>
                {detailClubData.club.meetings.map((item) => (
                  <DetailMeeting
                    startedAt={item.startedAt}
                    order={item.order}
                  />
                ))}
              </div>
            </div>
          </StyledDetailClubInfoContainer>
          <StyledDetailClubContainer>
            <div className="clubListWrapper">
              <div>
                <img
                  src={detailClubData.club.coverUrl}
                  alt={detailClubData.club.name}
                />
              </div>
              <div className="clubTitleWrapper">
                <h2>{detailClubData.club.name}</h2>
                <p>{detailClubData.club.description}</p>
                <p>가격:{detailClubData.price.toLocaleString()}원</p>
              </div>
              <div className="clubPlaceWrapper">
                <p className="clubPlace">{detailClubData.club.place} |</p>
                {
                  <DetailMeeting
                    startedAt={detailClubData.club.meetings[0].startedAt}
                    order={detailClubData.club.meetings[0].order}
                  />
                }
              </div>
            </div>
          </StyledDetailClubContainer>
        </StyledDetailContainer>
      )}
    </>
  );
}

function DetailMeeting({
  startedAt,
  order,
}: {
  startedAt: string;
  order: number;
}) {
  const convertStartedAt = useDate(startedAt);

  return (
    <p>
      {order}회차 {convertStartedAt}
    </p>
  );
}

const StyledDetailClubInfoContainer = styled.section`
  padding: 36px;
  .detailClubDescription {
    padding: 10px 0;
  }
`;

const StyledDetailContainer = styled.main`
  display: flex;
  width: ${({ theme }) => theme.size.xLarge};
  margin: 0 auto;
  padding: 36px 0;
`;

const StyledDetailClubContainer = styled.section`
  flex: 0 0 45%;
  padding: 36px;
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
    padding: 10px 20px;
    p {
      padding-top: 5px;
      color: ${({ theme }) => theme.color.grey};
      font-size: 16px;
    }
  }
  .clubPlaceWrapper {
    padding: 10px 20px;
    display: flex;
    color: ${({ theme }) => theme.color.grey};
    font-size: 14px;
    .clubPlace {
      padding-right: 6px;
    }
    .clubTime {
      padding-left: 6px;
    }
  }
`;
