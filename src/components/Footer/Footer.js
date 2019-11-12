import React from 'react'
import './Footer.scss'
import icons from '../../services/icon-service'
import Dropdown from 'react-dropdown'
const FacebookIcon = icons['fa-facebook-square']
const TwitterIcon = icons['fa-twitter']
const GithubIcon = icons['fa-github']
const RedditIcon = icons['fa-reddit']

class Footer extends React.Component {
  render () {
    const options = ['English', 'French', 'German', 'Italian']
    return (
      <footer id='footer' className='footer'>
        <div className='footer-left'>
          <div className='footer-left-links'>
            <span>Blog</span>
            <span>Website</span>
            <span>FAQ</span>
            <span>Privacy Policy</span>
            <span>Terms And Conditions</span>
            <span>Code of Ethics</span>
          </div>
          <div className='footer-left-icons'>
            <div className='footer-left-icons-icon'>
              <TwitterIcon  size="20px"/>
            </div>
            <div className='footer-left-icons-icon'>
              <GithubIcon size="20px" />
            </div>
            <div className='footer-left-icons-icon'>
              <RedditIcon size="20px" />
            </div>
            <div className='footer-left-icons-icon'>
              <FacebookIcon size="20px"/>
            </div>
          </div>
        </div>
        <div className='footer-right'>
          <span className='footer-right-text'>
            © 2019 Decentraland.<span className="all-rights-reserved">All rights reserved.</span>
          </span>
          <Dropdown
                  options={options}
                  onChange={this._onSelect}
                  // value={defaultOption}
                  className="footer-dropdown"
                  placeholder="Cheapest"
                />
        </div>
      </footer>
    )
  }
}
export default Footer
