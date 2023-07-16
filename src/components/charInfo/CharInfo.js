import { Component } from "react";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import "./charInfo.scss";
import MarvelService from "../../services/MarvelService";
import PropTypes from 'prop-types';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.onCharLoading();

    this.marvelService.getCharacter(charId).then(this.onCharLoaded);
  };
  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };
  render() {
    const { char, loading } = this.state;
    const skeleton = char || loading ? null : <Skeleton />;
    const spinner = loading ? <Spinner></Spinner> : null;
    const content = !(loading || !char) ? <View char={char}></View> : null;
    return (
      <div className="char__info">
        {skeleton}
        {spinner}
        {content}
      </div>
    );
  }
}
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics, comicsData } =
    char;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle["objectFit"] = "contain";
  }
  const comicsList = comics.map((item, index) => {
    if (index > 9) {
      return '';
    }
    return (
      <li key={index} className="char__comics-item">
        {item.name}
      </li>
    );
  });
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} style={imgStyle} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comicsList.length ? comicsList : 'This hero do not have any comics'}
      </ul>
    </>
  );
};

CharInfo.propType = {
  charId: PropTypes.number.isRequired
}

export default CharInfo;
