// Sistema de Navegação SPA - Versão Corrigida
class NavigationSystem {
    constructor() {
        this.pages = {
            'dashboard': 'Dashboard.html',
            'accounts': 'Conta.html', 
            'transactions': 'Transisao.html',
            'reports': 'Relatorio.html',
            'settings': 'Config.html'
        };
        this.currentPage = 'dashboard';
        this.init();
    }
    
    init() {
        this.setupMenuListeners();
        // Não carregar a página inicial automaticamente
        // pois ela já está carregada
    }
    
    setupMenuListeners() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
    }
    
    navigateTo(page) {
        if (this.pages[page] && page !== this.currentPage) {
            this.currentPage = page;
            this.loadPage(page);
            this.updateActiveMenu(page);
        }
    }
    
    async loadPage(page) {
        try {
            this.showLoading();
            
            // Fazer a requisição para a página
            const response = await fetch(this.pages[page]);
            const html = await response.text();
            
            // Extrair o conteúdo completo da página
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extrair e injetar os estilos da página
            this.injectPageStyles(doc);
            
            // Extrair e injetar o conteúdo principal
            const mainContent = doc.querySelector('.main-content');
            if (mainContent) {
                document.querySelector('.main-content').innerHTML = mainContent.innerHTML;
            }
            
            // Atualizar o título da página
            document.title = doc.title;
            
            // Reaplicar scripts
            this.reapplyScripts(page);
            
            this.hideLoading();
            
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            this.hideLoading();
            // Fallback: redirecionamento tradicional
            window.location.href = this.pages[page];
        }
    }
    
    injectPageStyles(doc) {
        // Encontrar todos os estilos da página carregada
        const styles = doc.querySelectorAll('style');
        const existingStyleIds = new Set();
        
        // Marcar estilos existentes
        document.querySelectorAll('style[data-page-style]').forEach(style => {
            existingStyleIds.add(style.getAttribute('data-style-id'));
        });
        
        // Adicionar novos estilos
        styles.forEach((style, index) => {
            const styleId = `style-${this.currentPage}-${index}`;
            
            // Se o estilo já existe, remover primeiro
            const existingStyle = document.querySelector(`[data-style-id="${styleId}"]`);
            if (existingStyle) {
                existingStyle.remove();
            }
            
            // Criar novo elemento de estilo
            const newStyle = document.createElement('style');
            newStyle.setAttribute('data-page-style', 'true');
            newStyle.setAttribute('data-style-id', styleId);
            newStyle.textContent = style.textContent;
            
            document.head.appendChild(newStyle);
        });
        
        // Limpar estilos antigos de outras páginas
        document.querySelectorAll('style[data-page-style]').forEach(style => {
            if (!style.getAttribute('data-style-id').includes(this.currentPage)) {
                // Manter apenas por segurança, não remover
                // style.remove();
            }
        });
    }
    
    reapplyScripts(page) {
        // Reaplicar listeners comuns
        this.reapplyCommonListeners();
        
        // Reaplicar scripts específicos da página
        switch(page) {
            case 'dashboard':
                this.initDashboardScripts();
                break;
            case 'accounts':
                this.initAccountsScripts();
                break;
            case 'transactions':
                this.initTransactionsScripts();
                break;
            case 'reports':
                this.initReportsScripts();
                break;
            case 'settings':
                this.initSettingsScripts();
                break;
        }
    }
    
    reapplyCommonListeners() {
        // Logout button
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja sair?')) {
                    alert('Você foi desconectado com sucesso!');
                }
            });
        }
        
        // Menu mobile
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.overlay');
        
        if (menuToggle && sidebar && overlay) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
            });
            
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
        }
    }
    
    initDashboardScripts() {
        console.log('Dashboard scripts initialized');
        // Adicione aqui scripts específicos do Dashboard
    }
    
    initAccountsScripts() {
        console.log('Accounts scripts initialized');
        // Adicione aqui scripts específicos de Contas
    }
    
    initTransactionsScripts() {
        console.log('Transactions scripts initialized');
        // Adicione aqui scripts específicos de Transações
    }
    
    initReportsScripts() {
        console.log('Reports scripts initialized');
        // Adicione aqui scripts específicos de Relatórios
    }
    
    initSettingsScripts() {
        console.log('Settings scripts initialized');
        // Adicione aqui scripts específicos de Configurações
    }
    
    updateActiveMenu(page) {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === page) {
                item.classList.add('active');
            }
        });
    }
    
    showLoading() {
        let loader = document.getElementById('page-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'page-loader';
            loader.innerHTML = `
                <div class="loading-overlay">
                    <div class="loading-spinner"></div>
                    <p>Carregando...</p>
                </div>
            `;
            document.body.appendChild(loader);
        }
        loader.style.display = 'flex';
    }
    
    hideLoading() {
        const loader = document.getElementById('page-loader');
        if (loader) loader.style.display = 'none';
    }
}

// Inicializar navegação
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new NavigationSystem();
});