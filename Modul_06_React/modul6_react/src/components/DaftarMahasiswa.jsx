import React from 'react'
import CardMahasiswa from './CardMahasiswa'

function DaftarMahasiswa() {
    const mahasiswa = [
        {id: 1, nama: 'John Doe', nim: '123456789'},
        {id: 2, nama: 'Jane Smith', nim: '987654321'},
        {id: 3, nama: 'Alice Johnson', nim: '456789123'},
        {id: 4, nama: 'Bob Brown', nim: '789123456'},
    ];

  return (
    <div>
        {mahasiswa.map((mhs) => (
            <CardMahasiswa key={mhs.id} nama={mhs.nama} nim={mhs.nim} />
        ))}
    </div>
  )
}

export default DaftarMahasiswa