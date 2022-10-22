import githubLogo from "./assets/cib-github.svg"
import "./App.css"

// Constants
const GITHUB_HANDLE = "jannilsonn"
const GITHUB_LINK = `https://github.com/${GITHUB_HANDLE}`

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Portal de GIF Dev</p>
          <br/>
          <img alt="Coding Work From Home GIF By Domme Space" src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"/>
          <p className="sub-text">Veja sua coleção de GIF do mundo Dev</p>
        </div>
        <div className="footer-container">
          <div className="footer-content">
            <img alt="GitHub Logo" className="github-logo" src={githubLogo} />
            <a
              className="footer-text"
              href={GITHUB_LINK}
              target="_blank"
              rel="noreferrer"
            >{`feito com ❤️ por @${GITHUB_HANDLE}`}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
