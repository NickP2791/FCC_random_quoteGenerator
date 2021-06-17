import React, {useState, useEffect} from 'react'
import {colorpalette} from './colorpalette'
import './App.css';

function App() {
  
  const [quoteArr, setQuoteArr] = useState(null)
  const [displayed, setDisplayed] = useState({quote: 'loading...', author: 'anonymus'})
  const [color, setColor] = useState('#555b6e')
   
  useEffect(() => {
    getQuotes()
  }, [])

  const getQuotes = async() => {
    const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    const data = await response.json()
    setQuoteArr(data.quotes)
    setDisplayed(data.quotes[0])
    }
  
  const genQuote = () => {
    const quoteArrlength = quoteArr.length
    const randomNum = Math.floor(Math.random()*quoteArrlength)
    setDisplayed(() =>quoteArr[randomNum])
    genColor()
    document.getElementsByTagName('body')[0].style.backgroundColor = color
  };

  const genColor = () => {
    const colorArrlength = colorpalette.length
    const randomNum = Math.floor(Math.random()*colorArrlength)
    setColor(() =>colorpalette[randomNum])
    
    };


  return (
    <div className="App flexbox-container">
      <div className='container'>
        <div id='quote-box'>
        <h1 id='text' >{displayed.quote}</h1>
        <h3 id='author'>- {displayed.author}</h3>
        <div className ='bottom-row'>
          <div id='social-buttons'>
              <div className='tweet-button'> 
                <a class="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_top"
              href='"twitter.com/intent/tweet"'>
              <i style={{color:color}} class="fab fa-twitter-square fa-3x"></i>
              </a>
              <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>

            <div className='tumblr-button'>
              <a class="button"
              id="tumblr-quote"
              title="Tumbler this quote!"
              target="_top"
              href='"twitter.com/intent/tweet"'>
              <i style={{color:color}} class="fab fa-tumblr-square fa-3x"></i>
              </a>
              <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </div>
          </div>
                    
          <button style={{backgroundColor:color}} id="new-quote" onClick={genQuote}>New Quote</button>
        </div> 
        </div>
      </div>
    </div>
  );
}

export default App;

  
