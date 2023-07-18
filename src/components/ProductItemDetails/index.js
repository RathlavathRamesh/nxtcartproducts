// Write your code here
import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
// import {AiTwotoneStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

class ProductItemDetails extends Component {
  state = {
    itemData: {},
    isLoading: false,
    dataready: false,
    apiFail: false,
    sameProducts: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      isLoading: true,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formatted = {
        availability: data.availability,
        id: data.id,
        brand: data.brand,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        samilarProducts: data.similar_products,
        style: data.style,
        totalReviews: data.total_reviews,
        description: data.description,
      }
      this.setState({
        itemData: formatted,
        isLoading: false,
        dataready: true,
        sameProducts: formatted.samilarProducts,
      })
    } else {
      this.setState({isLoading: false, apiFail: true})
    }
  }

  render() {
    const {isLoading, itemData, sameProducts, dataready, apiFail} = this.state
    console.log(sameProducts)
    return (
      <>
        <Header />
        {isLoading && (
          <div className="primedeals-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )}
        {dataready && (
          <>
            <div className="itemDetails">
              <img
                src={itemData.imageUrl}
                alt={itemData.title}
                className="itemImage"
              />
              <div>
                <h1 className="styleheading">{itemData.title}</h1>
                <p className="price">Rs {itemData.price}/- </p>
                <div className="revcard">
                  <button type="button" className="logout-desktop-btn extra">
                    {itemData.rating}
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </button>
                  <p className="reviews">{itemData.totalReviews} Reviews</p>
                </div>
                <p className="reviews">{itemData.description}</p>
                <p className="avalible">
                  Available : <span> {itemData.availability}</span>
                </p>
                <p className="avalible">
                  Brand :<span> {itemData.brand}</span>
                </p>
                <hr className="line" />
                <div className="buts">
                  <button className="minus" data-testid="minus" type="button">
                    -
                  </button>
                  <p className="reviews">1</p>
                  <button className="minus" data-testid="plus" type="button">
                    +
                  </button>
                </div>
                <button className="logout-desktop-btn extra" type="button">
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}
        {dataready && (
          <>
            <h1>SimilarProducts</h1>
            <ul className="similarItems">
              {sameProducts.map(each => (
                <SimilarProductItem item={each} key={each.id} />
              ))}
            </ul>
          </>
        )}
        {apiFail && (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
              alt="failure view"
              className="register-prime-image"
            />
            <h1 className="styleheading">Product Not Found</h1>
            <Link to="/products">
              <button type="button" className="logout-desktop-btn extra">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </>
    )
  }
}
export default ProductItemDetails
