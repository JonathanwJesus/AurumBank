// ===== Máscara de CPF =====
const cpfInput = document.querySelector("#cpf");

cpfInput.addEventListener("input", () => {
  let cpf = cpfInput.value.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  cpfInput.value = cpf;
});

// ===== Mostrar/Ocultar Senha =====
const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");
const iconOlho = document.getElementById("iconOlho");
const iconOlhoCortado = document.getElementById("iconOlhoCortado");

toggleSenha.addEventListener("click", () => {
  const tipo = senhaInput.type === "password" ? "text" : "password";
  senhaInput.type = tipo;

  // alterna os ícones SVG (sem emojis)
  if (tipo === "password") {
    iconOlho.style.display = "block";
    iconOlhoCortado.style.display = "none";
  } else {
    iconOlho.style.display = "none";
    iconOlhoCortado.style.display = "block";
  }
});

// ===== Validação =====
document.querySelector("#loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const cpf = document.querySelector("#cpf");
  const senha = document.querySelector("#senha");
  let valido = true;

  const validarCampo = (input, condicao) => {
    if (!condicao) {
      input.classList.add("invalid");
      valido = false;
    } else {
      input.classList.remove("invalid");
    }
  };

  validarCampo(cpf, /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf.value));
  validarCampo(senha, senha.value.trim().length >= 6);

  if (valido) {
    alert("Login efetuado com sucesso!");
    e.target.reset();
  }
});

