// playwright.config.js
// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      // All requests we send go to this API endpoint.
      // baseURL: 'https://gorest.co.in/',
      extraHTTPHeaders: {
        // 'Authorization': `token ${process.env.API_TOKEN}`,
        // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY0NjdmZTdjZGIwMjRjYjMzZjQwYTQyZWRjMGFiZmFkYmI5NGExYWIyNmIwODk5OTY3Y2MzNjUyNGNkZmEzMzJmNDlmNmU3MTUwZjg5YmQ5In0.eyJhdWQiOiIxIiwianRpIjoiZjQ2N2ZlN2NkYjAyNGNiMzNmNDBhNDJlZGMwYWJmYWRiYjk0YTFhYjI2YjA4OTk5NjdjYzM2NTI0Y2RmYTMzMmY0OWY2ZTcxNTBmODliZDkiLCJpYXQiOjE2NTE3NDIxODQsIm5iZiI6MTY1MTc0MjE4NCwiZXhwIjoxNjgzMjc4MTg0LCJzdWIiOiJmMzRlNTYwOC04NmU2LTExZWItYmQwYS0wMjQyYWMxMTAwMDMiLCJzY29wZXMiOltdfQ.GxMvqoTfyZQEgoFu-1Nqv5A_i5KoMA7eVzx7I0GeQZTM7b2up1m0BeJ686FmN3qpjuINoMfMomPDF2kbyJ_kKlkBj29l4vBgLOGF7v8BCa-3uqZC15xH0dW9TWjYvXzt91YBCgqWD2cCuoBlUYRhRNx1gVJEG2lJ9uBcs0ioBTdKSebqDz0xo9N9tOdx-SJ_OluwAvZJhdYq96pcexBwTtDaqlZmuK-GZLcNxVkA8L5g0ru2SdmjvaNi1TiEkQldT-D7GSYLdMtPWmiPsneL_tHZW6l7rFnuXI1TljWIk52LC0iZ-aX-Lg5B4VGVsTwba0XJBdlV6DiQKdXNvHF2IyzyXHC8PX6OtzQYlKXKWzbxH7iQkkJcHWNW7_STsC23FvHnHRPX0h3rpqjYxDasH8-HcPbDm5XaRWfLQRXntySxWSQGqjTDGij3KbPLgzvSTPu1S3YdfWdhCem57pnOikb4DzSjAhPmZlNwaCdkf39UBPtzvG9qViJ577b92jf355QCPwO58fRFh3SKYoFsTk8D93NHWoAIiwEpyOmQqC4LuXmrVEcgKl7ek3JnCOTd51IZtvFruVDbGPi8F3FulmUVVe50CXdNAXMoQ5YOFtRdyXrTktdUmYwSnsLduizLum20UVe1rwO3HEmVOsvupK3DtpWWdbmoLtEIKr2dQ-0'
      }
    }
  };
  module.exports = config;