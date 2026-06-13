import { c as createSsrRpc } from "./useServerFn-CIY9_c2w.mjs";
import { b as createServerFn } from "./server-Bvv6hkd8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DjqZhiQe.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const getGoogleAuthUrl = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("76fed9ebc4c2f59a27591c84587c290042df3a78cb5258e9b98f3adae97fff76"));
const exchangeGoogleCode = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  code: stringType().min(1)
}).parse(d)).handler(createSsrRpc("a73dc1c4c892eb9e9d21f3a7743338d519157153972a310720471befa5ebc05e"));
const saveGoogleToken = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  refresh_token: stringType().min(1),
  access_token: stringType().min(1)
}).parse(d)).handler(createSsrRpc("43f10d2b99501b279c0dcdfa8d7db9e510c42dca92445810ed7db8852f64deef"));
const checkGoogleConnection = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("3f29bde68ae6680eb2c84b72d3e562aa4220a132e0f3d84b8fa55e2401076c6e"));
const disconnectGoogle = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("34a9282b970edd1ae6193bf0f10ba7050e289d9a7857497f090f5e80ecbc2ae1"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).validator((d) => objectType({
  booking_id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("1961a5c5333f7d9395017126ee580eef50483500cede57aacc2a0914b06cb7fd"));
export {
  checkGoogleConnection as c,
  disconnectGoogle as d,
  exchangeGoogleCode as e,
  getGoogleAuthUrl as g,
  saveGoogleToken as s
};
