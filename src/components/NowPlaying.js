import React from "react";

function NowPlaying({ swiper }) {
  return (
    <div>
      <section className="now-playing">
        <h2>Now Playing</h2>
        <div className="swiper">
          <div className="swiper-wrapper">{swiper}</div>
        </div>
      </section>
    </div>
  );
}

export default NowPlaying;
