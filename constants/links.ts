export const portalURI = '/portal';
export const LINKS = {
  dashboard: {
    route: `${portalURI}/dashboard`,
  },
  register: {
    route: '/auth/sign-up',
  },
  forgotPassword: {
    route: '/auth/forgot-password',
  },
  login: {
    route: `/auth/signin`,
  },
  admins: {
    route: `${portalURI}/admins`,
    add: `${portalURI}/admins/add`,
    edit: (param: string) => `${portalURI}/admins/edit/${param}`,
    trash: `${portalURI}/admins/trash`,
  },
  roles: {
    route: `${portalURI}/roles`,
    add: `${portalURI}/roles/add`,
    edit: (param: string) => `${portalURI}/roles/edit/${param}`,
  },
  courseCategory: {
    route: `${portalURI}/course-category`,
    add: `${portalURI}/course-category/add`,
    edit: (param: string) => `${portalURI}/course-category/edit/${param}`,
    trash: `${portalURI}/course-category/trash`,
  },
  performance: {
    route: `${portalURI}/performance`,
    report: {
      route: `${portalURI}/performance/report`,
    },
  },
  diagnostic: {
    route: `${portalURI}/diagnostic-test`,
  },
  preparatory: {
    route: `${portalURI}/preparatory-test`,
    create: `${portalURI}/preparatory-test/create-test`,
  },
  contacts: {
    route: `${portalURI}/contacts`,
    view: (param: string) => `${portalURI}/contacts/view/${param}`,
  },
  courses: {
    route: `${portalURI}/courses`,
    add: `${portalURI}/courses/add`,
    edit: (param: string) => `${portalURI}/courses/edit/${param}`,
    trash: '${portalURI}/courses/trash',
  },

  questions: {
    route: `${portalURI}/questions`,
    add: `${portalURI}/questions/add`,
    edit: (param: string) => `${portalURI}/questions/edit/${param}`,
    trash: `${portalURI}/questions/trash`,
  },

  courseDiagnostic: {
    route: (param: string) => `${portalURI}/diagnostic/${param}`,
  },

  plans: {
    route: (param: string) => `${portalURI}/plans/${param}`,
    add: (param: string) => `${portalURI}/plans/add/${param}`,
    edit: (param: string, param2: string) =>
      `${portalURI}/plans/edit/${param}/${param2}`,
    trash: `${portalURI}/plans/trash`,
  },

  subjects: {
    route: `${portalURI}/subjects`,
    add: `${portalURI}/subjects/add`,
    edit: (param: string) => `${portalURI}/subjects/edit/${param}`,
    topic: (param: string) => `${portalURI}/subjects/topics/${param}`,
    trash: `${portalURI}/subjects/trash`,
  },
  users: {
    route: `${portalURI}/users`,
    add: `${portalURI}/users/add`,
    edit: (param: string) => `${portalURI}/users/edit/${param}`,
  },
  permissions: {
    route: `${portalURI}/permissions`,
    add: `${portalURI}/permissions/add`,
    edit: (param: string) => `${portalURI}/permissions/edit/${param}`,
    view: (param: string) => `${portalURI}/permissions/view/${param}`,
  },
};
