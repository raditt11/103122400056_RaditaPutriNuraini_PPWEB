import { useState } from 'react'
import './App.css'
import CardMahasiswa from './components/CardMahasiswa'
import Counter from './components/Counter'
import DaftarMahasiswa from './components/DaftarMahasiswa'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CardMahasiswa nama="John Doe" nim="123456789" />

      <hr />
      <Counter />

      <DaftarMahasiswa />
    </>
  );
}

export default App
