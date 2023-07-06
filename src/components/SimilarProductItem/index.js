// Write your code here
import './index.css'
import {Component} from 'react'

class SimilarProductItem extends Component {
  render() {
    const {item} = this.props
    console.log(item)
    return (
      <div>
        <h1>SimilarProducts</h1>
      </div>
    )
  }
}
export default SimilarProductItem
