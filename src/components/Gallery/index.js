import React from 'react';
import { Consumer } from '../Context';
import GalleryItem from './galleryItem';


const Gallery = () => {

  return (
    <Consumer>
      {({ images }) => {
        return (
          <div >
            <ul className="photo-container">
              {images.map(image => 
                <GalleryItem 
                  key={image.id} 
                  image={image} 
                /> 
              )}
            </ul>
          </div>
        );
      }}
    </Consumer>
   );
}
 
export default Gallery;