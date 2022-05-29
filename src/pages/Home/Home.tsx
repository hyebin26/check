import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import getClubData from "../../api/getClubData";
import ClubDataType from "../../types/clubDataType";
import Search from "./Search/Search";
import ClubList from "./ClubList/ClubList";
import ClubContent from "./ClubContent/ClubContent";

function Home() {
  return (
    <main>
      <Search />
      <ClubContent />
    </main>
  );
}

export default Home;
