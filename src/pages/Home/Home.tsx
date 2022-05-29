import React, { useEffect, useState } from "react";
import getClubData from "../../api/getClubData";
import Search from "./Search/Search";

function Home() {
  const [clubData, setClubData] = useState([]);
  const onHandleClubData = async () => {
    const clubData = await getClubData();
    setClubData(clubData);
  };

  useEffect(() => {
    onHandleClubData();
  }, []);

  return (
    <main>
      <Search />
      <section>
        <h2>나만의 클럽찾기</h2>
        <ul>
          <li></li>
        </ul>
      </section>
    </main>
  );
}

export default Home;
