const { test, expect } = require('@playwright/test');

// test('basic test', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//   const title = page.locator('.navbar__inner .navbar__title');
//   await expect(title).toHaveText('Playwright');
// });
let _token;
let wallet_amount;
let available_balance;

test("Step1", async ({ request, baseURL }) => {
  const _response = await request.post("https://api.spenmo-staging.com/api/v1/auth/login", {
    data: {
      email: 'admin@bd.com',
      password: 'c3Blbm1vQDEyMw==',
      device: 'portal'
    }
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  // expect(await _response.json()).toMatchObject({
  //     result: [{ org_id: 'f33ee556-86e6-11eb-9d9d-0242ac110003', user_id: 'f34e5608-86e6-11eb-bd0a-0242ac110003' }]
  // })
  const res = await _response.json();
  _token = res["payload"]["access_token"];
  res["payload"]["user_id"];
  res["payload"]["org_id"];
});

test("Step2", async ({ request, baseURL }) => {
  const _response = await request.get("https://api.spenmo-staging.com/api/v1/org/f33ee556-86e6-11eb-9d9d-0242ac110003/team/f341412a-86e6-11eb-b045-0242ac110003", {
    headers: {
      'Authorization': `bearer ` + _token,
    }
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  const res = await _response.json();
  wallet_amount = res["payload"]["team"]["wallet_amount"];
});

test("Step3", async ({ request, baseURL }) => {
  const _response = await request.post("https://api.spenmo-staging.com/api/v1/auth/login", {
    data: {
      email: 'harry@bd.com',
      password: 'c3Blbm1vQDEyMw==',
      device: 'portal'
    }
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  const res = await _response.json();
  _token = res["payload"]["access_token"];
  res["payload"]["user_id"];
  res["payload"]["org_id"];
});

test("Step4", async ({ request, baseURL }) => {
  const _response = await request.get("https://api.spenmo-staging.com/api/v1/org/f33ee556-86e6-11eb-9d9d-0242ac110003/team/f341412a-86e6-11eb-b045-0242ac110003", {
    headers: {
      'Authorization': `bearer ` + _token,
    }
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  const res = await _response.json();
  available_balance = res["payload"]["team"]["your_membership_details"]["user_wallet"]["available_balance"];
});

test("Step5", async ({ request, baseURL }) => {
  const _response = await request.post("https://api.spenmo-staging.com/api/v1/auth/login", {
    data: {
      email: 'admin@bd.com',
      password: 'c3Blbm1vQDEyMw==',
      device: 'portal'
    }
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  const res = await _response.json();
  _token = res["payload"]["access_token"];
});

test("Step6", async ({ request, baseURL }) => {
  const _response = await request.post("https://api.spenmo-staging.com/api/v1/fund/send", {
    data: {
      amount: '{"to_amount":"1","to_currency":"SGD","from_amount":"1","from_currency":"SGD","fee":0}',
      sender: '{"team_id":"f341412a-86e6-11eb-b045-0242ac110003","type":"team","user_id":"f34e5608-86e6-11eb-bd0a-0242ac110003"}',
      receiver: '{"team_id":"f341412a-86e6-11eb-b045-0242ac110003","type":"user","user_id":"0ab0b92a-96d8-11eb-9525-0242ac110003"}',
      organisation_id: 'f33ee556-86e6-11eb-9d9d-0242ac110003'
    },
    headers: {
      'Authorization': `bearer ` + _token,
    }
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  const res = await _response.json();
  reference_number = res["payload"]["reference_number"];
});

test("Step7", async ({ request, baseURL }) => {
  const _response = await request.post("https://api.spenmo-staging.com/api/v1/transactions", {
    data: {
      fields: '{"id":true,"transaction_number":true,"amount":true,"past_balance":true,"available_balance":true,"currency_id":true,"user_id":true,"organisation_id":true,"created_at":true,"type":true,"description":true,"vendor_transaction_id":true,"merchant":true,"card_type":true,"card_last_four":true,"foreign_currency_amount":true,"foreign_currency_code":true,"vendor_fee_amount":true,"subwallet_id":true,"team_id":true,"isCredit":true,"receipts":true,"category":true,"running_balance":true,"simplified_merchant_name":true}',
      filters: '{"organisation_id":"f33ee556-86e6-11eb-9d9d-0242ac110003"}',
      search_filters: '{}',
      organisation_id: 'f33ee556-86e6-11eb-9d9d-0242ac110003',
      pg: '0',
      limit: '100'
    },
    headers: {
      'Authorization': `bearer ` + _token,
    }
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  const res = await _response.json();
  transactions = res["payload"]["transactions"];
  transactions.forEach(element => {
    if (element["transaction_number"] === reference_number) {
      if (element["isCredit"] === "0") {
        expect(element["past_balance"]).toBe(wallet_amount);
        expect(element["available_balance"]).toBe(element["past_balance"] - 1);
        expect(element["running_balance"]["org_new_balance"]).toBe(element["running_balance"]["org_prev_balance"]);
      }
      if (element["isCredit"] === "1") {
        expect(element["past_balance"]).toBe(available_balance);
        expect(element["available_balance"]).toBe(element["past_balance"] + 1);
      }
    }
  });
});

test("Step8", async ({ request, baseURL }) => {
  const _response = await request.post("https://api.spenmo-staging.com/api/v1/auth/login", {
    data: {
      email: 'harry@bd.com',
      password: 'c3Blbm1vQDEyMw==',
      device: 'portal'
    }
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  const res = await _response.json();
  _token = res["payload"]["access_token"];
});

test("Step9", async ({ request, baseURL }) => {
  const _response = await request.get("https://api.spenmo-staging.com/api/v1/org/f33ee556-86e6-11eb-9d9d-0242ac110003/team/f341412a-86e6-11eb-b045-0242ac110003", {
    headers: {
      'Authorization': `bearer ` + _token,
    }
  });
  console.log(await _response.json());
  expect(_response.status()).toBe(200);
  const res = await _response.json();
  available_balanceNew = res["payload"]["team"]["your_membership_details"]["user_wallet"]["available_balance"];
  expect(available_balanceNew).toBe(1 + available_balance);
});