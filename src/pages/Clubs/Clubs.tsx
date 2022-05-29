import { mainModule } from "process";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getClubData from "../../api/getClubData";
import ClubDataType from "../../types/clubDataType";
import useDate from "../../utils/useDate";

export default function Clubs() {
  const [detailClubData, setDetailClubData] = useState<ClubDataType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const { clubId } = useParams();
  const startAt =
    detailClubData &&
    detailClubData.club.meetings.map((item) => {
      const startedAt = useDate(item.startedAt);
      return { ...item, startedAt: startedAt };
    });
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
        <main>
          <div>
            <h2>{detailClubData.club.name}</h2>
            <p>{detailClubData.club.description}</p>
            {detailClubData.leaders[0].name !== "" && (
              <p>리더: {detailClubData.leaders[0].name}</p>
            )}
            {detailClubData.partners[0].name !== "" && (
              <p>파트너: {detailClubData.partners[0].name}</p>
            )}
            <p>가격: {detailClubData.price.toLocaleString("ko-KR")}원</p>
          </div>
          <h3>상세설명</h3>
          <p>모임장소: {detailClubData.club.place}</p>
          {startAt!.map((item) => (
            <p key={item.order}>
              {item.order}회차 {item.startedAt}
            </p>
          ))}
        </main>
      )}
    </>
  );
}
