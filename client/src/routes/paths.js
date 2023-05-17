// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    database: path(ROOTS_DASHBOARD, '/database'),
    jobs: path(ROOTS_DASHBOARD, '/jobs'),
    candidates: path(ROOTS_DASHBOARD, '/candidates'),

  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  candidate: {
    root: path(ROOTS_DASHBOARD, '/candidate'),
    new: path(ROOTS_DASHBOARD, '/candidate/new-candidate'),
    list: path(ROOTS_DASHBOARD, '/candidate/list'),
    cards: path(ROOTS_DASHBOARD, '/candidate/cards'),
    profile: path(ROOTS_DASHBOARD, '/candidate/profile'),
    account: path(ROOTS_DASHBOARD, '/candidate/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/candidate/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/candidate/reece-chung/edit`),
  },

  jobs: {
    root: path(ROOTS_DASHBOARD, '/jobs'),
    new: path(ROOTS_DASHBOARD, '/jobs/new-job'),
    jobDetail: path(ROOTS_DASHBOARD, `/jobs/[title]/job-detail`),
    cards: path(ROOTS_DASHBOARD, '/candidate/cards'),
    profile: path(ROOTS_DASHBOARD, '/candidate/profile'),
    account: path(ROOTS_DASHBOARD, '/candidate/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/candidate/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/candidate/reece-chung/edit`),
  },
  
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

