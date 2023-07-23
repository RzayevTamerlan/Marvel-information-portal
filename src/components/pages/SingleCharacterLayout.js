
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";

import "./singleCharacterLayout.scss";
import Spinner from "../spinner/Spinner";
const SingleCharacterLayout = () => {
  const { Id } = useParams();
  const [char, setChar] = useState(null);
  const { loading, getCharacterByName, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [Id]);
  const updateChar = () => {
    clearError();
    getCharacterByName(Id).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char[0]);
  };
  console.log(char)
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || !char) ? <View char={char}></View> : null;
  return(
    <>
      {spinner}
      {content}
    </>
  )
};

const View = ({char}) => {
  const { name, description, thumbnail } = char;
  return (
    <div className="single-char">
      <img src={thumbnail} alt={name} className="single-char__char-img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr">{description}</p>
      </div>
    </div>
  );
}

export default SingleCharacterLayout;
