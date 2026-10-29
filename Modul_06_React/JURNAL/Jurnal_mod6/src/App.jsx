
import { useState } from 'react'
import './App.css'

const dataAwal = [
  { id: 'm-1', nama: 'Ani', nim: '10121001', kelas: 'TI-2A', hadir: true },
  { id: 'm-2', nama: 'Budi', nim: '10121002', kelas: 'TI-2B', hadir: false },
  { id: 'm-3', nama: 'Citra', nim: '10121003', kelas: 'TI-2A', hadir: false },
]

function RingkasanPeserta({ peserta, jumlahDitampilkan }) {
  const totalHadir = peserta.filter((p) => p.hadir).length

  return (
    <section className="ringkasan">
      <div className="kartu-ringkasan">
        <span>Total Peserta</span>
        <strong>{peserta.length}</strong>
      </div>
      <div className="kartu-ringkasan">
        <span>Hadir</span>
        <strong>{totalHadir}</strong>
      </div>
      <div className="kartu-ringkasan">
        <span>Belum Hadir</span>
        <strong>{peserta.length - totalHadir}</strong>
      </div>
      <div className="kartu-ringkasan">
        <span>Hasil Ditampilkan</span>
        <strong>{jumlahDitampilkan}</strong>
      </div>
    </section>
  )
}

function FormPeserta({
  pesertaForm,
  setPesertaForm,
  saatSimpan,
  sedangEdit,
  saatBatal,
}) {
  function ubahInput(event) {
    const { name, value } = event.target
    setPesertaForm((sebelumnya) => ({ ...sebelumnya, [name]: value }))
  }

  return (
    <form className="form-peserta" onSubmit={saatSimpan}>
      <h2>{sedangEdit ? 'Edit Peserta' : 'Tambah Peserta'}</h2>

      <label htmlFor="nama">Nama</label>
      <input
        id="nama"
        name="nama"
        value={pesertaForm.nama}
        onChange={ubahInput}
        placeholder="Masukkan nama peserta"
      />

      <label htmlFor="nim">NIM</label>
      <input
        id="nim"
        name="nim"
        value={pesertaForm.nim}
        onChange={ubahInput}
        placeholder="Masukkan 8 digit NIM"
      />

      <label htmlFor="kelas">Kelas</label>
      <select
        id="kelas"
        name="kelas"
        value={pesertaForm.kelas}
        onChange={ubahInput}
      >
        <option value="">Pilih kelas</option>
        <option value="TI-2A">TI-2A</option>
        <option value="TI-2B">TI-2B</option>
      </select>

      <div className="aksi-form">
        <button type="submit">
          {sedangEdit ? 'Simpan Perubahan' : 'Tambah Peserta'}
        </button>
        {sedangEdit && (
          <button type="button" className="tombol-batal" onClick={saatBatal}>
            Batal
          </button>
        )}
      </div>
    </form>
  )
}

function FilterPeserta({
  pencarian,
  setPencarian,
  filterKelas,
  setFilterKelas,
}) {
  return (
    <section className="filter-peserta">
      <input
        aria-label="Cari peserta"
        value={pencarian}
        onChange={(event) => setPencarian(event.target.value)}
        placeholder="Cari nama atau NIM..."
      />
      <select
        aria-label="Filter kelas"
        value={filterKelas}
        onChange={(event) => setFilterKelas(event.target.value)}
      >
        <option value="Semua">Semua kelas</option>
        <option value="TI-2A">TI-2A</option>
        <option value="TI-2B">TI-2B</option>
      </select>
    </section>
  )
}

function ItemPeserta({ peserta, saatEdit, saatHapus, saatUbahHadir }) {
  return (
    <article className="item-peserta">
      <div className="info-peserta">
        <strong>{peserta.nama}</strong>
        <span>NIM: {peserta.nim}</span>
        <span>Kelas: {peserta.kelas}</span>
      </div>

      <span className={peserta.hadir ? 'status hadir' : 'status belum-hadir'}>
        {peserta.hadir ? 'Hadir' : 'Belum hadir'}
      </span>

      <div className="aksi-peserta">
        <button type="button" onClick={() => saatUbahHadir(peserta.id)}>
          {peserta.hadir ? 'Batalkan Hadir' : 'Tandai Hadir'}
        </button>
        <button type="button" className="tombol-edit" onClick={() => saatEdit(peserta)}>
          Edit
        </button>
        <button type="button" className="tombol-hapus" onClick={() => saatHapus(peserta.id)}>
          Hapus
        </button>
      </div>
    </article>
  )
}

