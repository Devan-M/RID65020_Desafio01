document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario-contato');
    const modal = document.getElementById('modal');
    const modalMensagem = document.getElementById('modal-mensagem');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!nome || !email) {
            mostrarModal("Preencha todos os campos corretamente.", false);
            return;
        }

        fetch("https://script.google.com/macros/s/AKfycbzXpVGRCWVcaDOfYG0ZIF8E7q9uA0dA_grBx3IpSnTcF0YxUJs7bdWyYNtP40Zi1YTL/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `name=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "sucesso") {
                mostrarModal("Dados enviados com sucesso!", true);
            } else {
                mostrarModal("Erro: " + (data.mensagem || "Tente novamente."), false);
            }
        })
        .catch(() => {
            mostrarModal("Erro ao enviar. Verifique sua conexão.", false);
        });
    });

    function mostrarModal(mensagem, sucesso) {
        modalMensagem.textContent = mensagem;
        modalMensagem.style.color = sucesso ? 'green' : 'red';
        modal.classList.add('show');

        // Fecha o modal com fade-out após 3 segundos
        setTimeout(() => {
            modal.classList.remove('show');
            if (sucesso) {
                setTimeout(() => {
                    location.reload();
                }, 500); // Espera o fade-out completar antes do reload
            }
        }, 3000);
    }
});