// Write your code here
import './index.css'
import {Component} from 'react'

class SimilarProductItem extends Component {
  render() {
    const {item} = this.props
    console.log(item)
    return (
      <li className="similarItem">
        <img
          src={item.image_url}
          alt={`similar product ${item.title}`}
          className="similarImage"
        />
        <h1 className="styleheadingsim">{item.title}</h1>
        <p className="reviews">{item.brand}</p>
        <div className="rates">
          <p className="price">Rs {item.price}/- </p>
          <button type="button" className="logout-desktop-btn sim">
            {item.rating}
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </button>
        </div>
      </li>
    )
  }
}
export default SimilarProductItem
