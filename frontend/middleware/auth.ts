export default defineNuxtRouteMiddleware((to, from) => {
    if(process.server) return

    console.log(to.meta)

    const token = localStorage.getItem("token");

    if (!token) {
      return navigateTo("/");
    }
  
    try {
      const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload (simplified for demo)
      const userRole = user.role;
      
      if (to.meta.requiresAdmin && userRole !== "ADMIN") {
        console.log("Unauthorized: Admin access required");
        return navigateTo("/unauthorized");
      }

      if (to.meta.requiresUser && userRole !== "USER") {
        console.log("Unauthorized: User access required");
        return navigateTo("/unauthorized");
      }

    } catch (error) {
      console.error("Invalid token or unable to decode:", error);
      return navigateTo("/");
    }
  });
  