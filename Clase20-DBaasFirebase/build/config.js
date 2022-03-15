"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMongo = exports.configFirebase = void 0;
var configMongo = {
  URL: 'mongodb://localhost/clase20'
};
exports.configMongo = configMongo;
var configFirebase = {
  type: 'service_account',
  project_id: 'clase20-2f878',
  private_key_id: 'fd8967717bcaf10452142dc85a92e24e546a7084',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClujKW3a99pEAg\nz89fhSRwa+tFIiO6TGLXplSmYp7g3c3t7N+fgFXqwkZg1j/N21Nf9/3he3Gk9+te\neohiJ3KfWNomDhSLLcBc/EIGi57908FxhYwRggzQ+FBXQjezgo15613OKillsbH/\nLJoqSWdzJNh3HJ7yEplZhaCQMZida7gz+WTkMg70DlAuPkvBs15mr+F92R6hbvO7\npAhM1cjkRu2pQZDaYhLrmMPbJa1U2ePY1jrs4rFb6hQzUvp2fEJSlm/T7iUZ4RsZ\no52Jz4JWBnGc6as5sAsaxQ93BnzLfgwgpt9bnZH+yPhIcf7IjGc2fZ67B8Vsw6Tm\n7Yv7O/MTAgMBAAECggEARAQcGSDYklcj3pOLR2esYdtYzqHJSf9pnZntKfBVxnIh\nvyE1Ug/osxWSrtGflAwMttlfv/fa11rMpZTifm40M8PSnEWxFsHrLf511pvc383V\nmZK2vsTCH82Zo4ZQuAK/r6byc9eH7+2y4MhcaTiBFZeso44CidUqTLxz/lnsicZv\nxNB+TWL2FakO5RRH9ycCNe7ROfFoBrkkBckkxaZiLGTKwZWkBdaDdYhyWSrF5nVl\n/NRLXj5zC6MdFEM65iB+xJVO/LFWf26hkmKE2q9rZL0OYXHRU2eSqjoVLEB/r9nV\nQfOKxJ38xeJFir95xcHCqx+//x0GHNRLsbchnBwwWQKBgQDUytObDsz2+2NO0uEs\nqR5RDPjMMmhkyAIhbBX2hi9SGejnN8yyStDG40qxBojuz5E6CIWVATsgMZ/QXx49\nx3GZrfDdJ0r2aA3ESueCec7HwT7mxBK7c/qiW6dsbVKd39tIf5JpTWTjBWk2fKlQ\nFKPX5cTM7nZ9R2lZvGzMGqnbNwKBgQDHYOI4c1IyQ1pMdeDu08JkNdoUHeRFsWa0\nOclDyM8uzNBNyPMlSG+ex5grsdVHfSv90zmL7Bz3W1zATvuImVjKksWJq6ds7wOh\n38ygVpMcmAe/jUHGp0CurPe+JDGZ84L21kRqGYV4JLLX4IrDpjKfi1QZ41zHj9zH\nDKqTva4tBQKBgQCj3V1+trMYLxaWiMZmQgXanIarmNXTZkJdwoJXSZX/P3yfMdUs\nJ3kG79mA4Wtpm+ZWLmHQERabABv1tonvQTs2AUDOzYdooVCYrKYDUBHwudvakXtr\nZzDG/pW7ZaSNdunCtprlBHiAapZPI0ivJnXVuFcJCUmtx+RU+kk+E/phmQKBgDEN\niRrSZJqxL3o4VkrsFpuJFEp2wD7VUqtsvDPNKAwfn/BDTG8Tz0KFYM7/RbX8+eHN\nIg9m3AmPlNZLmF8XO107lxY0AVEvzPj6kuGv6ynRzbY3DsPNSoCvVZSWWw3Bd6s7\nNEHWXZwdi1LJj9pq/XF7Wgm0gpMmte7TEvSeakfxAoGAY0uj0G+sIfkOjuXRVcjF\n5U5m4H62/JV92pe2ICSPETf3zROTogCoZM6/MxPbJfxcI+KrAnfm0+vWShyWCvfB\nJbGz6bNnk8Gm6UwX2DF5J/D4j1lg5+twCOXhGaD7x/fLRkB9JInTArlwYNxTk3x4\nwo7/aIspbC1BJf/cV+Iw7B0=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-euc09@clase20-2f878.iam.gserviceaccount.com',
  client_id: '108129569776002326706',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-euc09%40clase20-2f878.iam.gserviceaccount.com'
};
exports.configFirebase = configFirebase;