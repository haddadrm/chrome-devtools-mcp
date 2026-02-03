/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {zod} from '../third_party/index.js';

import {ToolCategory} from './categories.js';
import {defineTool} from './ToolDefinition.js';

export const getCookies = defineTool({
  name: 'get_cookies',
  description:
    'Get all cookies for the currently selected page. Returns cookies grouped by domain.',
  annotations: {
    category: ToolCategory.STORAGE,
    readOnlyHint: true,
  },
  schema: {},
  handler: async (_request, response, context) => {
    const page = context.getSelectedPage();
    const session = await page.createCDPSession();
    try {
      const result = await session.send('Storage.getCookies');
      const cookies = result.cookies;
      const cookiesByDomain: Record<string, typeof cookies> = {};
      for (const cookie of cookies) {
        const domain = cookie.domain;
        if (!cookiesByDomain[domain]) {
          cookiesByDomain[domain] = [];
        }
        cookiesByDomain[domain].push(cookie);
      }
      const domains = Object.keys(cookiesByDomain);
      response.appendResponseLine(
        JSON.stringify(
          {
            totalCookies: cookies.length,
            domains,
            cookiesByDomain,
          },
          null,
          2,
        ),
      );
    } finally {
      await session.detach();
    }
  },
});

export const getCookiesForDomain = defineTool({
  name: 'get_cookies_for_domain',
  description:
    'Get cookies filtered by domain. Uses flexible matching so ".x.com" matches "x.com" cookies.',
  annotations: {
    category: ToolCategory.STORAGE,
    readOnlyHint: true,
  },
  schema: {
    domain: zod
      .string()
      .describe(
        'Domain to filter cookies by. Uses substring matching (e.g., "x.com" matches ".x.com").',
      ),
  },
  handler: async (request, response, context) => {
    const page = context.getSelectedPage();
    const session = await page.createCDPSession();
    try {
      const result = await session.send('Storage.getCookies');
      const domainFilter = request.params.domain;
      const filtered = result.cookies.filter(cookie =>
        cookie.domain.includes(domainFilter),
      );
      response.appendResponseLine(
        JSON.stringify(
          {
            domain: domainFilter,
            totalCookies: filtered.length,
            cookies: filtered,
          },
          null,
          2,
        ),
      );
    } finally {
      await session.detach();
    }
  },
});

export const setCookie = defineTool({
  name: 'set_cookie',
  description: 'Set a cookie on the currently selected page.',
  annotations: {
    category: ToolCategory.STORAGE,
    readOnlyHint: false,
  },
  schema: {
    name: zod.string().describe('Cookie name.'),
    value: zod.string().describe('Cookie value.'),
    domain: zod.string().optional().describe('Cookie domain.'),
    path: zod.string().optional().describe('Cookie path. Defaults to "/".'),
    expires: zod
      .number()
      .optional()
      .describe('Cookie expiration as a Unix timestamp in seconds.'),
    httpOnly: zod
      .boolean()
      .optional()
      .describe('Whether the cookie is HTTP-only.'),
    secure: zod
      .boolean()
      .optional()
      .describe('Whether the cookie is secure.'),
    sameSite: zod
      .enum(['Strict', 'Lax', 'None'])
      .optional()
      .describe('Cookie SameSite attribute.'),
  },
  handler: async (request, response, context) => {
    const page = context.getSelectedPage();
    const session = await page.createCDPSession();
    try {
      const cookieParam = {
        name: request.params.name,
        value: request.params.value,
        ...(request.params.domain !== undefined && {
          domain: request.params.domain,
        }),
        ...(request.params.path !== undefined && {
          path: request.params.path,
        }),
        ...(request.params.expires !== undefined && {
          expires: request.params.expires,
        }),
        ...(request.params.httpOnly !== undefined && {
          httpOnly: request.params.httpOnly,
        }),
        ...(request.params.secure !== undefined && {
          secure: request.params.secure,
        }),
        ...(request.params.sameSite !== undefined && {
          sameSite: request.params.sameSite,
        }),
      };
      await session.send('Storage.setCookies', {
        cookies: [cookieParam],
      });
      response.appendResponseLine(
        `Cookie "${request.params.name}" set successfully.`,
      );
    } finally {
      await session.detach();
    }
  },
});

export const clearAllCookies = defineTool({
  name: 'clear_all_cookies',
  description:
    'Clear all cookies for the current browser context. Requires confirm parameter set to true as a safety guard.',
  annotations: {
    category: ToolCategory.STORAGE,
    readOnlyHint: false,
  },
  schema: {
    confirm: zod
      .boolean()
      .describe(
        'Must be set to true to confirm clearing all cookies. This is a destructive operation.',
      ),
  },
  handler: async (request, response, context) => {
    if (!request.params.confirm) {
      throw new Error(
        'You must set "confirm" to true to clear all cookies. This is a destructive operation.',
      );
    }
    const page = context.getSelectedPage();
    const session = await page.createCDPSession();
    try {
      await session.send('Storage.clearCookies');
      response.appendResponseLine('All cookies cleared successfully.');
    } finally {
      await session.detach();
    }
  },
});