function DaftarPeserta({
  peserta,
  semuaPesertaKosong,
  saatEdit,
  saatHapus,
  saatUbahHadir,
}) {
  if (peserta.length === 0) {
    return (
      <p className="pesan-kosong">
        {semuaPesertaKosong
          ? 'Belum ada peserta.'
          : 'Peserta tidak ditemukan.'}
      </p>
    )
  }

  return (
    <section className="daftar-peserta">
      {peserta.map((item) => (
        <ItemPeserta
          key={item.id}
          peserta={item}
          saatEdit={saatEdit}
          saatHapus={saatHapus}
          saatUbahHadir={saatUbahHadir}
        />
      ))}
    </section>
  )
}

function App() {
  const [peserta, setPeserta] = useState(dataAwal)
  const [pesertaForm, setPesertaForm] = useState({
    nama: '',
    nim: '',
    kelas: '',
  })
  const [idEdit, setIdEdit] = useState(null)
  const [pencarian, setPencarian] = useState('')
  const [filterKelas, setFilterKelas] = useState('Semua')
  const [pesan, setPesan] = useState('')

  function resetForm() {
    setPesertaForm({ nama: '', nim: '', kelas: '' })
    setIdEdit(null)
    setPesan('')
  }

  function simpanPeserta(event) {
    event.preventDefault()

    const nama = pesertaForm.nama.trim()
    const nim = pesertaForm.nim.trim()
    const kelas = pesertaForm.kelas

    if (nama.length < 3) {
      setPesan('Nama wajib diisi minimal 3 karakter.')
      return
    }

    if (!/^\d{8}$/.test(nim)) {
      setPesan('NIM harus terdiri dari tepat 8 digit angka.')
      return
    }

    if (!kelas) {
      setPesan('Silakan pilih kelas.')
      return
    }

    const nimDuplikat = peserta.some(
      (p) => p.nim === nim && p.id !== idEdit,
    )

    if (nimDuplikat) {
      setPesan('NIM sudah digunakan peserta lain.')
      return
    }

    if (idEdit) {
      setPeserta((sebelumnya) =>
        sebelumnya.map((p) =>
          p.id === idEdit ? { ...p, nama, nim, kelas } : p,
        ),
      )
    } else {
      setPeserta((sebelumnya) => [
        ...sebelumnya,
        {
          id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          nama,
          nim,
          kelas,
          hadir: false,
        },
      ])
    }

    resetForm()
  }

  function mulaiEdit(item) {
    setIdEdit(item.id)
    setPesertaForm({
      nama: item.nama,
      nim: item.nim,
      kelas: item.kelas,
    })
    setPesan('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function hapusPeserta(id) {
    setPeserta((sebelumnya) => sebelumnya.filter((p) => p.id !== id))
    if (id === idEdit) resetForm()
  }

  function ubahKehadiran(id) {
    setPeserta((sebelumnya) =>
      sebelumnya.map((p) =>
        p.id === id ? { ...p, hadir: !p.hadir } : p,
      ),
    )
  }

  const pesertaTerfilter = peserta.filter((p) => {
    const kata = pencarian.trim().toLowerCase()
    const cocokPencarian =
      p.nama.toLowerCase().includes(kata) || p.nim.includes(kata)
    const cocokKelas = filterKelas === 'Semua' || p.kelas === filterKelas
    return cocokPencarian && cocokKelas
  })

  return (
    <main className="aplikasi">
      <header className="header-aplikasi">
        <p className="label-atas">PRAKTIKUM PEMROGRAMAN WEB</p>
        <h1>Manajemen Peserta Praktikum</h1>
        <p>Kelola data peserta dan pantau kehadiran dengan mudah.</p>
      </header>

      <RingkasanPeserta
        peserta={peserta}
        jumlahDitampilkan={pesertaTerfilter.length}
      />

      <div className="konten-utama">
        <div>
          <FormPeserta
            pesertaForm={pesertaForm}
            setPesertaForm={setPesertaForm}
            saatSimpan={simpanPeserta}
            sedangEdit={idEdit !== null}
            saatBatal={resetForm}
          />
          {pesan && <p className="pesan-error" role="alert">{pesan}</p>}
        </div>

        <section className="panel-daftar">
          <h2>Daftar Peserta</h2>
          <FilterPeserta
            pencarian={pencarian}
            setPencarian={setPencarian}
            filterKelas={filterKelas}
            setFilterKelas={setFilterKelas}
          />
          <DaftarPeserta
            peserta={pesertaTerfilter}
            semuaPesertaKosong={peserta.length === 0}
            saatEdit={mulaiEdit}
            saatHapus={hapusPeserta}
            saatUbahHadir={ubahKehadiran}
          />
        </section>
      </div>
    </main>
  )
}

export default App
