import { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    newItemLoading: false,
    offset: 210,
    max: false,
    activeCardId: null,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    if (this.state.offset > 1562) {
      this.setState({
        max: true,
      });
    }
    this.onRequest();
  }
  onCardSelected(id) {
    this.setState(({activeCardId}) => ({
      activeCardId: id
    }))
  }
  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.getAllCharacters);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
    }));
  };
  renderItems(arr) {
    const items = arr.map((item) => {
      let imgStyle = { objectFit: "cover" };
      let classes = "char__item";
      if(this.state.activeCardId === item.id) {
        classes += ' char__item_selected';
      }

      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          card={item}
          className={classes}
          key={item.id}
          onClick={() => {
            this.props.onCharSelected(item.id);
            this.onCardSelected(item.id);
          }}
        > 
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, offset, newItemLoading } = this.state;
    const items = this.renderItems(charList);
    let maxChar = this.state.max;
    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? items : null;

    return (
      <div className="char__list">
        {spinner}
        {content}
        <button
          disabled={newItemLoading}
          style={maxChar ? { display: "none" } : { display: "block" }}
          onClick={() => this.onRequest(offset)}
          className="button button__main button__long"
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propType = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