export const getStorageUsage = defineTool({
  name: 'get_storage_usage',
  description:
    'Get storage usage and quota for a given origin. Returns usage breakdown by storage type.',
  annotations: {
    category: ToolCategory.STORAGE,
    readOnlyHint: true,
  },
  schema: {
    origin: zod
      .string()
      .describe(
        'The origin to get storage usage for (e.g., "https://example.com").',
      ),
  },
  handler: async (request, response, context) => {
    const page = context.getSelectedPage();
    const session = await page.createCDPSession();
    try {
      const result = await session.send('Storage.getUsageAndQuota', {
        origin: request.params.origin,
      });
      const usageMB = (result.usage / (1024 * 1024)).toFixed(2);
      const quotaMB = (result.quota / (1024 * 1024)).toFixed(2);
      response.appendResponseLine(
        JSON.stringify(
          {
            origin: request.params.origin,
            usage: `${usageMB} MB`,
            usageBytes: result.usage,
            quota: `${quotaMB} MB`,
            quotaBytes: result.quota,
            usageBreakdown: result.usageBreakdown,
          },
          null,
          2,
        ),
      );
    } finally {
      await session.detach();
    }
  },
});

export const clearStorageForOrigin = defineTool({
  name: 'clear_storage_for_origin',
  description:
    'Clear storage data for a given origin. Requires confirm parameter set to true as a safety guard.',
  annotations: {
    category: ToolCategory.STORAGE,
    readOnlyHint: false,
  },
  schema: {
    origin: zod
      .string()
      .describe('The origin to clear storage for (e.g., "https://example.com").'),
    storageTypes: zod
      .string()
      .optional()
      .describe(
        'Comma-separated list of storage types to clear (e.g., "local_storage,indexeddb,cache_storage"). If omitted, clears all storage types.',
      ),
    confirm: zod
      .boolean()
      .describe(
        'Must be set to true to confirm clearing storage. This is a destructive operation.',
      ),
  },
  handler: async (request, response, context) => {
    if (!request.params.confirm) {
      throw new Error(
        'You must set "confirm" to true to clear storage. This is a destructive operation.',
      );
    }
    const page = context.getSelectedPage();
    const session = await page.createCDPSession();
    try {
      const storageTypes = request.params.storageTypes ?? 'all';
      await session.send('Storage.clearDataForOrigin', {
        origin: request.params.origin,
        storageTypes,
      });
      response.appendResponseLine(
        `Storage cleared for origin "${request.params.origin}" (types: ${storageTypes}).`,
      );
    } finally {
      await session.detach();
    }
  },
});

export const trackCacheStorage = defineTool({
  name: 'track_cache_storage',
  description:
    'Enable or disable tracking of cache storage events for a given origin at the protocol level.',
  annotations: {
    category: ToolCategory.STORAGE,
    readOnlyHint: false,
  },
  schema: {
    origin: zod
      .string()
      .describe('The origin to track cache storage for.'),
    track: zod
      .boolean()
      .describe('Set to true to start tracking, false to stop tracking.'),
  },
  handler: async (request, response, context) => {
    const page = context.getSelectedPage();
    const session = await page.createCDPSession();
    try {
      if (request.params.track) {
        await session.send('Storage.trackCacheStorageForOrigin', {
          origin: request.params.origin,
        });
        response.appendResponseLine(
          `Cache storage tracking enabled for origin "${request.params.origin}".`,
        );
      } else {
        await session.send('Storage.untrackCacheStorageForOrigin', {
          origin: request.params.origin,
        });
        response.appendResponseLine(
          `Cache storage tracking disabled for origin "${request.params.origin}".`,
        );
      }
    } finally {
      await session.detach();
    }
  },
});

export const trackIndexeddb = defineTool({
  name: 'track_indexeddb',
  description:
    'Enable or disable tracking of IndexedDB events for a given origin at the protocol level.',
  annotations: {
    category: ToolCategory.STORAGE,
    readOnlyHint: false,
  },
  schema: {
    origin: zod
      .string()
      .describe('The origin to track IndexedDB for.'),
    track: zod
      .boolean()
      .describe('Set to true to start tracking, false to stop tracking.'),
  },
  handler: async (request, response, context) => {
    const page = context.getSelectedPage();
    const session = await page.createCDPSession();
    try {
      if (request.params.track) {
        await session.send('Storage.trackIndexedDBForOrigin', {
          origin: request.params.origin,
        });
        response.appendResponseLine(
          `IndexedDB tracking enabled for origin "${request.params.origin}".`,
        );
      } else {
        await session.send('Storage.untrackIndexedDBForOrigin', {
          origin: request.params.origin,
        });
        response.appendResponseLine(
          `IndexedDB tracking disabled for origin "${request.params.origin}".`,
        );
      }
    } finally {
      await session.detach();
    }
  },
});

export const overrideStorageQuota = defineTool({
  name: 'override_storage_quota',
  description:
    'Override the storage quota for a given origin. Omit quotaSize to reset to the default quota.',
  annotations: {
    category: ToolCategory.STORAGE,
    readOnlyHint: false,
  },
  schema: {
    origin: zod
      .string()
      .describe('The origin to override storage quota for.'),
    quotaSize: zod
      .number()
      .min(0)
      .optional()
      .describe(
        'The quota size in bytes. Omit to reset to the default quota.',
      ),
  },
  handler: async (request, response, context) => {
    const page = context.getSelectedPage();
    const session = await page.createCDPSession();
    try {
      await session.send('Storage.overrideQuotaForOrigin', {
        origin: request.params.origin,
        ...(request.params.quotaSize !== undefined && {
          quotaSize: request.params.quotaSize,
        }),
      });
      if (request.params.quotaSize !== undefined) {
        const quotaMB = (request.params.quotaSize / (1024 * 1024)).toFixed(2);
        response.appendResponseLine(
          `Storage quota for origin "${request.params.origin}" set to ${quotaMB} MB (${request.params.quotaSize} bytes).`,
        );
      } else {
        response.appendResponseLine(
          `Storage quota for origin "${request.params.origin}" reset to default.`,
        );
      }
    } finally {
      await session.detach();
    }
  },
});
