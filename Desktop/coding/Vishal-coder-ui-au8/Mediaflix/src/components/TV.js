import React from "react";
import RowTv from "./RowTv";
import request from "./request";
import TvBanner from "../components/TvBanner";

function TV() {
  return (
    <div>
      <TvBanner />
      <RowTv title="Popular Shows" fetchUrl={request.fetchPopular} />
      <RowTv title="On Air" fetchUrl={request.fetchOnAir} />
      <RowTv title="Adventurous Shows" fetchUrl={request.fetchAdventure} />
      <RowTv title="Mysterious Shows" fetchUrl={request.fetchMysterious} />
      <RowTv title="Airing Today" fetchUrl={request.fetchAiring} />
      <RowTv title="Fantasy Shows" fetchUrl={request.fetchFantasy} />
      <RowTv title="Reality Shows" fetchUrl={request.fetchReality} />
      <RowTv title="Animation Shows" fetchUrl={request.fetchAnimation} />
    </div>
  );
}

export default TV;
