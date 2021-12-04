import "./Blurb.scss";

const Blurb = () => {
  return (
    <div className="ae-blurb">
      <div className="ae-blurb__box">
        Made by <a href="https://github.com/teetow">Teetow</a> <br />
        for <a href="https://adventofcode.com/">Advent of Code 2021</a>
      </div>
      <div className="ae-blurb__box">
        <a href="https://github.com/teetow/aoc-env/">GitHub</a>
      </div>
      <div className="ae-blurb__box">
        <a href="https://soundcloud.com/teetow">{`My SoundCloud =)`}</a>
      </div>
    </div>
  );
};

export default Blurb;
