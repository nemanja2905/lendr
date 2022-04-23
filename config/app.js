const _ = require("lodash");

const isProduction = _.get(process, "env.NODE_ENV", false) === "production";

const appConfig = true
  ? {
      secret: "lolwutisthisevenidklololol1606",
      dwollaKey: "Xp33SHQi9yyQPhDep8ZES3K3L15QFQme1hRoPezC41yArsZ2zx", // sandbox
      dwollaSecret: "3btNtWpbPTktwtBpgFBJ4KuqC27w4TiYjMUCxNbtmaWFWV2Wfb", // sandbox
      dwollaEnvironment: "sandbox",
      dwollaOauthUrl: "https://sandbox.dwolla.com/oauth/v2/token",
      roscoDwollaId: "3ae33c7b-27e7-41b4-ba1f-20d8ed1d7778",
    }
  : // set this up later with proper env vars
    {
      secret: "lolwutisthisevenidklololol1606",
      dwollaKey: "",
      dwollaSecret: "",
      dwollaEnvironment: "",
      dwollaOauthUrl: "https://www.dwolla.com/oauth/v2/token",
      roscoDwollaId: "3ae33c7b-27e7-41b4-ba1f-20d8ed1d7778",
    };

module.exports = appConfig;
