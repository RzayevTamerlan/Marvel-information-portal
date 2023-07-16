import { Component } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";
import Spinner from "./../spinner/Spinner";

class RandomChar extends Component {

  state = {
    char: {},
    loading: true,
  };

  marvelService = new MarvelService();

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({
      loading:true
    })
  }
  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharLoading()
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch((res) => {
        this.updateChar();
      });
  };
  componentDidMount() {
    this.updateChar();
  }
  render() {
    const { char, loading } = this.state;
    return (
      <div className="randomchar">
        {loading ? <Spinner></Spinner> : <View char={char}></View>}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button onClick={this.updateChar} className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  let imgStyle = {'objectFit' : 'cover'}
  if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle['objectFit'] = 'contain'
  }
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;