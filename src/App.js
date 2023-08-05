import {useState, useEffect} from 'react'

export default function App() {
  const totalSeats = 4000
  const [buyerId, setBuyerId] = useState(1)
  const [ticketQueue, setTicketQueue] = useState([])
  const [availableSeats, setAvailableSeats] = useState(totalSeats)
  const [soldOut, setSoldOut] = useState(false)
  const [userClick, setUserClick] = useState(false)

  useEffect(() => {
    multiplePurchase()
  }, [userClick])

  useEffect(() => {
    processTicket()
  }, [ticketQueue[0], ticketQueue[ticketQueue.length - 1]])

  const multiplePurchase = () => {
    const interval = setInterval(() => {
      if (!soldOut) {
        buyTicket(buyerId)
        setBuyerId(prevId => prevId + 1)
      }
    }, 50)
    if (soldOut) {
      clearInterval(interval)
    }
  }

  const buyTicket = (buyer) => {
    setTicketQueue(prevQueue => [...prevQueue, buyer])
  }

  const processTicket = () => {
    console.log(ticketQueue)
    const newQueue = ticketQueue.slice()
    const removedBuyer = newQueue.shift()
    setTicketQueue(newQueue)
    if(availableSeats > 0) {
      console.log('1 ticket sold. Buyer #', removedBuyer)
      setAvailableSeats(prevSeats => prevSeats - 1)
    } else {
      console.log('Sorry, please come back next time. Buyer #', removedBuyer)
      setTicketQueue(newQueue)
    }
    if (availableSeats === 0) {
      setSoldOut(true)
    }
  }

  return (
    <div>
      <h1>Concert Ticket Vending System</h1>
      {(soldOut) ? (
        <p>Sold Out! Please come back next time!</p>
      ) : (
        <>
          <p>Remaining seats: {availableSeats}</p>
          <button onClick={() => setUserClick(true)}>Buy Ticket</button>
        </>
      )}
    </div>
  )
}