/*-----------------------------------SCRIPT CONTA.HTML------------------------------------*/

        document.addEventListener('DOMContentLoaded', function() {
            // Menu toggle functionality
            const menuToggle = document.querySelector('.menu-toggle');
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            const overlay = document.querySelector('.overlay');
            
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
            });
            
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
            
            // Menu navigation
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Remove active class from all menu items
                    menuItems.forEach(i => i.classList.remove('active'));
                    
                    // Add active class to clicked menu item
                    this.classList.add('active');
                    
                    // In a real application, you would navigate to the selected page
                    const page = this.getAttribute('data-page');
                    if (page !== 'accounts') {
                        alert(`Navegando para a página: ${page}`);
                        // window.location.href = `${page}.html`;
                    }
                    
                    // Close sidebar on mobile after selection
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('active');
                        overlay.classList.remove('active');
                    }
                });
            });
            
            // Logout button functionality
            const logoutBtn = document.querySelector('.logout-btn');
            
            logoutBtn.addEventListener('click', function() {
                if (confirm('Tem certeza que deseja sair?')) {
                    alert('Você foi desconectado com sucesso!');
                    // In a real application, you would redirect to login page
                    // window.location.href = 'login.html';
                }
            });
            
            // Modal functionality
            const modal = document.getElementById('account-modal');
            const btnNovaConta = document.getElementById('btn-nova-conta');
            const closeModal = document.querySelector('.close-modal');
            const btnCancel = document.querySelector('.btn-cancel');
            const accountForm = document.getElementById('account-form');
            const modalTitle = document.getElementById('modal-title');
            
            // Open modal for new account
            btnNovaConta.addEventListener('click', function() {
                modalTitle.textContent = 'Nova Conta';
                accountForm.reset();
                document.getElementById('account-id').value = '';
                modal.classList.add('active');
            });
            
            // Close modal
            function closeAccountModal() {
                modal.classList.remove('active');
            }
            
            closeModal.addEventListener('click', closeAccountModal);
            btnCancel.addEventListener('click', closeAccountModal);
            
            // Edit account buttons
            const editButtons = document.querySelectorAll('.btn-edit');
            
            editButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const accountId = this.getAttribute('data-id');
                    const accountCard = this.closest('.account-card');
                    
                    // In a real app, you would fetch account data from an API
                    // For demo purposes, we'll use the data from the card
                    modalTitle.textContent = 'Editar Conta';
                    document.getElementById('account-id').value = accountId;
                    document.getElementById('account-name').value = accountCard.querySelector('h3').textContent;
                    
                    // Extract balance (remove R$ and commas)
                    const balanceText = accountCard.querySelector('.balance-amount').textContent;
                    const balanceValue = balanceText.replace('R$', '').replace('.', '').replace(',', '.').trim();
                    document.getElementById('account-balance').value = parseFloat(balanceValue);
                    
                    // Set account type and bank from data attributes
                    document.getElementById('account-type').value = accountCard.getAttribute('data-type');
                    document.getElementById('account-bank').value = accountCard.getAttribute('data-bank');
                    
                    modal.classList.add('active');
                });
            });
            
            // Delete account buttons
            const deleteButtons = document.querySelectorAll('.btn-delete');
            
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const accountId = this.getAttribute('data-id');
                    const accountName = this.closest('.account-card').querySelector('h3').textContent;
                    
                    if (confirm(`Tem certeza que deseja excluir a conta "${accountName}"?`)) {
                        // In a real app, you would send a DELETE request to an API
                        showNotification(`Conta "${accountName}" excluída com sucesso!`, 'success');
                        
                        // For demo purposes, we'll just remove the card from the DOM
                        this.closest('.account-card').style.opacity = '0';
                        setTimeout(() => {
                            this.closest('.account-card').remove();
                            checkEmptyState();
                        }, 300);
                    }
                });
            });
            
            // Form submission
            accountForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const accountId = document.getElementById('account-id').value;
                const accountName = document.getElementById('account-name').value;
                const accountType = document.getElementById('account-type').value;
                const accountBank = document.getElementById('account-bank').value;
                const accountBalance = document.getElementById('account-balance').value;
                
                // In a real app, you would send this data to an API
                if (accountId) {
                    // Update existing account
                    showNotification(`Conta "${accountName}" atualizada com sucesso!`, 'success');
                } else {
                    // Create new account
                    showNotification(`Conta "${accountName}" criada com sucesso!`, 'success');
                }
                
                closeAccountModal();
            });
            
            // Search and filter functionality
            const searchInput = document.getElementById('search-accounts');
            const filterType = document.getElementById('filter-type');
            const filterBank = document.getElementById('filter-bank');
            const accountsContainer = document.getElementById('accounts-container');
            const emptyState = document.getElementById('empty-state');
            const btnResetFilters = document.getElementById('btn-reset-filters');
            
            function filterAccounts() {
                const searchTerm = searchInput.value.toLowerCase();
                const typeFilter = filterType.value;
                const bankFilter = filterBank.value;
                
                const accountCards = accountsContainer.querySelectorAll('.account-card');
                let visibleCount = 0;
                
                accountCards.forEach(card => {
                    const accountName = card.querySelector('h3').textContent.toLowerCase();
                    const accountType = card.getAttribute('data-type');
                    const accountBank = card.getAttribute('data-bank');
                    
                    const matchesSearch = accountName.includes(searchTerm);
                    const matchesType = !typeFilter || accountType === typeFilter;
                    const matchesBank = !bankFilter || accountBank === bankFilter;
                    
                    if (matchesSearch && matchesType && matchesBank) {
                        card.style.display = 'block';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                checkEmptyState(visibleCount);
            }
            
            function checkEmptyState(visibleCount) {
                const accountCards = accountsContainer.querySelectorAll('.account-card');
                const actualVisibleCount = visibleCount !== undefined ? 
                    visibleCount : 
                    Array.from(accountCards).filter(card => card.style.display !== 'none').length;
                
                if (actualVisibleCount === 0) {
                    emptyState.style.display = 'block';
                    accountsContainer.style.display = 'none';
                } else {
                    emptyState.style.display = 'none';
                    accountsContainer.style.display = 'grid';
                }
            }
            
            searchInput.addEventListener('input', filterAccounts);
            filterType.addEventListener('change', filterAccounts);
            filterBank.addEventListener('change', filterAccounts);
            
            btnResetFilters.addEventListener('click', function() {
                searchInput.value = '';
                filterType.value = '';
                filterBank.value = '';
                filterAccounts();
            });
            
            // Notification function
            function showNotification(message, type) {
                const notification = document.getElementById('notification');
                notification.textContent = message;
                notification.className = `notification ${type} show`;
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }
            
            // Responsive adjustments
            function handleResize() {
                if (window.innerWidth > 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                }
            }
            window.addEventListener('resize', handleResize);
        });
/*------------------------ FINAL DO SCRIPT DA CONTA.HTML -------------------------*/

/*------------------------ SCRIPT PAGE DE TRANSAÇÕES ---------------------------*/
        document.addEventListener('DOMContentLoaded', function() {
            // Menu toggle functionality
            const menuToggle = document.querySelector('.menu-toggle');
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            const overlay = document.querySelector('.overlay');
            
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
            });
            
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
            
            // Menu navigation
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Remove active class from all menu items
                    menuItems.forEach(i => i.classList.remove('active'));
                    
                    // Add active class to clicked menu item
                    this.classList.add('active');
                    
                    // In a real application, you would navigate to the selected page
                    const page = this.getAttribute('data-page');
                    if (page !== 'transactions') {
                        alert(`Navegando para a página: ${page}`);
                        // window.location.href = `${page}.html`;
                    }
                    
                    // Close sidebar on mobile after selection
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('active');
                        overlay.classList.remove('active');
                    }
                });
            });
            
            // Logout button functionality
            const logoutBtn = document.querySelector('.logout-btn');
            
            logoutBtn.addEventListener('click', function() {
                if (confirm('Tem certeza que deseja sair?')) {
                    alert('Você foi desconectado com sucesso!');
                    // In a real application, you would redirect to login page
                    // window.location.href = 'login.html';
                }
            });
            
            // Table sorting functionality
            const tableHeaders = document.querySelectorAll('th.sortable');
            let currentSort = { column: 'date', direction: 'asc' };
            
            tableHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const column = this.getAttribute('data-sort');
                    
                    // Remove previous sort indicators
                    tableHeaders.forEach(h => {
                        h.classList.remove('sorted-asc', 'sorted-desc');
                    });
                    
                    // Toggle sort direction if same column
                    if (currentSort.column === column) {
                        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
                    } else {
                        currentSort.column = column;
                        currentSort.direction = 'asc';
                    }
                    
                    // Add sort indicator
                    this.classList.add(currentSort.direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
                    
                    // Sort table
                    sortTable(column, currentSort.direction);
                    showNotification(`Tabela ordenada por ${getColumnName(column)} (${currentSort.direction === 'asc' ? 'crescente' : 'decrescente'})`, 'info');
                });
            });
            
            function sortTable(column, direction) {
                const table = document.getElementById('transactions-table');
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                rows.sort((a, b) => {
                    const aValue = a.cells[getColumnIndex(column)].textContent;
                    const bValue = b.cells[getColumnIndex(column)].textContent;
                    
                    let comparison = 0;
                    
                    if (column === 'amount') {
                        // Sort by numeric value for amounts
                        const aNum = parseFloat(aValue.replace('R$', '').replace('.', '').replace(',', '.').replace('+', '').replace('-', ''));
                        const bNum = parseFloat(bValue.replace('R$', '').replace('.', '').replace(',', '.').replace('+', '').replace('-', ''));
                        
                        // Consider negative values for expenses
                        const aIsNegative = aValue.includes('-');
                        const bIsNegative = bValue.includes('-');
                        
                        const aFinal = aIsNegative ? -aNum : aNum;
                        const bFinal = bIsNegative ? -bNum : bNum;
                        
                        comparison = aFinal - bFinal;
                    } else if (column === 'date') {
                        // Sort by date
                        const [aDay, aMonth, aYear] = aValue.split('/');
                        const [bDay, bMonth, bYear] = bValue.split('/');
                        const aDate = new Date(aYear, aMonth - 1, aDay);
                        const bDate = new Date(bYear, bMonth - 1, bDay);
                        comparison = aDate - bDate;
                    } else {
                        // Sort by text
                        comparison = aValue.localeCompare(bValue);
                    }
                    
                    return direction === 'asc' ? comparison : -comparison;
                });
                
                // Remove existing rows
                while (tbody.firstChild) {
                    tbody.removeChild(tbody.firstChild);
                }
                
                // Add sorted rows
                rows.forEach(row => tbody.appendChild(row));
            }
            
            function getColumnIndex(column) {
                const headers = document.querySelectorAll('th');
                for (let i = 0; i < headers.length; i++) {
                    if (headers[i].getAttribute('data-sort') === column) {
                        return i;
                    }
                }
                return 0;
            }
            
            function getColumnName(column) {
                const names = {
                    'date': 'Data',
                    'description': 'Descrição',
                    'category': 'Categoria',
                    'type': 'Tipo',
                    'amount': 'Valor',
                    'account': 'Conta'
                };
                return names[column] || column;
            }
            
            // Search and filter functionality
            const searchInput = document.getElementById('search-transactions');
            const periodFilter = document.getElementById('period-filter');
            const categoryFilter = document.getElementById('category-filter');
            const typeFilter = document.getElementById('type-filter');
            const transactionsBody = document.getElementById('transactions-body');
            const emptyState = document.getElementById('empty-state');
            
            function filterTransactions() {
                const searchTerm = searchInput.value.toLowerCase();
                const periodValue = periodFilter.value;
                const categoryValue = categoryFilter.value;
                const typeValue = typeFilter.value;
                
                const transactions = transactionsBody.querySelectorAll('tr');
                let visibleCount = 0;
                
                transactions.forEach(transaction => {
                    const description = transaction.cells[1].textContent.toLowerCase();
                    const category = transaction.cells[2].textContent.toLowerCase();
                    const type = transaction.cells[3].textContent.toLowerCase();
                    
                    const matchesSearch = description.includes(searchTerm);
                    const matchesCategory = !categoryValue || category.includes(categoryValue);
                    const matchesType = !typeValue || 
                        (typeValue === 'receita' && type.includes('receita')) ||
                        (typeValue === 'despesa' && type.includes('despesa'));
                    
                    if (matchesSearch && matchesCategory && matchesType) {
                        transaction.style.display = '';
                        visibleCount++;
                    } else {
                        transaction.style.display = 'none';
                    }
                });
                
                checkEmptyState(visibleCount);
            }
            
            function checkEmptyState(visibleCount) {
                const transactions = transactionsBody.querySelectorAll('tr');
                const actualVisibleCount = visibleCount !== undefined ? 
                    visibleCount : 
                    Array.from(transactions).filter(tr => tr.style.display !== 'none').length;
                
                if (actualVisibleCount === 0) {
                    emptyState.style.display = 'block';
                    document.querySelector('.table-container').style.display = 'none';
                } else {
                    emptyState.style.display = 'none';
                    document.querySelector('.table-container').style.display = 'block';
                }
            }
            
            searchInput.addEventListener('input', filterTransactions);
            periodFilter.addEventListener('change', filterTransactions);
            categoryFilter.addEventListener('change', filterTransactions);
            typeFilter.addEventListener('change', filterTransactions);
            
            // Notification function
            function showNotification(message, type) {
                const notification = document.getElementById('notification');
                notification.textContent = message;
                notification.className = `notification ${type} show`;
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }
            
            // Responsive adjustments
            function handleResize() {
                if (window.innerWidth > 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                }
            }
            
            window.addEventListener('resize', handleResize);
        });
  