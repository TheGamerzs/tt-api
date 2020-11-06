# TT-API

A wrapper for the FiveM server, Transport Tycoon

Features:

- Handles servers being down, will attempt to find the next available server
- Implements many (if not all) API routes that are known
- Auto-completion for a lot of returned data (although many return arrays, so sometimes not as useful)
- Keeps track of charges, can get how many charges are left

Usage:

```js
const { TransportTycoon } = require('transporttycoon');

(async () => {
  const TT = new TransportTycoon('API KEY', true);
  await TT.setupCharges();
  const economy = await TT.getEconomyInfo();
  console.log(economy);
})();
```

`setupCharges()` should only be called if the second parameter of the constructor is true (trackCharges)
