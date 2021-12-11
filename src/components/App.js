import React, { Component, useState } from 'react';
import Web3 from 'web3'
import './App.css';
import MemoryToken from '../abis/MemoryToken.json'
import Ranking from'../abis/Ranking.json'
import brain from '../brain.png'
import RankTable from './Ranking'

const CARD_ARRAY = [
  {
    name: 'fries',
    img: '/images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: '/images/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: '/images/ice-cream.png'
  },
  {
    name: 'pizza',
    img: '/images/pizza.png'
  },
  {
    name: 'milkshake',
    img: '/images/milkshake.png'
  },
  {
    name: 'hotdog',
    img: '/images/hotdog.png'
  },
  {
    name: 'fries',
    img: '/images/fries.png'
  },
  {
    name: 'cheeseburger',
    img: '/images/cheeseburger.png'
  },
  {
    name: 'ice-cream',
    img: '/images/ice-cream.png'
  },
  {
    name: 'pizza',
    img: '/images/pizza.png'
  },
  {
    name: 'milkshake',
    img: '/images/milkshake.png'
  },
  {
    name: 'hotdog',
    img: '/images/hotdog.png'
  }
]



class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()

    this.setState({ cardArray: CARD_ARRAY.sort(() => 0.5 - Math.random()) })
    
    // while (this.state.loading == false) {
    //   if (this.state.wallet == true) {
    //     await this.loadBlockchainDataRepeat()
    //     // await this.delay(1500);
    //   } else {
    //     window.alert('Please connect to Metamask wallet to Rinkeby Testnet and refresh webpage.')
    //     await this.loadBlockchainDataRepeat()
    //     // await this.delay(1500);
    //   }
    // }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const infuraKey = "e4d4bd63d38d414c8e9f280b70c6a830";
    const web3Eth = new Web3(`https://mainnet.infura.io/v3/${infuraKey}`);
    const accounts = await web3.eth.getAccounts()
    
    this.setState({ account: accounts[0] })
    // Load  Ranking smart contract
    const networkId = await web3.eth.net.getId()
    const rankingData = Ranking.networks[networkId]
    this.setState({ networkId: networkId})

    var conn_Eth = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/e4d4bd63d38d414c8e9f280b70c6a830"));
    const Eth_ranking = new conn_Eth.eth.Contract(Ranking.abi, Ranking.networks[4].address)

    Eth_ranking.events.PlayerRank()
    .on('data', async event => {
      this.componentWillMount()
    })    

    if(rankingData) {
      const abi = Ranking.abi
      const address = rankingData.address
      const ranKing = new web3.eth.Contract(abi, address)
      this.setState({ ranKing })
      console.log(this.state.ranKing)
      let name = await this.state.ranKing.methods.players(0).call()
      // this.state.ranKing.methods.completeGame(12).send({from: this.state.account})
      console.log(name)

      let scoreInfo = await ranKing.methods.score(this.state.account).call()
      let score = scoreInfo.score

      let playerIndex = await ranKing.methods.playerIndex().call()
      this.setState({ playerIndex })
      this.state.players = []

      let sortItem
      for (var i=0; i < playerIndex; i++) {
        let playerAdd = await ranKing.methods.players(i).call()
        const playerInfo = await ranKing.methods.score(playerAdd).call()
        this.setState({
          players: [...this.state.players, playerInfo]
        })
      }

      sortItem = [...this.state.players]
      await sortItem.sort(({score:a}, {score:b}) => {
          let c = parseInt(b,10) - parseInt(a,10)
          return c;
        });

      this.setState({sortItem})
      this.setState({score})

      this.setState({loading:false})
      this.setState({wallet: true})
      // const totalSupply = await token.methods.totalSupply().call()
      // this.setState({ totalSupply })
      // // Load Tokens
      // let balanceOf = await token.methods.balanceOf(accounts[0]).call()
      
    } else {
      while (this.state.loading == true) {
        this.setState({wallet: false})
        window.alert('Smart contract not deployed to detected network.')
        await this.delay(1500);
        await this.loadBlockchainData()
        }
    }
  }
  async loadBlockchainDataRepeat() {
    const web3 = window.web3
    const infuraKey = "e4d4bd63d38d414c8e9f280b70c6a830";
    const web3Eth = new Web3(`https://mainnet.infura.io/v3/${infuraKey}`);
    const accounts = await web3.eth.getAccounts()

    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    this.setState({ networkId: networkId })

    // Load Ranking
    const rankingData = Ranking.networks[networkId]
    if(rankingData) {
      this.state.players.sort(function (a,b) {
        var keyA = a.score,
        keyB = b.score;
        //compare the 2 scores
        if (keyA > keyB) return -1;
        if (keyB > keyA) return 1;
        return 0;
      });
      this.setState({ loading:false})
      this.setState({ wallet:true})
    } else {
      this.setState({ loading:false})
      this.setState({ wallet:false})
    }
  }

  chooseImage = (cardId) => {
    cardId = cardId.toString()
    if(this.state.cardsWon.includes(cardId)) {
      return window.location.origin + '/images/white.png'
    }
    else if(this.state.cardsChosenId.includes(cardId)) {
      return CARD_ARRAY[cardId].img
    } else {
      return window.location.origin + '/images/blank.png'
    }
  }

  flipCard = async (cardId) => {
    let alreadyChosen = this.state.cardsChosen.length

    this.setState({
      cardsChosen: [...this.state.cardsChosen, this.state.cardArray[cardId].name],
      cardsChosenId: [...this.state.cardsChosenId, cardId]
    })

    if (alreadyChosen === 1) {
      setTimeout(this.checkForMatch, 100)
    }
  }

 

  checkForMatch = async () => {
    const optionOneId = this.state.cardsChosenId[0]
    const optionTwoId = this.state.cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      alert('You have clicked the same image!')
    } else if (this.state.cardsChosen[0] === this.state.cardsChosen[1]) {
      alert('You found a match')
      this.setState({
        count:this.state.count +1
      })
      // this.state.token.methods.mint(
      //   this.state.account,
      //   window.location.origin + CARD_ARRAY[optionOneId].img.toString()
      // )
      // // .send({ from: this.state.account })
      // .on('transactionHash', (hash) => {
        this.setState({
          cardsWon: [...this.state.cardsWon, optionOneId, optionTwoId],
          tokenURIs: [...this.state.tokenURIs, CARD_ARRAY[optionOneId].img]          
        })
      // })
      
    } else {
      alert('Sorry, try again')
      this.setState({
        count:this.state.count +1
      })      
    }
    this.setState({
      cardsChosen: [],
      cardsChosenId: [],
      
    })
    if (this.state.cardsWon.length === CARD_ARRAY.length) {
      alert('Congratulations! You found them all!')
      this.setState({endGame:true})
      console.log(this.state.endGame)
      const amount = this.state.count
      console.log(amount)
      
    }

       
  }

  completeGame  (amount) {
    console.log(this.state.count)
    console.log(this.state.account)

    // const rankingData = Ranking.networks[4]

    // const address = rankingData.address
    // const ranKing = new window.web3.eth.Contract(Ranking.abi, address)
    this.state.ranKing.methods.completeGame(amount).send({from: this.state.account})
  }
  
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      ranKing: {},
      // token: null,
      // totalSupply: 0,
      tokenURIs: [],
      cardArray: [],
      cardsChosen: [],
      cardsChosenId: [],
      cardsWon: [],
      count: 0,
      players: [],
      loading: true,
      wallet: true,
      endGame: false
    }
  }
   
  render() {
    let content, content2
    
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading... </p> 
      content2 = <p id="loader" className="text-center">Loading... </p> 
    }  

    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
          <img src={brain} width="30" height="30" className="d-inline-block align-top" alt="" />
          &nbsp; MatchingGame
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-muted"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1 className="d-4">Start matching now!</h1>

                <div className="grid mb-4" >

                  { this.state.cardArray.map((card, key) => {
                    return(
                      <img
                        key={key}
                        src={this.chooseImage(key)}
                        data-id={key}
                        onClick={(event) => {
                          let cardId = event.target.getAttribute('data-id')
                          if(!this.state.cardsWon.includes(cardId.toString())) {
                            this.flipCard(cardId)
                          }
                        }}
                      />
                    )
                  })}


                </div>

                <div>
                  <h5> 
                    Moves: <span id="counter">&nbsp;{this.state.count}</span>
                  </h5>

                  <h5>Tokens Collected:<span id="result">&nbsp;{this.state.tokenURIs.length}</span></h5>
                  {this.state.endGame ?
                  <div>
                    <button onClick={() => {
                      this.completeGame(this.state.count)
                    }}>test</button>
                  </div>:
                  <div><div>
                  {/* <button onClick={() => {
                    this.completeGame(this.state.count)
                  }}>testset</button> */}
                </div></div>
                }
                  <div className="grid mb-4" >

                    { this.state.tokenURIs.map((tokenURI, key) => {
                      return(
                        <img
                          key={key}
                          src={tokenURI}
                        />
                      )
                    })}

                  </div>
                    
                  <div className="card mb-4 card-body" >
                    <h4 className="table table-borderless text-muted text-center"> SpeedMatching Game Ranking <img height='30' alt="" /> </h4>&nbsp;
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Player (Address)</th>
                                <th scope="col">Score</th>

                            </tr>
                        </thead>
                          {/* <tbody>
                             {
                             this.state.sortItem.map((playerInfo, key) =>                              
                                    (
                                    <tr key={key}>
                                         <td>{this.sortItem.indexOf(playerInfo)+1}</td>
                                         <td>{playerInfo.plaYer}</td>
                                         <td>{playerInfo.score}</td>
                                    </tr> 
                              )                                   
                            )}                             
                        </tbody>  */}
                    </table>
                  </div>

                  </div>
                

                </div>                    
              
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
