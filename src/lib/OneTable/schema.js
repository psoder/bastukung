export default schema = {
  version: "0.0.1",
  indexes: {
    primary: { hash: "pk", sort: "sk" },
    gs1: { hash: "gs1pk", sort: "gs1sk", project: ["gs1pk", "gs1sk"] },
  },
  models: {
    Users: {
        
    }
  }
};
