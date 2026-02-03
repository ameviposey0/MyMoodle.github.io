(function () {
  'use strict';

  const STORAGE_KEY = 'mymoodle_user_id';

  const loginPage = document.getElementById('login-page');
  const dashboardPage = document.getElementById('dashboard-page');
  const loginForm = document.getElementById('login-form');
  const userIdInput = document.getElementById('user-id');
  const currentUserBadge = document.getElementById('current-user');
  const welcomeName = document.getElementById('welcome-name');
  const logoutBtn = document.getElementById('logout-btn');

  const statCourses = document.getElementById('stat-courses');
  const statProgress = document.getElementById('stat-progress');
  const statBadges = document.getElementById('stat-badges');

  /**
   * Affiche la page de connexion et masque le tableau de bord.
   */
  function showLoginPage() {
    loginPage.classList.add('active');
    dashboardPage.classList.remove('active');
    if (userIdInput) userIdInput.value = '';
  }

  /**
   * Affiche le tableau de bord et met à jour l'affichage avec l'ID utilisateur.
   * @param {string} userId - Identifiant statique de l'utilisateur
   */
  function showDashboard(userId) {
    if (!userId || typeof userId !== 'string') return;

    const id = userId.trim();
    if (!id) return;

    loginPage.classList.remove('active');
    dashboardPage.classList.add('active');

    if (currentUserBadge) currentUserBadge.textContent = id;
    if (welcomeName) welcomeName.textContent = id;

    // Données factices pour la démo (on pourrait les varier selon l'ID)
    if (statCourses) statCourses.textContent = '3';
    if (statProgress) statProgress.textContent = '12';
    if (statBadges) statBadges.textContent = '1';

    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (e) {
      console.warn('localStorage non disponible', e);
    }
  }

  /**
   * Vérifie si un utilisateur est déjà "connecté" (ID en session/localStorage)
   * et redirige vers le tableau de bord si oui.
   */
  function checkStoredUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored.trim()) {
        showDashboard(stored.trim());
        return true;
      }
    } catch (e) {
      console.warn('localStorage non disponible', e);
    }
    return false;
  }

  // Soumission du formulaire : ID statique → tableau de bord
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const id = userIdInput && userIdInput.value ? userIdInput.value.trim() : '';
      if (id) {
        showDashboard(id);
      }
    });
  }

  // Déconnexion : efface l'ID et revient à la page d'accès
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn('localStorage non disponible', e);
      }
      showLoginPage();
    });
  }

  // Au chargement : si un ID est déjà stocké, afficher directement le tableau de bord
  if (!checkStoredUser()) {
    showLoginPage();
  }
})();
