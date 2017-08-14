/**
 * Gets an Access Token from the token endpoint URI using the given Client ID and Client Secret.
 */
function requestAccessToken(hostUrl, tokenEndpointPath, clientId, clientSecret, scope, callback) {
    var encodedClientCredentials = encodeClientCredentials(clientId, clientSecret);

    // Set the post options
    var settings = {
        "async": true,        
        "url": tokenEndpointPath,
        "method": "POST",
        "contentType": "application/x-www-form-urlencoded",
        "headers": {
            "authorization": "Basic " + encodedClientCredentials,
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "scope": scope,
            "grant_type": "client_credentials"
        }
    };

    // Set the post request
    $.ajax(settings).done(function (response) {
        var token = response.access_token;
        console.log("Token: " + token);
        callback(token);
    });
}

/**
 * Returns the access token's decoded Header and Claims.
 */
function decodeAccessToken(response) {
    var jsonResponse = JSON.parse(response);

    // Get the access token from the response
    var accessToken = jsonResponse['access_token'];

    if (accessToken == undefined) {
        return "No token";
    }

    // Split the JWT
    var encodedAccessToken = accessToken.split('.');
    var decodedAccessToken = [];

    // Only decode the Header and Claims
    for (i = 0; i < 2; i++) {
        decodedAccessToken[i] = Base64.decode(encodedAccessToken[i]);
    }

    return decodedAccessToken;
}

/**
 * Concats together the Client ID and Client Secret and then base64 encodes them. 
 */
function encodeClientCredentials(clientId, clientSecret) {
    var clientCredentials = clientId + ':' + clientSecret;
    return Base64.encode(clientCredentials);
}

/**
 * Base 64 Encoder and Decoder 
 */
var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }