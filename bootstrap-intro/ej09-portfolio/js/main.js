// ============================================================
// main.js – JavaScript del portfolio
// Funcionalidades:
//   1. Modal de detalle de proyecto (Bootstrap Modal)
//   2. Validación del formulario de contacto (Bootstrap Validation)
//   3. Cambio de tema claro / oscuro (data-bs-theme)
// ============================================================


// ── 1. Modal de detalle de proyecto ──────────────────────────
// Cuando el usuario hace clic en "Ver detalle del proyecto",
// se leen los data-* del botón y se rellenan los campos del modal.

const modalProyecto = document.getElementById('modalProyecto');

if (modalProyecto) {
  modalProyecto.addEventListener('show.bs.modal', function (event) {
    const boton = event.relatedTarget;

    const titulo    = boton.getAttribute('data-proyecto-titulo');
    const desc      = boton.getAttribute('data-proyecto-desc');
    const url       = boton.getAttribute('data-proyecto-url');
    const img       = boton.getAttribute('data-proyecto-img');
    const imgAlt    = boton.getAttribute('data-proyecto-alt');
    const badgesRaw = boton.getAttribute('data-proyecto-badges') || '';

    modalProyecto.querySelector('#modalProyectoLabel').textContent = titulo;
    modalProyecto.querySelector('#modal-desc').textContent         = desc;

    const modalImg = modalProyecto.querySelector('#modal-img');
    modalImg.src = img;
    modalImg.alt = imgAlt;

    const modalLink = modalProyecto.querySelector('#modal-link');
    modalLink.href  = url;

    // Generar badges dinámicamente
    const contenedorBadges = modalProyecto.querySelector('#modal-badges');
    contenedorBadges.innerHTML = '';
    if (badgesRaw) {
      badgesRaw.split(',').forEach(function (badge) {
        const span = document.createElement('span');
        span.className   = 'badge text-bg-secondary me-1';
        span.textContent = badge.trim();
        contenedorBadges.appendChild(span);
      });
    }
  });
}


// ── 2. Validación del formulario de contacto ─────────────────
// Bootstrap requiere .needs-validation en el <form>.
// Se añade was-validated al enviar para mostrar los mensajes de error.

const formContacto = document.getElementById('formContacto');
const alertaExito  = document.getElementById('alerta-exito');

if (formContacto) {
  formContacto.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (formContacto.checkValidity()) {
      formContacto.classList.remove('was-validated');
      formContacto.reset();
      if (alertaExito) {
        alertaExito.classList.remove('d-none');
        setTimeout(function () {
          alertaExito.classList.add('d-none');
        }, 5000);
      }
    }

    formContacto.classList.add('was-validated');
  });
}


// ── 3. Cambio de tema claro / oscuro (data-bs-theme) ─────────
// Bootstrap 5.3 gestiona los temas con el atributo data-bs-theme en <html>.
// Guardamos la preferencia en localStorage para que persista entre visitas.

const btnTema   = document.getElementById('btn-tema');
const iconTema  = btnTema ? btnTema.querySelector('i') : null;
const textoTema = btnTema ? btnTema.querySelector('.btn-tema-texto') : null;
const htmlEl    = document.documentElement;

// Restaurar tema guardado al cargar la página
const temaGuardado = localStorage.getItem('tema');
if (temaGuardado) {
  htmlEl.setAttribute('data-bs-theme', temaGuardado);
  actualizarBotonTema(temaGuardado);
}

if (btnTema) {
  btnTema.addEventListener('click', function () {
    const temaActual = htmlEl.getAttribute('data-bs-theme') || 'light';
    const nuevoTema  = temaActual === 'light' ? 'dark' : 'light';

    htmlEl.setAttribute('data-bs-theme', nuevoTema);
    localStorage.setItem('tema', nuevoTema);
    actualizarBotonTema(nuevoTema);
  });
}

function actualizarBotonTema(tema) {
  if (!btnTema || !iconTema || !textoTema) return;

  if (tema === 'dark') {
    iconTema.className    = 'bi bi-sun-fill';
    textoTema.textContent = 'Modo claro';
    btnTema.setAttribute('aria-label', 'Cambiar a modo claro');
    btnTema.setAttribute('aria-pressed', 'true');
  } else {
    iconTema.className    = 'bi bi-moon-fill';
    textoTema.textContent = 'Modo oscuro';
    btnTema.setAttribute('aria-label', 'Cambiar a modo oscuro');
    btnTema.setAttribute('aria-pressed', 'false');
  }
}
