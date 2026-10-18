export default {
  middleware: [
    async (context, next) => {
      if (context.path === '/') {
        context.redirect('/demo/');
        return;
      }
      await next();
    },
  ],
};
