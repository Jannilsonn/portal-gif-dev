import React, { useEffect, useState } from "react";
import githubLogo from "./assets/cib-github.svg"
import "./App.css"

// Constants
const GITHUB_HANDLE = "jannilsonn"
const GITHUB_LINK = `https://github.com/${GITHUB_HANDLE}`

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  // Ações
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet encontrada!");
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Conectado com a Chave Pública:",
            response.publicKey.toString()
          );

          /*
           * Define a chave pública do usuário no estado para ser usado posteriormente!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Objeto Solana não encontrado! Instale a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log(
        "Conectado com a Chave Pública:",
        response.publicKey.toString()
      );
      setWalletAddress(response.publicKey.toString());
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("Gif link:", inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue("");
    } else {
      console.log("Input vazio. Tente novamente.");
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Conecte sua carteira
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="Entre com o link do gif!!"
          value={inputValue}
          onChange={onInputChange}
        />
        <button type="submit" className="cta-button submit-gif-button">
          Enviar
        </button>
      </form>
      <div className="gif-grid">
        {/* Map através da 'gifList' ao invés da 'TEST_GIFS' */}
        {gifList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  // UseEffects
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">Portal de GIF Dev</p>
          <br/>
          <img alt="Coding Work From Home GIF By Domme Space" src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"/>
          <p className="sub-text">Veja sua coleção de GIF do mundo Dev</p>
          {!walletAddress && renderNotConnectedContainer()}
          {/* Precisamos apenas adicionar o inverso aqui! */}
          {walletAddress && renderConnectedContainer()}
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
