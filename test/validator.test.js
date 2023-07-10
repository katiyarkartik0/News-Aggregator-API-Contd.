process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const preferencesConstrains = require("../src/helpers/constants");
const { Validator } = require("../src/helpers/validator");

const preference1 = "health, technology";
const preference2 = ["health", "technology"];
const preference3 = [];
const preference4 = {};
const preference5 = { health: "health" };
const preference6 = ["health", "cartoons", "politics", "entertainment"];

describe("filtering out valid preference", () => {
  const obj = new Validator();
  it('test preference1 = "health, technology"', () => {
    const response = obj.filterOutValidPreferences(preference1);
    expect(response).to.include({
      error: true,
      msg: `please provide at least one valid preference chosing from ${preferencesConstrains} packed in an array of strings`,
    });
  });
  it('test preference2 = ["health", "technology"]', () => {
    const response = obj.filterOutValidPreferences(preference2);
    expect(response).to.include({
      error: false,
      msg: `preferences has been updated successfully`,
    });
    expect(response).to.have.property("filteredPrefenceList");
    expect(response.filteredPrefenceList).to.have.members([
      "health",
      "technology",
    ]);
  });
  it("test preference3 = []", () => {
    const response = obj.filterOutValidPreferences(preference3);
    expect(response).to.include({
      error: true,
      msg: `please provide at least one valid preference chosing from ${preferencesConstrains} packed in an array of strings`,
    });
  });
  it("test preference4 = {}", () => {
    const response = obj.filterOutValidPreferences(preference4);
    expect(response).to.include({
      error: true,
      msg: `please provide at least one valid preference chosing from ${preferencesConstrains} packed in an array of strings`,
    });
  });
  it('test preference5 = { health: "health" }', () => {
    const response = obj.filterOutValidPreferences(preference5);
    expect(response).to.include({
      error: true,
      msg: `please provide at least one valid preference chosing from ${preferencesConstrains} packed in an array of strings`,
    });
  });
  it('test preference6 = ["health", "cartoons", "politics", "entertainment"]', () => {
    const response = obj.filterOutValidPreferences(preference6);
    expect(response).to.include({
      error: false,
      msg: `valid preferences has been filtered out of incoming preference list chosing from ${preferencesConstrains}`,
    });
    expect(response).to.have.property("filteredPrefenceList");
    expect(response.filteredPrefenceList).to.have.members([
      "health",
      "entertainment",
    ]);
  });
});
