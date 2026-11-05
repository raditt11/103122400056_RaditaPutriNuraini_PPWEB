
// ==========================================
// PORTAL INFORMASI PRAKTIKUM
// Modul 07 - AJAX dan Konsumsi API
// ==========================================

// Mengambil elemen HTML
const catatan = document.getElementById("catatan");
const hitungan = document.getElementById("hitungan");
const waktuAwal = document.getElementById("waktuAwal");

const btnHitung = document.getElementById("btnHitung");

const btnPengumuman = document.getElementById("btnPengumuman");
const statusPengumuman = document.getElementById("statusPengumuman");
const hasilPengumuman = document.getElementById("hasilPengumuman");

const sumber = document.getElementById("sumber");
const btnPeserta = document.getElementById("btnPeserta");
const statusPeserta = document.getElementById("statusPeserta");
const infoPeserta = document.getElementById("infoPeserta");
const daftarPeserta = document.getElementById("daftarPeserta");

// ==========================================
// 1. WAKTU PERTAMA HALAMAN DIBUKA
// ==========================================

const waktuHalamanDibuka = new Date();

waktuAwal.textContent = waktuHalamanDibuka.toLocaleString("id-ID");

// ==========================================
// 2. COUNTER / TAMBAH HITUNGAN
// ==========================================

let jumlahHitungan = 0;

btnHitung.addEventListener("click", function () {
    jumlahHitungan++;
    hitungan.textContent = jumlahHitungan;
});

// ==========================================
// 3. MEMUAT PENGUMUMAN DENGAN XMLHttpRequest
// ==========================================

btnPengumuman.addEventListener("click", function () {
    const xhr = new XMLHttpRequest();

    statusPengumuman.textContent = "Sedang memuat pengumuman...";
    hasilPengumuman.textContent = "";
    btnPengumuman.disabled = true;

    // Membuka request secara asynchronous
    xhr.open("GET", "pengumuman.txt", true);

    // Memeriksa proses request
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            btnPengumuman.disabled = false;

            if (xhr.status >= 200 && xhr.status < 300) {
                statusPengumuman.textContent =
                    "Pengumuman berhasil dimuat.";

                hasilPengumuman.textContent = xhr.responseText;
            } else {
                statusPengumuman.textContent =
                    `Gagal memuat pengumuman. HTTP ${xhr.status}.`;

                hasilPengumuman.textContent =
                    "Pastikan file pengumuman.txt tersedia.";
            }
        }
    };

    // Menangani gangguan jaringan
    xhr.onerror = function () {
        btnPengumuman.disabled = false;

        statusPengumuman.textContent =
            "Terjadi gangguan jaringan saat memuat pengumuman.";

        hasilPengumuman.textContent = "";
    };

    // Mengirim request
    xhr.send();
});

// ==========================================
// 4. MENGAMBIL DATA PESERTA DENGAN FETCH
// ==========================================

btnPeserta.addEventListener("click", async function () {
    const pilihanSumber = sumber.value;

    let url;
    let namaSumber;

    // Menentukan sumber API
    if (pilihanSumber === "mock") {
        url = "/api/users?delay=1500";
        namaSumber = "Mock lokal";
    } else {
        url = "https://jsonplaceholder.typicode.com/users";
        namaSumber = "JSONPlaceholder";
    }

    // Menampilkan loading
    btnPeserta.disabled = true;
    statusPeserta.textContent = "Sedang mengambil data peserta...";
    infoPeserta.textContent = "";
    daftarPeserta.innerHTML = "";

    try {
        // Mengirim request menggunakan Fetch
        const response = await fetch(url);

        // Memeriksa status HTTP
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        // Membaca response JSON
        const data = await response.json();

        // Mengambil maksimal tiga pengguna pertama
        const peserta = data.slice(0, 3);

        // Menampilkan informasi sumber dan jumlah data
        infoPeserta.textContent =
            `Sumber: ${namaSumber} | Jumlah data ditampilkan: ${peserta.length}`;

        if (peserta.length === 0) {
            statusPeserta.textContent =
                "Tidak ada data peserta yang ditemukan.";
            return;
        }

        // Menampilkan daftar peserta dari response API
        peserta.forEach(function (user) {
            const item = document.createElement("li");

            item.textContent = `${user.name} - ${user.email}`;

            daftarPeserta.appendChild(item);
        });

        statusPeserta.textContent =
            "Data peserta berhasil dimuat.";

    } catch (error) {
        // Menampilkan pesan kegagalan
        statusPeserta.textContent =
            `Gagal mengambil data peserta: ${error.message}`;

        infoPeserta.textContent = "";

        daftarPeserta.innerHTML = "";

        if (pilihanSumber === "eksternal") {
            statusPeserta.textContent +=
                " Periksa koneksi internet atau pilih Mock lokal secara manual.";
        }

    } finally {
        // Mengaktifkan kembali tombol setelah proses selesai
        btnPeserta.disabled = false;
    }
});
