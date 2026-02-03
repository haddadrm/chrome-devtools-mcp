/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import assert from 'node:assert';
import {describe, it} from 'node:test';

import {
  getCookies,
  getCookiesForDomain,
  setCookie,
  clearAllCookies,
  getStorageUsage,
  clearStorageForOrigin,
  trackCacheStorage,
  trackIndexeddb,
  overrideStorageQuota,
} from '../../src/tools/storage.js';
import {serverHooks} from '../server.js';
import {html, withMcpContext} from '../utils.js';

describe('storage', () => {
  const server = serverHooks();

  describe('get_cookies', () => {
    it('returns cookies grouped by domain', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/cookies', html`<h1>Cookies</h1>`);
        await page.goto(server.getRoute('/cookies'));
        await page.setCookie({
          name: 'test',
          value: 'value1',
          domain: 'localhost',
        });

        await getCookies.handler({params: {}}, response, context);

        const output = JSON.parse(response.responseLines.at(0)!);
        assert.ok(output.totalCookies >= 1);
        assert.ok(output.domains.length >= 1);
        assert.ok(output.cookiesByDomain);
      });
    });
  });

  describe('get_cookies_for_domain', () => {
    it('filters cookies by domain', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/cookies-domain', html`<h1>Cookies</h1>`);
        await page.goto(server.getRoute('/cookies-domain'));
        await page.setCookie({
          name: 'domtest',
          value: 'val',
          domain: 'localhost',
        });

        await getCookiesForDomain.handler(
          {params: {domain: 'localhost'}},
          response,
          context,
        );

        const output = JSON.parse(response.responseLines.at(0)!);
        assert.strictEqual(output.domain, 'localhost');
        assert.ok(output.totalCookies >= 1);
        assert.ok(
          output.cookies.some(
            (c: {name: string}) => c.name === 'domtest',
          ),
        );
      });
    });
  });

  describe('set_cookie', () => {
    it('sets a cookie successfully', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/set-cookie', html`<h1>Set Cookie</h1>`);
        await page.goto(server.getRoute('/set-cookie'));

        await setCookie.handler(
          {params: {name: 'newcookie', value: 'newvalue', domain: 'localhost'}},
          response,
          context,
        );

        const line = response.responseLines.at(0)!;
        assert.ok(line.includes('newcookie'));
        assert.ok(line.includes('set successfully'));
      });
    });
  });

  describe('clear_all_cookies', () => {
    it('rejects without confirm', async () => {
      await withMcpContext(async (response, context) => {
        await assert.rejects(
          () =>
            clearAllCookies.handler(
              {params: {confirm: false}},
              response,
              context,
            ),
          {
            message: /must set "confirm" to true/,
          },
        );
      });
    });

    it('clears cookies with confirm', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/clear-cookies', html`<h1>Clear</h1>`);
        await page.goto(server.getRoute('/clear-cookies'));

        await clearAllCookies.handler(
          {params: {confirm: true}},
          response,
          context,
        );

        const line = response.responseLines.at(0)!;
        assert.ok(line.includes('cleared successfully'));
      });
    });
  });

  describe('get_storage_usage', () => {
    it('returns usage and quota fields', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/storage-usage', html`<h1>Storage</h1>`);
        await page.goto(server.getRoute('/storage-usage'));

        await getStorageUsage.handler(
          {params: {origin: server.baseUrl}},
          response,
          context,
        );

        const output = JSON.parse(response.responseLines.at(0)!);
        assert.ok('usage' in output);
        assert.ok('quota' in output);
        assert.ok('usageBytes' in output);
        assert.ok('quotaBytes' in output);
      });
    });
  });

  describe('clear_storage_for_origin', () => {
    it('rejects without confirm', async () => {
      await withMcpContext(async (response, context) => {
        await assert.rejects(
          () =>
            clearStorageForOrigin.handler(
              {params: {origin: 'https://example.com', confirm: false}},
              response,
              context,
            ),
          {
            message: /must set "confirm" to true/,
          },
        );
      });
    });

    it('clears storage with confirm', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/clear-storage', html`<h1>Clear Storage</h1>`);
        await page.goto(server.getRoute('/clear-storage'));

        await clearStorageForOrigin.handler(
          {params: {origin: server.baseUrl, confirm: true}},
          response,
          context,
        );

        const line = response.responseLines.at(0)!;
        assert.ok(line.includes('Storage cleared'));
      });
    });
  });

  describe('track_cache_storage', () => {
    it('enables tracking', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/track-cache', html`<h1>Cache</h1>`);
        await page.goto(server.getRoute('/track-cache'));

        await trackCacheStorage.handler(
          {params: {origin: server.baseUrl, track: true}},
          response,
          context,
        );

        const line = response.responseLines.at(0)!;
        assert.ok(line.includes('tracking enabled'));
      });
    });

    it('disables tracking', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/untrack-cache', html`<h1>Cache</h1>`);
        await page.goto(server.getRoute('/untrack-cache'));

        // Enable first, then disable
        await trackCacheStorage.handler(
          {params: {origin: server.baseUrl, track: true}},
          response,
          context,
        );

        response.resetResponseLineForTesting();
        await trackCacheStorage.handler(
          {params: {origin: server.baseUrl, track: false}},
          response,
          context,
        );

        const line = response.responseLines.at(0)!;
        assert.ok(line.includes('tracking disabled'));
      });
    });
  });

  describe('track_indexeddb', () => {
    it('enables tracking', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/track-idb', html`<h1>IDB</h1>`);
        await page.goto(server.getRoute('/track-idb'));

        await trackIndexeddb.handler(
          {params: {origin: server.baseUrl, track: true}},
          response,
          context,
        );

        const line = response.responseLines.at(0)!;
        assert.ok(line.includes('tracking enabled'));
      });
    });

    it('disables tracking', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/untrack-idb', html`<h1>IDB</h1>`);
        await page.goto(server.getRoute('/untrack-idb'));

        // Enable first, then disable
        await trackIndexeddb.handler(
          {params: {origin: server.baseUrl, track: true}},
          response,
          context,
        );

        response.resetResponseLineForTesting();
        await trackIndexeddb.handler(
          {params: {origin: server.baseUrl, track: false}},
          response,
          context,
        );

        const line = response.responseLines.at(0)!;
        assert.ok(line.includes('tracking disabled'));
      });
    });
  });

  describe('override_storage_quota', () => {
    it('sets a custom quota', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/quota-override', html`<h1>Quota</h1>`);
        await page.goto(server.getRoute('/quota-override'));

        await overrideStorageQuota.handler(
          {
            params: {
              origin: server.baseUrl,
              quotaSize: 1024 * 1024 * 100,
            },
          },
          response,
          context,
        );

        const line = response.responseLines.at(0)!;
        assert.ok(line.includes('set to'));
        assert.ok(line.includes('100.00 MB'));
      });
    });

    it('resets to default when quotaSize is omitted', async () => {
      await withMcpContext(async (response, context) => {
        const page = context.getSelectedPage();
        server.addHtmlRoute('/quota-reset', html`<h1>Quota Reset</h1>`);
        await page.goto(server.getRoute('/quota-reset'));

        await overrideStorageQuota.handler(
          {params: {origin: server.baseUrl}},
          response,
          context,
        );

        const line = response.responseLines.at(0)!;
        assert.ok(line.includes('reset to default'));
      });
    });
  });
});
