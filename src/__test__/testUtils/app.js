const supertest = require('supertest');

const appDef = require("../..");
const generateAuthToken = require("../../utils/generateAuthToken");
const { createAdmin } = require('./modelFactories');

const app = {

    token: null,

    /**
     * Login a user by passing an existing user object.
     *
     * @param user
     * @returns {Promise<void>}
     */
    async login(user) {
        this.token = await generateAuthToken(user);
    },

    /**
     * Login a randomly generated user
     *
     * @returns {Promise<void>}
     */
    async loginRandom() {
        const user = await createAdmin();
        this.token = await generateAuthToken(user);
        return user;
    },

    /**
     * Call this method to logout the currently logged in user.
     */
    async logout() {
        this.token = null;
    },

    req: supertest(appDef),

    /**
     * Add authorization header to the specified supertest request object.
     * @param request
     * @returns {*}
     */
    addAuthorization(request) {
        return this.token ? request.set('authorization', `Bearer ${this.token}`) : request;
    },

    /**
     * Make a get request with the authorization header (token) set if a user is
     * logged in.
     *
     * @param url
     * @returns {*}
     */
    get(url) {
        const request = this.req.get(url);

        return this.addAuthorization(request);
    },

    /**
     * Make a post request with the authorization header (token) set if a user is
     * logged in.
     *
     * @param url
     * @returns {*}
     */
    post(url) {
        const request = this.req.post(url);

        return this.addAuthorization(request);
    },
};

module.exports = {
    app
};
