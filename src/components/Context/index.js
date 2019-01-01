import React, { Component } from 'react';
import axios from 'axios';

const GalleryContext = React.createContext();

export class Provider extends Component {
  state = { 
    images: [],
    tags: [],
    classes: {
      bgColor: 'bg-color-1',
      fontColor: 'font-color-1',
      borderColor: 'border-color-1',
      btnColor: 'btn-color-1'
    },
    showImages: false
  }

  componentDidMount() {
    this.getRandomWords();
  }

  getRandomWords = async() => {
    const wordnikApiKey = process.env.REACT_APP_WORDNIK_APIKEY;
    const response = await axios.get(`https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=5000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=-1&limit=10&api_key=${wordnikApiKey}`);
    if(response.status === 200) {
      const { data } = response;
      this.setState({ tags: data })
    } else {
      return;
    }
  }

  getImages = async(tag) => {
    const apiKey = process.env.REACT_APP_FLICKR_APIKEY;
    const { data } = await axios(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=12&format=json&nojsoncallback=1`);
    const images = data.photos.photo.slice(0, 10);
    this.setState({ images, showImages: true });
  }

  returnToTags = () => {
    this.setState({ showImages: false });
  }

  getNewTags = () => {
    this.getRandomWords();
  }

  changeColorClasses = num => {
    this.setState({ 
      classes: {
        bgColor: `bg-color-${num}`,
        fontColor: `font-color-${num}`,
        borderColor: `border-color-${num}`,
        btnColor: `btn-color-${num}`
      }, 
    });
  }

  performSearch = input => {
    this.getImages(input);
  }

  render() { 
    return ( 
      <GalleryContext.Provider value={{
        images: this.state.images,
        tags: this.state.tags,
        classes: this.state.classes,
        showImages: this.state.showImages,
        actions: {
          performSearch: this.performSearch,
          getImages: this.getImages,
          returnToTags: this.returnToTags,
          getNewTags: this.getNewTags,
          changeColorClasses: this.changeColorClasses
        }
      }}>
      { this.props.children }
      </GalleryContext.Provider>
     );
  }
}

export const Consumer = GalleryContext.Consumer;