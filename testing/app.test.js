const axios = require("axios");
const apigee = require("../config/apigeeProxy.json")

describe("Auth functional tests", () => {

    describe("when we log in and then check the token and then logout", () => {

        let token;

        beforeEach(async () => {
            const login = await axios.post(`${apigee.url}/login`, {
                "email": "1258@gmail.com",
                "password": "ehhwetj651he"
            });
            const { accessToken } = login.data;
            token = accessToken;
        })

        it("should successful login, token verification, logout with status code 200", async () => {
            const check = await axios.get(`${apigee.url}/check`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            expect(check.data.message).toEqual("true");

        })

        afterEach(async () => {
            await axios.post(`${apigee.url}/logout`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        });
    });

    describe("when we trying to registration new user", () => {
        it("should respond error with a status code 400", async () => {
            await axios.post(`${apigee.url}/registration`)
                .catch((e) => {
                    expect(e.response.data.status).toBe(400);
                    expect(e.response.data.error).toEqual("Bad request");
                });
        })
        it("should respond bad request with a status code 400", async () => {
            await axios.post(`${apigee.url}/registration`, {
                "email": "1258@4214il.com",
                "password": "ehhwetj651he",
                "name": "Genadiy"
            })
                .catch((e) => {
                    expect(e.response.data.status).toBe(400);
                    expect(e.response.data.info.message).toEqual("user with this email already exist");
                });
        });
    });

    describe("when we trying to login", () => {
        it("should respond error with a status code 400", async () => {
            await axios.post(`${apigee.url}/login`, {
                "email": "1258@gmasasdil.com",
                "password": "ehhwetj651he"
            })
                .catch((e) => {
                    expect(e.response.data.status).toBe(400);
                    expect(e.response.data.info.message).toEqual("this email does not exist");
                });
        });

        it("should respond with a status code 200", async () => {
            const result = await axios.post(`${apigee.url}/login`, {
                "email": "1258@gmail.com",
                "password": "ehhwetj651he"
            });

            expect(result.status).toBe(200);
        });
    });

    describe("when we trying to logout", () => {
        it("should respond error with a status code 401", async () => {
            await axios.post(`${apigee.url}/logout`)
                .catch((e) => {
                    expect(e.response.data.status).toBe(401);
                });
        });
    });

    describe("when we trying to refresh", () => {
        it("should respond error with a status code 400", async () => {
            await axios.get(`${apigee.url}/refresh`)
                .catch((e) => {
                    expect(e.response.data.status).toBe(400);
                });
        });
    });

    describe("when we trying to check token", () => {
        it("should respond with a status code 200", async () => {
            const result = await axios.get(`${apigee.url}/check`, {
                headers: {
                    Authorization: `Bearer ${apigee.accessToken}`,
                },
            });

            expect(result.data.message).toEqual("false");
        });

        it("should respond with a status code 401", async () => {
            await axios.get(`${apigee.url}/check`)
                .catch((e) => {
                    expect(e.response.data.status).toBe(401);
                });
        });
    });
});