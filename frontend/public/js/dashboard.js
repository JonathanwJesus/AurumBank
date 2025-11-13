document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');
  const overlay = document.querySelector('.overlay');

  // Abrir/fechar menu no mobile
  menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', function() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Navegação entre seções
  const menuItems = document.querySelectorAll('.menu-item');
  const sections = document.querySelectorAll('.dashboard-section');

  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      menuItems.forEach(i => i.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      this.classList.add('active');
      const sectionId = this.getAttribute('data-section');
      const section = document.getElementById(sectionId);
      if (section) section.classList.add('active');

      document.querySelector('.header h2').textContent = this.querySelector('span:last-child').textContent;

      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
      }
    });
  });

  // Logout
  const logoutBtn = document.querySelector('.logout-btn');
  logoutBtn.addEventListener('click', function() {
    if (confirm('Tem certeza que deseja sair?')) {
      alert('Você foi desconectado com sucesso!');
    }
  });

  // Responsividade
  function handleResize() {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  }
  window.addEventListener('resize', handleResize);
});