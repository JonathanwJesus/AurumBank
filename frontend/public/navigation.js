// Sistema de Navegação Aurum Bank - Versão Corrigida e Funcional
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando sistema de navegação...');
    
    // Mapeamento das páginas
    const pageMap = {
        'dashboard': 'Dashboard.html',
        'accounts': 'Conta.html',
        'transactions': 'Transisao.html', 
        'reports': 'Relatorio.html',
        'settings': 'Config.html'
    };

    // 1. Configurar clicks no menu
    function setupMenuListeners() {
        const menuItems = document.querySelectorAll('.menu-item[data-page]');
        console.log('📝 Configurando ' + menuItems.length + ' itens de menu');
        
        menuItems.forEach(function(item) {
            // Remover event listeners antigos
            var newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            // Adicionar novo listener
            newItem.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var page = this.getAttribute('data-page');
                console.log('🔗 Navegando para: ' + page);
                
                if (pageMap[page]) {
                    showLoading();
                    
                    // Navegação tradicional
                    setTimeout(function() {
                        window.location.href = pageMap[page];
                    }, 400);
                }
            });
        });
    }

    // 2. Atualizar menu ativo
    function updateActiveMenu() {
        var currentPath = window.location.pathname;
        var currentPage = currentPath.split('/').pop() || 'Dashboard.html';
        
        var pageToKey = {
            'Dashboard.html': 'dashboard',
            'Conta.html': 'accounts',
            'Transisao.html': 'transactions',
            'Relatorio.html': 'reports', 
            'Config.html': 'settings'
        };
        
        var currentPageKey = pageToKey[currentPage] || 'dashboard';
        console.log('📍 Página atual: ' + currentPageKey);
        
        var menuItems = document.querySelectorAll('.menu-item[data-page]');
        menuItems.forEach(function(item) {
            var isActive = item.getAttribute('data-page') === currentPageKey;
            item.classList.toggle('active', isActive);
        });
    }

    // 3. Configurar logout
    function setupLogoutListener() {
        var logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Tem certeza que deseja sair?')) {
                    alert('Você foi desconectado com sucesso!');
                }
            });
        }
    }

    // 4. Configurar menu mobile
    function setupMobileMenu() {
        var menuToggle = document.querySelector('.menu-toggle');
        var sidebar = document.querySelector('.sidebar');
        var overlay = document.querySelector('.overlay');

        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
                if (overlay) overlay.classList.toggle('active');
            });

            if (overlay) {
                overlay.addEventListener('click', function() {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            }
        }
    }

    // 5. Mostrar loading
    function showLoading() {
        // Remover loader existente
        var existingLoader = document.getElementById('page-loader');
        if (existingLoader) {
            existingLoader.remove();
        }

        var loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0; 
                left: 0;
                width: 100%; 
                height: 100%;
                background: rgba(255,255,255,0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                font-family: 'Segoe UI', sans-serif;
            ">
                <div style="
                    text-align: center;
                    background: white;
                    padding: 3rem;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    border: 2px solid #1a237e;
                ">
                    <div style="
                        width: 60px; 
                        height: 60px;
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #1a237e;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 1.5rem;
                    "></div>
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

        // Auto-remover após 5 segundos (segurança)
        setTimeout(function() {
            var loader = document.getElementById('page-loader');
            if (loader) {
                loader.remove();
            }
        }, 5000);
    }

    // Inicializar tudo
    setupMenuListeners();
    updateActiveMenu();
    setupLogoutListener();
    setupMobileMenu();

    console.log('✅ Sistema de navegação configurado!');
});

// Fallback para caso o DOM já esteja carregado
if (document.readyState !== 'loading') {
    var event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}