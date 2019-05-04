const credentialsJson = require("./googleImagesCredentials.json").web;

let config = {};

config.PORT = process.env.PORT || 3000;

config.client_id = credentialsJson["client_id"];
config.project_id = credentialsJson["project_id"];
config.auth_uri = credentialsJson["auth_uri"];
config.token_uri = credentialsJson["token_uri"];
config.auth_provider_x509_cert_url = credentialsJson["auth_provider_x509_cert_url"];
config.client_secret = credentialsJson["client_secret"];
config.auth_callback_url = credentialsJson["auth_callback_url"];

config.google_photos_album_url = `https://photoslibrary.googleapis.com/v1/albums`
config.google_photos_auth_scope = `https://www.googleapis.com/auth/photoslibrary.readonly`

module.exports = config;
