const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/cadastro",
    component: () => import("layouts/CadastroLayout.vue"),
    children: [{ path: "", component: () => import("pages/CadastroPage.vue") }],
  },

  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },

  {
    path: "/consulta",
    component: () => import("layouts/ConsultaLayout.vue"),
    children: [{ path: "", component: () => import("pages/ConsultaPage.vue") }],
  },

  {
    path: "/medicos",
    component: () => import("layouts/MedicoLayout.vue"),
    children: [{ path: "", component: () => import("pages/MedicoPage.vue") }],
  },

  {
    path: "/pacientes",
    component: () => import("layouts/PacienteLayout.vue"),
    children: [{ path: "", component: () => import("pages/PacientePage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
