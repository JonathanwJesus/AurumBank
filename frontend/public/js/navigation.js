// 🔹 Sistema de Navegação Aurum Bank - Versão Estável e Corrigida
document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 Sistema de navegação iniciado...');

  // 🗺️ Mapeamento das páginas
  const pageMap = {
    'dashboard': 'Dashboard.html',
    'accounts': 'Conta.html',
    'transactions': 'Transisao.html',
    'reports': 'Relatorio.html',
    'settings': 'Config.html'
  };

  // 🧭 Configurar navegação do menu lateral
  function setupMenuListeners() {
    const menuItems = document.querySelectorAll('.menu-item[data-page]');
    console.log(`📝 Encontrados ${menuItems.length} itens de menu`);

    menuItems.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const page = this.getAttribute('data-page');
        console.log(`🔗 Navegando para: ${page}`);

        if (pageMap[page]) {
          showLoading();
          // Redireciona após 400ms para simular o carregamento
          setTimeout(() => {
            window.location.href = "./" + pageMap[page];
          }, 400);
        }
      });
    });
  }

  // 📍 Atualizar destaque do item ativo no menu
  function updateActiveMenu() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'Dashboard.html';

    const pageToKey = {
      'Dashboard.html': 'dashboard',
      'Conta.html': 'accounts',
      'Transisao.html': 'transactions',
      'Relatorio.html': 'reports',
      'Config.html': 'settings'
    };

    const currentPageKey = pageToKey[currentPage] || 'dashboard';
    console.log(`📍 Página atual detectada: ${currentPageKey}`);

    document.querySelectorAll('.menu-item[data-page]').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-page') === currentPageKey);
    });
  }

  // 👤 Configurar botão de logout
  function setupLogoutListener() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm('Tem certeza que deseja sair?')) {
          alert('Você foi desconectado com sucesso!');
          // Aqui futuramente pode redirecionar pro Login.html
        }
      });
    }
  }

  // 📱 Configurar menu lateral para mobile
  function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
      });

      if (overlay) {
        overlay.addEventListener('click', () => {
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
        });
      }
    }
  }

  // ⏳ Tela de carregamento temporária
  function showLoading() {
    // Remove se já existir
    const existingLoader = document.getElementById('page-loader');
    if (existingLoader) existingLoader.remove();

    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
      <div style="
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(255,255,255,0.95);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999; font-family: 'Segoe UI', sans-serif;">
        <div style="
          text-align: center; background: white; padding: 3rem;
          border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 2px solid #1a237e;">
          <div style="
            width: 60px; height: 60px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #1a237e;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1.5rem;">
          </div>
          <h3 style="color: #1a237e; margin-bottom: 0.5rem;">Aurum Bank</h3>
          <p style="color: #666; margin: 0;">Carregando...</p>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;

    document.body.appendChild(loader);

    // Remove automaticamente após 5s (segurança)
    setTimeout(() => {
      const loader = document.getElementById('page-loader');
      if (loader) loader.remove();
    }, 5000);
  }

  // 🚀 Inicialização geral
  setupMenuListeners();
  updateActiveMenu();
  setupLogoutListener();
  setupMobileMenu();

  console.log('✅ Sistema de navegação configurado com sucesso!');
});

// 🩵 Fallback caso o DOM já tenha sido carregado antes
if (document.readyState !== 'loading') {
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);
}
