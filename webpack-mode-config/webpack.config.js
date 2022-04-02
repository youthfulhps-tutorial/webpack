module.exports = (env) => {
  let entryPath =
    env.mode === "production" ? "./public/index.js" : "./src/index.js";

  return {
    entry: entryPath,
    output: {},
  };
};