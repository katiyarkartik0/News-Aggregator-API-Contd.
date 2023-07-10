process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const {
  getPreferencesListOfUser,
  getUserByUserId,
} = require("../src/helpers/helpersFunctions");

const preferences = (userId) => {
  const { user, error, msg } = getUserByUserId(userId);
  if (error) {
    return { preferencesList: null, error: true, msg };
  }
  return {
    preferencesList: user.preferences,
    error: false,
    msg: "preference list of user found corresponding to userId",
  };
};

describe("Get preference list of user by getPreferenceListOfUser() function", () => {
  it("should return preferences of user with userId 21", () => {
    const { preferencesList, error } = getPreferencesListOfUser("21");
    const {
      preferencesList: testPreferenceList,
      error: testPreferenceListError,
    } = preferences("21");
    if (error) {
      expect(error).to.be.equal(testPreferenceListError);
    } else {
      expect(preferencesList).to.have.members(testPreferenceList);
    }
  });
  it("should return preferences of user with userId 70b522e2-f963-48b3-8076-d8b40b75adbe", () => {
    const { preferencesList, error } = getPreferencesListOfUser(
      "70b522e2-f963-48b3-8076-d8b40b75adbe"
    );
    const {
      preferencesList: testPreferenceList,
      error: testPreferenceListError,
    } = preferences("70b522e2-f963-48b3-8076-d8b40b75adbe");
    if (error) {
      expect(error).to.be.equal(testPreferenceListError);
    } else {
      expect(preferencesList).to.have.members(testPreferenceList);
    }
  });
  it("should return preferences of user with userId 710be743-d5f2-4bc0-95bb-7451687ac560", () => {
    const { preferencesList, error } = getPreferencesListOfUser("710be743-d5f2-4bc0-95bb-7451687ac560");
    const {
      preferencesList: testPreferenceList,
      error: testPreferenceListError,
    } = preferences("710be743-d5f2-4bc0-95bb-7451687ac560");
    if (error) {
      expect(error).to.be.equal(testPreferenceListError);
    } else {
      expect(preferencesList).to.have.members(testPreferenceList);
    }
  });
});
