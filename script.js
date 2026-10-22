document.addEventListener('DOMContentLoaded', function () {

    const tanggalPernikahan = new Date("December 26, 2026 16:00:00").getTime();

    const pembaruanHitungan = setInterval(function () {
        const sekarang = new Date().getTime();
        const selisihWaktu = tanggalPernikahan - sekarang;

        const hari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24));
        const jam = Math.floor((selisihWaktu % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const menit = Math.floor((selisihWaktu % (1000 * 60 * 60)) / (1000 * 60));
        const detik = Math.floor((selisihWaktu % (1000 * 60)) / 1000);

        const elHari = document.getElementById("hari");
        const elJam = document.getElementById("jam");
        const elMenit = document.getElementById("menit");
        const elDetik = document.getElementById("detik");

        if (elHari && elJam && elMenit && elDetik) {
            elHari.innerText = hari < 10 ? "0" + hari : hari;
            elJam.innerText = jam < 10 ? "0" + jam : jam;
            elMenit.innerText = menit < 10 ? "0" + menit : menit;
            elDetik.innerText = detik < 10 ? "0" + detik : detik;
        }

        if (selisihWaktu < 0) {
            clearInterval(pembaruanHitungan);
            const wadahHitungan = document.querySelector(".hitungan_mundur");
            if (wadahHitungan) {
                wadahHitungan.innerHTML = "<h3 class='text-light'>Hari Bahagia Telah Tiba!</h3>";
            }
        }
    }, 1000);

    const musikLatar = document.getElementById('musik_latar');
    const tombolMusik = document.getElementById('tombol_musik');
    let sedangMemutar = false;

    if (tombolMusik && musikLatar) {
        tombolMusik.addEventListener('click', function () {
            if (sedangMemutar) {
                musikLatar.pause();
                tombolMusik.innerHTML = '<i class="fas fa-music"></i>';
            } else {
                musikLatar.play();
                tombolMusik.innerHTML = '<i class="fas fa-pause"></i>';
            }
            sedangMemutar = !sedangMemutar;
        });

        document.body.addEventListener('click', function putarOtomatisSekali() {
            if (!sedangMemutar) {
                musikLatar.play().then(() => {
                    sedangMemutar = true;
                    tombolMusik.innerHTML = '<i class="fas fa-pause"></i>';
                }).catch(() => {
                });
            }
            document.body.removeEventListener('click', putarOtomatisSekali);
        }, { once: true });
    }

    const formulirRsvp = document.getElementById('formulir_rsvp');
    if (formulirRsvp) {
        formulirRsvp.addEventListener('submit', function (e) {
            e.preventDefault();

            const nama = document.getElementById('nama_lengkap').value;
            const status = document.getElementById('status_kehadiran').value;

            const elemenModal = document.getElementById('modal_rsvp');
            if (elemenModal) {
                const modalInstance = bootstrap.Modal.getInstance(elemenModal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }

            tampilkanToast(`Terima kasih, ${nama}! Konfirmasi kehadiran Anda (${status}) telah berhasil dikirim.`);

            formulirRsvp.reset();
        });
    }

});

function salinRekening(nomorRekening) {
    navigator.clipboard.writeText(nomorRekening).then(function () {
        tampilkanToast("Nomor Rekening berhasil disalin ke papan klip!");
    }).catch(function (err) {
        console.error('Gagal menyalin: ', err);
    });
}

function tampilkanToast(pesan) {
    const elemenToast = document.getElementById('toast_notifikasi');
    const isiToast = document.getElementById('isi_pesan_toast');

    if (elemenToast && isiToast) {
        isiToast.innerText = pesan;
        const toastBootstrap = new bootstrap.Toast(elemenToast);
        toastBootstrap.show();
    }
}
