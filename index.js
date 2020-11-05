"use strict";

// Libraries
const { GitHubProfileStatus } = require("github-profile-status");
const fetch = require("node-fetch");

// Variables
var config = require("./data/config");

setInterval(async () => {
    const githubProfile = new GitHubProfileStatus({
        token: config.github.apiKey
    });

    const body = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${config.lastFm.username}&api_key=${config.lastFm.apiKey}&limit=1&format=json`, { method: "GET", }).then((body) => body.json()).then((body) => body.recenttracks.track);

    if (!body || body.length < 1)
        return;

    var spotify = body[0];

    if (spotify["@attr"].nowplaying) {
        await githubProfile.set({
            emoji: ":musical_note:",
            message: `${spotify.name} - ${spotify.artist["#text"]}`,
        });
    }
}, 1000 * 15);