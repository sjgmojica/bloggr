module.exports = {
log: {
  level: "silent"
},
session: {
  adapter: "memory"
},
connections: {
  master: {
    adapter: "sails-memory"
  }
},
models: {
  migrate: "safe"
}
};