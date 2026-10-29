import React from 'react'
import { useState } from 'react'

function Counter () {
    const [jumlah, setJumlah] = React.useState(0);

  return (
    <div>
        <p>Jumlah Klik: {jumlah}</p>
        <button onClick={() => setJumlah(jumlah + 1)}>Tambah</button>
    </div>
  )
}

export default Counter
