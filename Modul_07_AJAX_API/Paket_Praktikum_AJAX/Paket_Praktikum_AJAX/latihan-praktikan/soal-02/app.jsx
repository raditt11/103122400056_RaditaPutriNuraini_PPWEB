
const { useState, useEffect } = React;

function App() {
    const [peserta, setPeserta] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [skenario, setSkenario] = useState("berhasil");
    const [reload, setReload] = useState(0);

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);
    const [hasilPost, setHasilPost] = useState(null);

    // Mengambil data peserta berdasarkan skenario
    useEffect(() => {
        let aktif = true;

        const konfigurasi = {
            berhasil: {
                url: "/api/users?delay=1000",
                timeout: 5000
            },
            kosong: {
                url: "/api/users?mode=empty&delay=1000",
                timeout: 5000
            },
            error: {
                url: "/api/users?mode=error&delay=1000",
                timeout: 5000
            },
            timeout: {
                url: "/api/users?delay=2500",
                timeout: 700
            }
        };

        const pilihan = konfigurasi[skenario];

        setLoading(true);
        setError("");
        setPeserta([]);

        axios.get(pilihan.url, {
            timeout: pilihan.timeout
        })
        .then((response) => {
            if (!aktif) return;

            setPeserta(response.data);
        })
        .catch((err) => {
            if (!aktif) return;

            setPeserta([]);

            if (err.response) {
                setError(`Gagal mengambil data. HTTP ${err.response.status}.`);
            } else if (err.code === "ECONNABORTED") {
                setError("Request mengalami timeout. Silakan coba lagi.");
            } else {
                setError(`Terjadi kesalahan: ${err.message}`);
            }
        })
        .finally(() => {
            if (aktif) {
                setLoading(false);
            }
        });

        // Mencegah respons lama mengubah tampilan terbaru
        return () => {
            aktif = false;
        };
    }, [skenario, reload]);

    // Mengirim data peserta baru
    async function handleSubmit(event) {
        event.preventDefault();

        if (!nama.trim()) {
            setHasilPost({
                error: "Nama tidak boleh kosong."
            });
            return;
        }

        const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!polaEmail.test(email.trim())) {
            setHasilPost({
                error: "Format email tidak valid."
            });
            return;
        }

        setSending(true);
        setHasilPost(null);

        try {
            const response = await axios.post("/api/users", {
                name: nama.trim(),
                email: email.trim()
            });

            setHasilPost({
                status: response.status,
                ...response.data
            });
        } catch (err) {
            if (err.response) {
                setHasilPost({
                    error: `Gagal mengirim data. HTTP ${err.response.status}.`
                });
            } else {
                setHasilPost({
                    error: `Terjadi kesalahan: ${err.message}`
                });
            }
        } finally {
            setSending(false);
        }
    }

    return (
        <main>
            <h1>Direktori Peserta Praktikum</h1>

            <section>
                <h2>Daftar Peserta</h2>

                <label htmlFor="skenario">Pilih skenario:</label>
                {" "}
                <select
                    id="skenario"
                    value={skenario}
                    onChange={(event) => setSkenario(event.target.value)}
                >
                    <option value="berhasil">Berhasil</option>
                    <option value="kosong">Data kosong</option>
                    <option value="error">Error HTTP</option>
                    <option value="timeout">Timeout</option>
                </select>

                {" "}
                <button
                    type="button"
                    onClick={() => setReload((nilai) => nilai + 1)}
                    disabled={loading}
                >
                    Muat ulang
                </button>

                {loading && <p>Memuat data peserta...</p>}

                {error && <p role="alert">{error}</p>}

                {!loading && !error && peserta.length === 0 && (
                    <p>Belum ada data peserta.</p>
                )}

                {!loading && peserta.length > 0 && (
                    <ul>
                        {peserta.map((user) => (
                            <li key={user.id}>
                                {user.name} - {user.email}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h2>Tambah Peserta</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nama">Nama:</label>
                        <br />
                        <input
                            id="nama"
                            type="text"
                            value={nama}
                            onChange={(event) => setNama(event.target.value)}
                            placeholder="Masukkan nama"
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <br />
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Masukkan email"
                        />
                    </div>

                    <button type="submit" disabled={sending}>
                        {sending ? "Mengirim..." : "Kirim Peserta"}
                    </button>
                </form>

                {hasilPost && (
                    <div>
                        <h3>Hasil Pengiriman</h3>

                        {hasilPost.error ? (
                            <p role="alert">{hasilPost.error}</p>
                        ) : (
                            <>
                                <p>HTTP Status: {hasilPost.status}</p>
                                <p>ID: {hasilPost.id}</p>
                                <p>Nama: {hasilPost.name}</p>
                                <p>Email: {hasilPost.email}</p>
                                <p>Simulated: {String(hasilPost.simulated)}</p>
                                <p>
                                    {hasilPost.message ||
                                        "Simulasi berhasil, data tidak disimpan."}
                                </p>
                            </>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
