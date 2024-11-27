import React, { useEffect, useState } from "react";
import { get, map } from "lodash";
import { httpClient } from "../../utils/setting";

const Home: React.FC = (): JSX.Element => {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    getBanner();
  }, []);
  const getBanner = async () => {
    const response = await httpClient.get("/api/QuanLyPhim/LayDanhSachBanner");
    if (response.data.statusCode !== 200) {
      setBanner([]);
      return;
    }
    setBanner(response.data.content);
    try {
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const renderBannerItem = () =>
    map(banner, (item) => (
      <div key={get(item, "maPhim", "")}>
        <p>Mã Phim{get(item, "maPhim", "")}</p>
        <img
          src={get(item, "hinhAnh", "")}
          alt="hinhAnh"
          width={500}
          height={200}
        />
      </div>
    ));

  return (
    <>
      Welcome to React server side rendering with express server
      {renderBannerItem()}
    </>
  );
};

export default Home;
