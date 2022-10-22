import React, { useEffect, useState } from "react";
import githubLogo from "./assets/cib-github.svg"
import "./App.css"

// Constants
const GITHUB_HANDLE = "jannilsonn"
const GITHUB_LINK = `https://github.com/${GITHUB_HANDLE}`

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

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

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Conecte sua carteira
    </button>
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
