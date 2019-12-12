const getters = {
  token: (state) => state.user.token,
  userId: (state) => state.user.userId,
  userName: (state) => state.user.userName,
  roles: (state) => state.user.roleId,
  permissions: (state) => state.user.permissions,
  addRouters: (state) => state.asynRoutes.addRouters,
  routers: (state) => state.asynRoutes.routers,
  visitedViews: (state) => state.tagView.visitedViews,
  cachedViews: (state) => state.tagView.cachedViews,
  isCollapse: (state) => state.app.isCollapse
}
export default getters
