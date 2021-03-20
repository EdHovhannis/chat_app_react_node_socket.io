import { Route } from 'react-router-dom'
import Chat from './components/Chat'
import Join from './components/Join'

function App() {
  return (
    <>
      <Route exact path="/" component={Join}/>
      <Route path="/chat" component={Chat}/>
    </>
  )
}

export default App
