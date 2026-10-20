(function() {
    'use strict';

    const STORAGE_KEY = 'luci_material_theme_settings';
    const SHORTCUTS_KEY = 'luci_material_shortcuts';
    const SHORTCUTS_VER_KEY = 'luci_material_shortcuts_ver';
    const CURRENT_SHORTCUTS_VER = '26.300.35-clean';
    const DEFAULT_FALLBACK_ICON = '/luci-static/material/logo_48.png';
    const DEFAULT_FALLBACK_BRAND = '/luci-static/material/brand.png';

    const PRESETS = [
        { id: 'original-material', name: 'Original Material', primary: '#00b5e2', secondary: '#0099cc' },
        { id: 'classic-blue', name: 'Classic Blue', primary: '#2563eb', secondary: '#60a5fa' },
        { id: 'nocturne-cyan', name: 'Nocturne Cyan', primary: '#0e7490', secondary: '#38bdf8' },
        { id: 'indigo-voyage', name: 'Indigo Voyage', primary: '#4f46e5', secondary: '#818cf8' },
        { id: 'graphite-silver', name: 'Graphite Silver', primary: '#334155', secondary: '#94a3b8' },
        { id: 'ember-amber', name: 'Ember Amber', primary: '#d97706', secondary: '#f59e0b' },
        { id: 'imperial-purple', name: 'Imperial Purple', primary: '#7e22ce', secondary: '#c084fc' },
        { id: 'sweet-rose', name: 'Sweet Rose', primary: '#e11d48', secondary: '#fb7185' },
        { id: 'smoky-pink', name: 'Smoky Pink', primary: '#9d174d', secondary: '#f472b6' }
    ];

    const SVG_ICONS = {
        openclash: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.85 1.2 5.42 3.12 7.24.16.15.36.26.58.26h12.6c.22 0 .42-.11.58-.26C20.8 17.42 22 14.85 22 12c0-5.52-4.48-10-10-10zm-4 7c.83 0 1.5.67 1.5 1.5S8.83 12 8 12s-1.5-.67-1.5-1.5S7.17 9 8 9zm8 0c.83 0 1.5.67 1.5 1.5S16.83 12 16 12s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-4 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/><polygon points="4,4 8,8 2,9"/><polygon points="20,4 16,8 22,9"/></svg>`,
        terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
        folder: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`,
        netdata: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
        portainer: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 13h4v4H2zm5 0h4v4H7zm5 0h4v4h-4zm5 0h4v4h-4zM7 8h4v4H7zm5 0h4v4h-4zm5 0h4v4h-4zM12 3h4v4h-4z"/></svg>`,
        modem: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61l1.42-1.42C4.38 14.88 4 13.5 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.5-.38 2.88-1.39 4.19l1.42 1.42C21.26 16.07 22 14.12 22 12c0-4.97-4.03-9-9-9zm0 4c-2.76 0-5 2.24-5 5 0 1.38.56 2.63 1.46 3.54l1.42-1.42C9.35 13.59 9 12.84 9 12c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .84-.35 1.59-.88 2.12l1.42 1.42C16.44 14.63 17 13.38 17 12c0-2.76-2.24-5-5-5zm0 4c-.55 0-1 .45-1 1 0 .28.11.53.29.71l1.42 1.42c.18-.18.29-.43.29-.71 0-.55-.45-1-1-1z"/></svg>`,
        gauge: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.43zM10.59 15.41a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/></svg>`,
        settings: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
        youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z"/></svg>`,
        globe: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
    };

    const DEFAULT_SHORTCUTS = [
        { id: 'sc-1', title: 'OpenClash', url: '/cgi-bin/luci/admin/services/openclash', type: 'icon', icon: '/luci-static/material/navbar/openclash.png', target: '_self' },
        { id: 'sc-2', title: 'File Manager', url: '/tinyfm.php', type: 'icon', icon: '/luci-static/material/navbar/tinyfm.png', target: '_blank' },
        { id: 'sc-3', title: 'Network', url: '/cgi-bin/luci/admin/network/network', type: 'icon', icon: '/luci-static/material/navbar/interface.png', target: '_self' },
        { id: 'sc-4', title: 'Terminal', url: '/cgi-bin/luci/admin/services/ttyd', type: 'text', icon: '', target: '_self' },
        { id: 'sc-5', title: 'Yacd', url: ':9090/ui/yacd/', type: 'text', icon: '', target: '_blank' }
    ];

    function processImageFile(file, maxW, maxH, callback) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                let width = img.width;
                let height = img.height;
                const mw = maxW || 96;
                const mh = maxH || 96;

                if (width > mw || height > mh) {
                    const ratio = Math.min(mw / width, mh / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const optimizedDataUrl = canvas.toDataURL('image/png');
                callback(optimizedDataUrl);
            };
            img.onerror = function() {
                callback(e.target.result);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // ==========================================================================
    // ROUTER-WIDE SERVER SYNC (CROSS-DEVICE: PC, HP, TABLET)
    // ==========================================================================
    let syncTimer = null;
    function syncToServer() {
        if (syncTimer) clearTimeout(syncTimer);
        syncTimer = setTimeout(function() {
            try {
                const payload = {
                    settings: getSettings(),
                    shortcuts: getShortcuts()
                };
                fetch('/cgi-bin/theme_settings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }).catch(function() {});
            } catch(e) {}
        }, 150);
    }

    function applySyncedData(data) {
        if (!data || typeof data !== 'object') return false;
        let changed = false;
        if (data.settings && typeof data.settings === 'object') {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data.settings));
                if (typeof window.applyTheme === 'function') {
                    window.applyTheme(data.settings);
                }
                changed = true;
            } catch(e) {}
        }
        if (Array.isArray(data.shortcuts) && data.shortcuts.length > 0) {
            try {
                localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(data.shortcuts));
                localStorage.setItem(SHORTCUTS_VER_KEY, CURRENT_SHORTCUTS_VER);
                renderHeaderShortcuts();
                changed = true;
            } catch(e) {}
        }
        return changed;
    }

    function initServerSync() {
        if (window.ROUTER_THEME_CONFIG && typeof window.ROUTER_THEME_CONFIG === 'object') {
            applySyncedData(window.ROUTER_THEME_CONFIG);
        } else {
            fetch('/cgi-bin/theme_settings')
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    if (data && typeof data === 'object') {
                        applySyncedData(data);
                    } else {
                        syncToServer();
                    }
                })
                .catch(function() {
                    syncToServer();
                });
        }
    }

    function getShortcuts() {
        try {
            const curVer = localStorage.getItem(SHORTCUTS_VER_KEY);
            const raw = localStorage.getItem(SHORTCUTS_KEY);
            if (curVer !== CURRENT_SHORTCUTS_VER || !raw) {
                saveShortcuts(DEFAULT_SHORTCUTS);
                localStorage.setItem(SHORTCUTS_VER_KEY, CURRENT_SHORTCUTS_VER);
                return DEFAULT_SHORTCUTS;
            }
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        } catch(e) {}
        return DEFAULT_SHORTCUTS;
    }

    function saveShortcuts(items) {
        try {
            localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(items));
        } catch(e) {}
        renderHeaderShortcuts();
        syncToServer();
    }

    function resolveUrl(rawUrl) {
        if (!rawUrl) return '#';
        let url = rawUrl.trim();

        // If already has protocol (http://, https://, //, javascript:, #) or absolute path (/)
        if (/^(https?:|\/\/|javascript:|#|\/)/i.test(url)) {
            return url;
        }

        // Port shorthand: ":9090" or ":9090/ui/yacd/"
        if (url.startsWith(':')) {
            return `${window.location.protocol}//${window.location.hostname}${url}`;
        }

        // IP address with port/path (e.g. 192.168.1.1:9090/ui/yacd/, 192.168.8.1, localhost:9090)
        if (/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|localhost)(:\d+)?(\/.*)?$/i.test(url) ||
            /^[a-zA-Z0-9_-]+:\d+(\/.*)?$/i.test(url)) {
            return `http://${url}`;
        }

        // Router scripts like tinyfm.php without leading slash
        if (url.endsWith('.php') || url.startsWith('cgi-bin/')) {
            return `/${url}`;
        }

        // General host/port or domain fallback
        if (url.includes(':') || url.includes('.')) {
            return `http://${url}`;
        }

        return url;
    }

    function renderHeaderShortcuts() {
        const iconContainer = document.getElementById('header-icon-shortcuts');
        const textContainer = document.getElementById('header-text-shortcuts');
        const legacyContainer = document.getElementById('header-shortcuts');

        if (iconContainer) iconContainer.innerHTML = '';
        if (textContainer) textContainer.innerHTML = '';
        if (legacyContainer) legacyContainer.innerHTML = '';

        if (!iconContainer && !textContainer && !legacyContainer) return;

        const shortcuts = getShortcuts();
        if (!shortcuts || shortcuts.length === 0) return;

        const iconItems = shortcuts.filter(s => s.type === 'icon' || s.type === 'both');
        const textItems = shortcuts.filter(s => s.type === 'text' || s.type === 'both');

        // Render circular icon shortcuts (top row, next to logo)
        const iconTarget = iconContainer || legacyContainer;
        if (iconTarget && iconItems.length > 0) {
            iconItems.forEach(item => {
                const a = document.createElement('a');
                a.className = 'h-shortcut-icon-item';
                a.href = resolveUrl(item.url);
                a.target = item.target || '_self';
                a.title = item.title;

                let iconHtml = '';
                if (item.icon && SVG_ICONS[item.icon]) {
                    iconHtml = SVG_ICONS[item.icon];
                } else if (item.icon && item.icon.trim() !== '') {
                    iconHtml = `<img src="${item.icon}" alt="${item.title}" onerror="this.onerror=null; this.src='${DEFAULT_FALLBACK_ICON}';">`;
                } else {
                    iconHtml = `<img src="${DEFAULT_FALLBACK_ICON}" alt="${item.title}">`;
                }
                a.innerHTML = iconHtml;
                iconTarget.appendChild(a);
            });
        }

        // Render text links (bottom row in #menu, directly underneath logo)
        const textTarget = textContainer || legacyContainer;
        if (textTarget && textItems.length > 0) {
            textItems.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'h-shortcut-text-item';
                a.href = resolveUrl(item.url);
                a.target = item.target || '_self';
                a.textContent = item.title;
                li.appendChild(a);
                textTarget.appendChild(li);
            });
        }
    }

    function getSettings() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return JSON.parse(saved);
        } catch(e) {}
        return {
            mode: 'light',
            presetId: 'nocturne-cyan',
            primary: '#0e7490',
            secondary: '#38bdf8',
            customLogo: ''
        };
    }

    function saveSettings(settings) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch(e) {}
        syncToServer();
    }

    function isDarkEffective(mode) {
        if (mode === 'dark') return true;
        if (mode === 'auto') {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    }

    function hexToHsl(hex) {
        if (!hex) return { h: 215, s: 25, l: 27 };
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        if (hex.length !== 6) return { h: 215, s: 25, l: 27 };
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h = Math.round(h * 60);
        }
        return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    function applyDynamicDarkPalette(root, primaryHex) {
        const hsl = hexToHsl(primaryHex);
        const h = hsl.h;
        const s = Math.min(Math.max(Math.round(hsl.s * 0.40), 16), 32);

        root.style.setProperty('--page-bg', `hsl(${h}, ${Math.round(s * 0.9)}%, 6.5%)`);
        root.style.setProperty('--card-bg', `hsl(${h}, ${Math.round(s * 0.85)}%, 11.5%)`);
        root.style.setProperty('--card-border', `hsl(${h}, ${Math.round(s * 0.75)}%, 19%)`);
        root.style.setProperty('--sidebar-bg', `hsl(${h}, ${Math.round(s * 0.95)}%, 8%)`);
        root.style.setProperty('--sidebar-sub-bg', `hsl(${h}, ${s}%, 5.5%)`);
        root.style.setProperty('--sidebar-border', `hsl(${h}, ${Math.round(s * 0.75)}%, 19%)`);
        root.style.setProperty('--table-header-bg', `hsl(${h}, ${Math.round(s * 0.8)}%, 15%)`);
        root.style.setProperty('--table-row-bg', `hsl(${h}, ${Math.round(s * 0.85)}%, 11.5%)`);
        root.style.setProperty('--table-row-alt-bg', `hsl(${h}, ${Math.round(s * 0.9)}%, 9%)`);
        root.style.setProperty('--table-border', `hsl(${h}, ${Math.round(s * 0.75)}%, 19%)`);
        root.style.setProperty('--input-bg', `hsl(${h}, ${Math.round(s * 0.85)}%, 15%)`);
        root.style.setProperty('--input-border', `hsl(${h}, ${Math.round(s * 0.75)}%, 26%)`);
    }

    function clearDynamicDarkPalette(root) {
        const vars = [
            '--page-bg', '--card-bg', '--card-border', '--sidebar-bg',
            '--sidebar-sub-bg', '--sidebar-border', '--table-header-bg',
            '--table-row-bg', '--table-row-alt-bg', '--table-border',
            '--input-bg', '--input-border'
        ];
        vars.forEach(v => root.style.removeProperty(v));
    }

    function applyTheme(settings) {
        const root = document.documentElement;
        if (!root) return;

        root.style.setProperty('--main-color', settings.primary);
        root.style.setProperty('--header-bg', settings.primary);
        root.style.setProperty('--secondary-color', settings.secondary);
        root.style.setProperty('--bar-bg', settings.secondary);
        root.style.setProperty('--progress-fill', settings.primary);
        root.style.setProperty('--submenu-bg-hover-active', settings.primary);

        const dark = isDarkEffective(settings.mode);
        if (dark) {
            root.classList.add('material-dark-mode');
            if (document.body) document.body.classList.add('material-dark-mode');
            applyDynamicDarkPalette(root, settings.primary);
        } else {
            root.classList.remove('material-dark-mode');
            if (document.body) document.body.classList.remove('material-dark-mode');
            clearDynamicDarkPalette(root);
        }

        // Apply custom brand logo if configured
        const logoImgs = document.querySelectorAll('header #logo > img');
        logoImgs.forEach(img => {
            if (!img.getAttribute('data-original-src')) {
                img.setAttribute('data-original-src', img.src);
            }
            img.onerror = function() {
                this.onerror = null;
                this.src = this.getAttribute('data-original-src') || DEFAULT_FALLBACK_BRAND;
            };
            if (settings.customLogo) {
                img.src = settings.customLogo;
            } else if (img.getAttribute('data-original-src')) {
                img.src = img.getAttribute('data-original-src');
            }
        });
    }

    window.applyTheme = applyTheme;
    window.getSettings = getSettings;

    // Sync with router server configuration across devices (PC, mobile, tablet)
    initServerSync();

    // Apply immediately to prevent flash
    applyTheme(getSettings());

    // Watch for OS theme changes if in auto mode
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            const s = getSettings();
            if (s.mode === 'auto') applyTheme(s);
        });
    }

    function removeOldHeaderButton() {
        const oldBtn = document.getElementById('openclash-theme-btn');
        if (oldBtn) oldBtn.remove();
        const oldPopup = document.getElementById('oct-theme-popup');
        if (oldPopup) oldPopup.remove();
    }

    function isSystemPage() {
        if (window.L && L.env && Array.isArray(L.env.dispatchpath)) {
            return L.env.dispatchpath.slice(0, 3).join('/') === 'admin/system/system';
        }
        return window.location.pathname.includes('admin/system/system') ||
               (document.body && document.body.getAttribute('data-page') === 'admin-system-system') ||
               Boolean(document.querySelector('[data-page="admin-system-system"]'));
    }

    function checkAndInjectSystemCustomizer() {
        removeOldHeaderButton();

        if (!isSystemPage()) {
            return;
        }

        // Target: Tab Language and Style
        const langTab = document.querySelector('[data-tab="language"].cbi-tabcontainer, div[data-tab="language"], [data-tab-title="Language and Style"]');
        if (!langTab) {
            const designField = document.querySelector('[data-name="_mediaurlbase"], select[name*="mediaurlbase"], [id*="mediaurlbase"]');
            if (designField) {
                const row = designField.closest('.cbi-value');
                if (row && row.parentNode) {
                    injectCustomizerRow(row.parentNode, row.nextSibling);
                    injectShortcutsManagerRow(row.parentNode, row.nextSibling ? row.nextSibling.nextSibling : null);
                    return;
                }
            }
            return;
        }

        const designField = langTab.querySelector('[data-name="_mediaurlbase"], select[name*="mediaurlbase"], [id*="mediaurlbase"]');
        if (designField) {
            const row = designField.closest('.cbi-value');
            if (row && row.parentNode) {
                injectCustomizerRow(row.parentNode, row.nextSibling);
                injectShortcutsManagerRow(row.parentNode, row.nextSibling ? row.nextSibling.nextSibling : null);
                return;
            }
        }

        injectCustomizerRow(langTab, null);
        injectShortcutsManagerRow(langTab, null);
    }

    // 1. INJECT THEME STYLE ROW
    function injectCustomizerRow(parent, referenceNode) {
        if (document.getElementById('cbi-material-theme-customizer')) return;

        const row = document.createElement('div');
        row.className = 'cbi-value';
        row.id = 'cbi-material-theme-customizer';
        row.setAttribute('data-name', '_material_theme_customizer');

        row.innerHTML = `
            <label class="cbi-value-title">Material Theme Style</label>
            <div class="cbi-value-field">
                <div class="oct-embedded-card">
                    <div class="oct-section-label" style="font-weight: 600; margin-bottom: 6px;">Display Mode</div>
                    <div class="oct-mode-tabs" id="oct-mode-tabs">
                        <button type="button" class="oct-mode-tab" data-mode="light">Light</button>
                        <div class="oct-mode-divider"></div>
                        <button type="button" class="oct-mode-tab" data-mode="dark">Dark</button>
                        <div class="oct-mode-divider"></div>
                        <button type="button" class="oct-mode-tab" data-mode="auto">Auto</button>
                    </div>

                    <div class="oct-theme-header-row" style="margin-top: 14px; margin-bottom: 6px;">
                        <span class="oct-section-label" style="font-weight: 600; margin: 0;">Color Palette</span>
                        <span class="oct-subtitle-note">Live Real-Time Preview</span>
                    </div>

                    <div class="oct-swatches-grid" id="oct-swatches-grid"></div>

                    <div class="oct-custom-row" style="margin-top: 10px;">
                        <div class="oct-custom-left">
                            <label class="oct-swatch-circle" id="oct-custom-circle" style="background: linear-gradient(90deg, #0e7490 50%, #38bdf8 50%); cursor:pointer;">
                                <input type="color" id="oct-custom-color-input" value="#0e7490" style="opacity:0; width:0; height:0; position:absolute;">
                            </label>
                            <span class="oct-custom-text">Custom Hex</span>
                        </div>
                        <div class="oct-custom-right">
                            <span class="oct-hex-text" id="oct-hex-val">#0e7490</span>
                            <button type="button" class="oct-apply-btn" id="oct-btn-apply">Apply</button>
                        </div>
                    </div>
                    <div class="oct-theme-header-row" style="margin-top: 14px; margin-bottom: 6px;">
                        <span class="oct-section-label" style="font-weight: 600; margin: 0;">Logo Brand Header (PNG / SVG)</span>
                        <span class="oct-subtitle-note">Ganti Logo OpenWrt dengan Brand Sendiri</span>
                    </div>

                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px; flex-wrap: wrap;">
                        <div id="oct-logo-preview" style="height: 32px; min-width: 60px; max-width: 130px; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.06); padding: 2px 8px; border-radius: 6px; border: 1px solid var(--card-border, #cbd5e1);">
                            <img id="oct-logo-preview-img" src="/luci-static/material/brand.png" style="max-height: 26px; max-width: 100%; object-fit: contain;">
                        </div>
                        <input type="file" id="oct-logo-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif" style="display: none;">
                        <button type="button" class="oct-upload-btn" id="oct-btn-upload-logo">
                            📁 Unggah Logo PNG...
                        </button>
                        <button type="button" class="btn cbi-button cbi-button-reset" id="oct-btn-reset-logo" style="font-size: 11px; padding: 4px 8px;" title="Kembalikan ke Logo Asli OpenWrt">
                            Reset OpenWrt
                        </button>
                    </div>
                    <input type="text" id="oct-custom-logo-input" placeholder="Atau masukkan URL / path file PNG (misal: /luci-static/...)" style="width: 100%; padding: 6px 10px; font-size: 12px; border-radius: 6px; border: 1px solid var(--input-border, #cbd5e1); background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a); box-sizing: border-box;">
                </div>
                <div class="cbi-value-description" style="margin-top: 8px;">
                    Pilih skema warna tema Material dan mode tampilan (Terang / Gelap / Otomatis sesuai sistem). Perubahan langsung aktif dan tersimpan secara otomatis.
                </div>
            </div>
        `;

        if (referenceNode) {
            parent.insertBefore(row, referenceNode);
        } else {
            parent.appendChild(row);
        }

        bindCustomizerEvents(row);
    }

    function bindCustomizerEvents(container) {
        let currentSettings = getSettings();

        function updateModeTabsUI() {
            const tabs = container.querySelectorAll('.oct-mode-tab');
            tabs.forEach(tab => {
                const mode = tab.getAttribute('data-mode');
                if (mode === currentSettings.mode) {
                    tab.classList.add('active');
                    tab.style.backgroundColor = currentSettings.primary;
                    tab.style.color = '#ffffff';
                } else {
                    tab.classList.remove('active');
                    tab.style.backgroundColor = 'transparent';
                    tab.style.color = '';
                }
            });
        }

        container.querySelectorAll('.oct-mode-tab').forEach(tab => {
            tab.onclick = function() {
                currentSettings.mode = this.getAttribute('data-mode');
                updateModeTabsUI();
                applyTheme(currentSettings);
                saveSettings(currentSettings);
            };
        });

        const grid = container.querySelector('#oct-swatches-grid');
        grid.innerHTML = '';
        PRESETS.forEach(p => {
            const item = document.createElement('div');
            item.className = 'oct-swatch-item';
            item.setAttribute('data-id', p.id);

            const [p1, p2] = p.name.split(' ');
            item.innerHTML = `
                <div class="oct-swatch-circle" style="background: linear-gradient(90deg, ${p.primary} 50%, ${p.secondary} 50%);"></div>
                <div class="oct-swatch-name">${p1}<br>${p2 || ''}</div>
            `;

            item.onclick = function() {
                currentSettings.presetId = p.id;
                currentSettings.primary = p.primary;
                currentSettings.secondary = p.secondary;
                updateSelectionUI();
                applyTheme(currentSettings);
                saveSettings(currentSettings);
            };

            grid.appendChild(item);
        });

        function updateSelectionUI() {
            grid.querySelectorAll('.oct-swatch-item').forEach(item => {
                const id = item.getAttribute('data-id');
                if (id === currentSettings.presetId) {
                    item.classList.add('selected');
                    item.style.borderColor = currentSettings.primary;
                    item.style.backgroundColor = currentSettings.primary + '18';
                } else {
                    item.classList.remove('selected');
                    item.style.borderColor = 'transparent';
                    item.style.backgroundColor = 'transparent';
                }
            });

            const customCircle = container.querySelector('#oct-custom-circle');
            const hexVal = container.querySelector('#oct-hex-val');
            const applyBtn = container.querySelector('#oct-btn-apply');
            const colorInput = container.querySelector('#oct-custom-color-input');

            if (customCircle && hexVal && applyBtn && colorInput) {
                customCircle.style.background = `linear-gradient(90deg, ${currentSettings.primary} 50%, ${currentSettings.secondary} 50%)`;
                hexVal.textContent = currentSettings.primary;
                colorInput.value = currentSettings.primary;
                applyBtn.style.backgroundColor = currentSettings.primary;
            }
            updateModeTabsUI();
        }

        const colorInput = container.querySelector('#oct-custom-color-input');
        const customCircle = container.querySelector('#oct-custom-circle');
        const hexVal = container.querySelector('#oct-hex-val');
        const applyBtn = container.querySelector('#oct-btn-apply');

        if (customCircle && colorInput) {
            customCircle.onclick = function() { colorInput.click(); };
        }
        if (hexVal && colorInput) {
            hexVal.onclick = function() { colorInput.click(); };
        }
        if (colorInput) {
            colorInput.oninput = function() {
                const chosen = this.value;
                if (hexVal) hexVal.textContent = chosen;
                if (customCircle) customCircle.style.background = `linear-gradient(90deg, ${chosen} 50%, ${chosen}88 50%)`;
                if (applyBtn) applyBtn.style.backgroundColor = chosen;
            };
        }
        if (applyBtn) {
            applyBtn.onclick = function() {
                currentSettings.presetId = 'custom';
                currentSettings.primary = colorInput ? colorInput.value : currentSettings.primary;
                currentSettings.secondary = colorInput ? colorInput.value : currentSettings.secondary;
                updateSelectionUI();
                applyTheme(currentSettings);
                saveSettings(currentSettings);
            };
        }

        // Logo brand controls
        const logoFileInput = container.querySelector('#oct-logo-file-input');
        const logoUploadBtn = container.querySelector('#oct-btn-upload-logo');
        const logoResetBtn = container.querySelector('#oct-btn-reset-logo');
        const logoPreviewImg = container.querySelector('#oct-logo-preview-img');
        const logoUrlInput = container.querySelector('#oct-custom-logo-input');

        if (logoPreviewImg && currentSettings.customLogo) {
            logoPreviewImg.src = currentSettings.customLogo;
        }
        if (logoUrlInput && currentSettings.customLogo) {
            logoUrlInput.value = currentSettings.customLogo;
        }

        if (logoUploadBtn && logoFileInput) {
            logoUploadBtn.onclick = function() {
                logoFileInput.click();
            };
        }

        if (logoFileInput) {
            logoFileInput.onchange = function(e) {
                const file = e.target.files[0];
                if (!file) return;
                processImageFile(file, 300, 80, function(dataUrl) {
                    currentSettings.customLogo = dataUrl;
                    if (logoPreviewImg) logoPreviewImg.src = dataUrl;
                    if (logoUrlInput) logoUrlInput.value = dataUrl;
                    saveSettings(currentSettings);
                    applyTheme(currentSettings);
                });
            };
        }

        if (logoResetBtn) {
            logoResetBtn.onclick = function() {
                currentSettings.customLogo = '';
                if (logoPreviewImg) logoPreviewImg.src = '/luci-static/material/brand.png';
                if (logoUrlInput) logoUrlInput.value = '';
                saveSettings(currentSettings);
                applyTheme(currentSettings);
            };
        }

        if (logoUrlInput) {
            logoUrlInput.oninput = function() {
                const val = this.value.trim();
                currentSettings.customLogo = val;
                if (logoPreviewImg) {
                    logoPreviewImg.src = val || '/luci-static/material/brand.png';
                }
                saveSettings(currentSettings);
                applyTheme(currentSettings);
            };
        }

        updateSelectionUI();
    }

    // 2. INJECT SHORTCUTS MANAGER ROW
    function injectShortcutsManagerRow(parent, referenceNode) {
        if (document.getElementById('cbi-material-shortcuts-manager')) return;

        const row = document.createElement('div');
        row.className = 'cbi-value';
        row.id = 'cbi-material-shortcuts-manager';
        row.setAttribute('data-name', '_material_shortcuts_manager');

        row.innerHTML = `
            <label class="cbi-value-title">Header Shortcuts & Icons</label>
            <div class="cbi-value-field">
                <div class="oct-embedded-card" style="max-width: 580px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; gap: 10px; flex-wrap: wrap;">
                        <div>
                            <span style="font-weight: 700; font-size: 14px; color: var(--text-primary, #0f172a);">Pintasan Header Router</span>
                            <div style="font-size: 11.5px; color: var(--text-muted, #64748b);">Kelola ikon dan teks cepat (Modem, Terminal, Yacd, OpenClash, dsb.) di bar header.</div>
                        </div>
                        <div style="display: flex; gap: 6px;">
                            <button type="button" class="btn cbi-button cbi-button-apply" id="btn-add-shortcut" style="padding: 4px 12px; font-size: 12px;">+ Tambah Pintasan</button>
                            <button type="button" class="btn cbi-button cbi-button-reset" id="btn-reset-shortcuts" style="padding: 4px 10px; font-size: 12px;" title="Kembalikan susunan awal">Reset</button>
                        </div>
                    </div>

                    <div id="shortcuts-manager-list" class="oct-shortcuts-list"></div>
                </div>
                <div class="cbi-value-description" style="margin-top: 8px;">
                    Anda bisa menambah atau mengurangi ikon, mengubah label teks, serta mengganti URL sesuka hati. Perubahan langsung aktif di header tanpa perlu restart router.
                </div>
            </div>
        `;

        if (referenceNode) {
            parent.insertBefore(row, referenceNode);
        } else {
            parent.appendChild(row);
        }

        bindShortcutsManagerEvents(row);
    }

    function bindShortcutsManagerEvents(container) {
        const listEl = container.querySelector('#shortcuts-manager-list');
        const btnAdd = container.querySelector('#btn-add-shortcut');
        const btnReset = container.querySelector('#btn-reset-shortcuts');

        function renderList() {
            const shortcuts = getShortcuts();
            listEl.innerHTML = '';

            if (!shortcuts || shortcuts.length === 0) {
                listEl.innerHTML = `<div style="text-align:center; padding: 16px; color: var(--text-muted); font-size: 12px;">Belum ada pintasan. Klik tombol "+ Tambah Pintasan" di atas.</div>`;
                return;
            }

            shortcuts.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'oct-shortcut-card';

                let iconPreview = '';
                if (item.icon && SVG_ICONS[item.icon]) {
                    iconPreview = SVG_ICONS[item.icon];
                } else if (item.icon && item.icon.trim() !== '') {
                    iconPreview = `<img src="${item.icon}" alt="" onerror="this.onerror=null; this.src='${DEFAULT_FALLBACK_ICON}';">`;
                } else {
                    iconPreview = `<img src="${DEFAULT_FALLBACK_ICON}" alt="OpenWrt">`;
                }

                const typeLabel = item.type === 'icon' ? 'Icon' : (item.type === 'text' ? 'Teks' : 'Icon+Teks');

                card.innerHTML = `
                    <div class="oct-sc-left">
                        <div class="oct-sc-badge">${iconPreview}</div>
                        <div class="oct-sc-info">
                            <div class="oct-sc-title">
                                ${item.title}
                                <span class="oct-sc-type-tag">${typeLabel}</span>
                            </div>
                            <div class="oct-sc-url" title="${item.url}">${item.url}</div>
                        </div>
                    </div>
                    <div class="oct-sc-actions">
                        ${index > 0 ? `<button type="button" class="oct-btn-icon btn-move-up" title="Geser ke kiri/atas">▲</button>` : ''}
                        ${index < shortcuts.length - 1 ? `<button type="button" class="oct-btn-icon btn-move-down" title="Geser ke kanan/bawah">▼</button>` : ''}
                        <button type="button" class="oct-btn-icon btn-edit-sc" title="Edit Pintasan">✎</button>
                        <button type="button" class="oct-btn-icon delete btn-del-sc" title="Hapus Pintasan">✕</button>
                    </div>
                `;

                // Events
                const btnUp = card.querySelector('.btn-move-up');
                if (btnUp) {
                    btnUp.onclick = () => {
                        const temp = shortcuts[index - 1];
                        shortcuts[index - 1] = shortcuts[index];
                        shortcuts[index] = temp;
                        saveShortcuts(shortcuts);
                        renderList();
                    };
                }

                const btnDown = card.querySelector('.btn-move-down');
                if (btnDown) {
                    btnDown.onclick = () => {
                        const temp = shortcuts[index + 1];
                        shortcuts[index + 1] = shortcuts[index];
                        shortcuts[index] = temp;
                        saveShortcuts(shortcuts);
                        renderList();
                    };
                }

                card.querySelector('.btn-edit-sc').onclick = () => {
                    openShortcutModal(item, (updatedItem) => {
                        shortcuts[index] = updatedItem;
                        saveShortcuts(shortcuts);
                        renderList();
                    });
                };

                card.querySelector('.btn-del-sc').onclick = () => {
                    if (confirm(`Hapus pintasan "${item.title}"?`)) {
                        shortcuts.splice(index, 1);
                        saveShortcuts(shortcuts);
                        renderList();
                    }
                };

                listEl.appendChild(card);
            });
        }

        btnAdd.onclick = () => {
            openShortcutModal(null, (newItem) => {
                const shortcuts = getShortcuts();
                shortcuts.push(newItem);
                saveShortcuts(shortcuts);
                renderList();
            });
        };

        btnReset.onclick = () => {
            if (confirm('Kembalikan daftar pintasan header ke susunan bawaan default?')) {
                saveShortcuts(DEFAULT_SHORTCUTS);
                renderList();
            }
        };

        renderList();
    }

    // Modal dialog for Add / Edit Shortcut
    function openShortcutModal(editItem, onSaveCallback) {
        const isEdit = Boolean(editItem);
        const item = editItem || {
            id: 'sc-' + Date.now(),
            title: '',
            url: '',
            type: 'icon',
            icon: '/luci-static/material/navbar/openclash.png',
            target: '_self'
        };

        const PRESET_ICONS = [
            { group: 'Ikon PNG Re-Yre (Bawaan)', items: [
                { val: '/luci-static/material/navbar/nikki.png', label: 'Nikki (PNG)' },
                { val: '/luci-static/material/navbar/openclash.png', label: 'OpenClash (PNG)' },
                { val: '/luci-static/material/navbar/passwall.png', label: 'Passwall (PNG)' },
                { val: '/luci-static/material/navbar/passwall2.png', label: 'Passwall 2 (PNG)' },
                { val: '/luci-static/material/navbar/tinyfm.png', label: 'File Manager / TinyFM (PNG)' },
                { val: '/luci-static/material/navbar/netmon.png', label: 'Netmon / Realtime (PNG)' },
                { val: '/luci-static/material/navbar/interface.png', label: 'Network / Interface (PNG)' }
            ]},
            { group: 'Ikon Default OpenWrt (Fallback)', items: [
                { val: DEFAULT_FALLBACK_ICON, label: 'OpenWrt Badge (Logo Bawaan)' }
            ]},
            { group: 'Ikon Vektor (SVG)', items: [
                { val: 'openclash', label: 'OpenClash (Vektor)' },
                { val: 'terminal', label: 'Terminal / Konsol (TTYd)' },
                { val: 'folder', label: 'Folder (File Manager)' },
                { val: 'netdata', label: 'Netdata (Grafik Aktivitas)' },
                { val: 'portainer', label: 'Portainer / Docker' },
                { val: 'modem', label: 'Modem / Sinyal' },
                { val: 'gauge', label: 'Yacd / Speedometer' },
                { val: 'settings', label: 'Pengaturan (Roda Gigi)' },
                { val: 'youtube', label: 'YouTube' },
                { val: 'globe', label: 'Globe / Web Umum' }
            ]}
        ];

        let isKnown = false;
        PRESET_ICONS.forEach(g => {
            g.items.forEach(it => {
                if (it.val === item.icon) isKnown = true;
            });
        });
        const isCustom = Boolean(item.icon && !isKnown);

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'oct-modal-backdrop';

        let optionsHtml = '';
        PRESET_ICONS.forEach(g => {
            optionsHtml += `<optgroup label="${g.group}">`;
            g.items.forEach(it => {
                const sel = (!isCustom && item.icon === it.val) ? 'selected' : '';
                optionsHtml += `<option value="${it.val}" ${sel}>${it.label}</option>`;
            });
            optionsHtml += `</optgroup>`;
        });
        optionsHtml += `<optgroup label="Kustom / Unggah Sendiri">`;
        optionsHtml += `<option value="custom" ${isCustom ? 'selected' : ''}>Unggah File PNG / Custom URL...</option>`;
        optionsHtml += `</optgroup>`;

        modalOverlay.innerHTML = `
            <div class="oct-modal-dialog">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                    <span style="font-weight:700; font-size:15px;">${isEdit ? 'Edit Pintasan' : 'Tambah Pintasan Baru'}</span>
                    <button type="button" class="oct-btn-icon" id="modal-close-btn" style="border:none;">✕</button>
                </div>

                <div class="oct-form-group">
                    <label>Judul / Teks Label</label>
                    <input type="text" id="m-sc-title" value="${item.title || ''}" placeholder="misal: Modem, Terminal, Yacd, YouTube">
                </div>

                <div class="oct-form-group">
                    <label>URL / Link Tujuan</label>
                    <input type="text" id="m-sc-url" value="${item.url || ''}" placeholder="misal: /cgi-bin/luci/admin/services/openclash, :9090, /tinyfm.php">
                    <div style="font-size:11px; color:var(--text-muted); margin-top:3px;">
                        Tip: Gunakan <code>:port</code> (contoh: <code>:9090</code> atau <code>:19999</code>) untuk port router otomatis.
                    </div>
                </div>

                <div class="oct-form-group">
                    <label>Tipe Tampilan di Header</label>
                    <select id="m-sc-type">
                        <option value="icon" ${item.type === 'icon' ? 'selected' : ''}>Icon Bulat (seperti OpenClash, TinyFM)</option>
                        <option value="text" ${item.type === 'text' ? 'selected' : ''}>Teks Saja (seperti Terminal, Yacd)</option>
                        <option value="both" ${item.type === 'both' ? 'selected' : ''}>Icon + Teks</option>
                    </select>
                </div>

                <div class="oct-form-group" id="m-sc-icon-group" style="${item.type === 'text' ? 'display:none;' : ''}">
                    <label>Pilihan Ikon</label>
                    <select id="m-sc-icon">
                        ${optionsHtml}
                    </select>

                    <div style="display:flex; align-items:center; gap:10px; margin-top:8px; padding:6px 10px; background:rgba(0,0,0,0.04); border-radius:8px; border:1px solid var(--card-border, #cbd5e1);">
                        <div id="m-sc-preview-badge" style="width:34px; height:34px; border-radius:50%; background:rgba(0,0,0,0.12); display:flex; align-items:center; justify-content:center; overflow:hidden; flex-shrink:0; box-shadow:0 1px 3px rgba(0,0,0,0.15);"></div>
                        <div style="flex:1;">
                            <div style="font-size:12px; font-weight:600;">Pratinjau Ikon</div>
                            <div style="font-size:10px; color:var(--text-muted);">Jika PNG tidak ditemukan, otomatis fallback ke logo default OpenWrt.</div>
                        </div>
                    </div>
                </div>

                <div class="oct-form-group" id="m-sc-custom-icon-group" style="${(isCustom && item.type !== 'text') ? '' : 'display:none;'} margin-top:10px;">
                    <label>Unggah PNG / URL Gambar Kustom</label>
                    <div style="display:flex; gap:8px; margin-bottom:8px;">
                        <input type="file" id="m-sc-file-input" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif" style="display:none;">
                        <button type="button" class="oct-upload-btn" id="m-sc-btn-upload" style="flex:1;">
                            📁 Unggah PNG dari Komputer/HP
                        </button>
                    </div>
                    <input type="text" id="m-sc-custom-icon" value="${isCustom ? item.icon : ''}" placeholder="misal: /luci-static/material/navbar/myicon.png atau https://...">
                </div>

                <div class="oct-form-group">
                    <label>Target Pembukaan</label>
                    <select id="m-sc-target">
                        <option value="_self" ${item.target === '_self' ? 'selected' : ''}>Tab yang Sama (_self)</option>
                        <option value="_blank" ${item.target === '_blank' ? 'selected' : ''}>Tab Baru (_blank)</option>
                    </select>
                </div>

                <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:18px;">
                    <button type="button" class="btn cbi-button cbi-button-reset" id="m-btn-cancel">Batal</button>
                    <button type="button" class="btn cbi-button cbi-button-apply" id="m-btn-save">Simpan Pintasan</button>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        const typeSelect = modalOverlay.querySelector('#m-sc-type');
        const iconGroup = modalOverlay.querySelector('#m-sc-icon-group');
        const iconSelect = modalOverlay.querySelector('#m-sc-icon');
        const customIconGroup = modalOverlay.querySelector('#m-sc-custom-icon-group');
        const customIconInput = modalOverlay.querySelector('#m-sc-custom-icon');
        const previewBadge = modalOverlay.querySelector('#m-sc-preview-badge');
        const fileInput = modalOverlay.querySelector('#m-sc-file-input');
        const uploadBtn = modalOverlay.querySelector('#m-sc-btn-upload');

        function updatePreview() {
            let val = iconSelect.value;
            if (val === 'custom') {
                val = customIconInput.value.trim();
            }
            if (!val) {
                val = DEFAULT_FALLBACK_ICON;
            }
            if (SVG_ICONS[val]) {
                previewBadge.innerHTML = SVG_ICONS[val];
            } else {
                previewBadge.innerHTML = `<img src="${val}" alt="preview" style="width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;" onerror="this.onerror=null; this.src='${DEFAULT_FALLBACK_ICON}';">`;
            }
        }

        updatePreview();

        typeSelect.onchange = function() {
            const isText = (this.value === 'text');
            iconGroup.style.display = isText ? 'none' : '';
            customIconGroup.style.display = (!isText && iconSelect.value === 'custom') ? '' : 'none';
        };

        iconSelect.onchange = function() {
            customIconGroup.style.display = (this.value === 'custom') ? '' : 'none';
            updatePreview();
        };

        customIconInput.oninput = function() {
            updatePreview();
        };

        if (uploadBtn && fileInput) {
            uploadBtn.onclick = function() {
                fileInput.click();
            };
            fileInput.onchange = function(e) {
                const file = e.target.files[0];
                if (!file) return;
                processImageFile(file, 96, 96, function(dataUrl) {
                    customIconInput.value = dataUrl;
                    updatePreview();
                });
            };
        }

        function closeModal() {
            modalOverlay.remove();
        }

        modalOverlay.querySelector('#modal-close-btn').onclick = closeModal;
        modalOverlay.querySelector('#m-btn-cancel').onclick = closeModal;

        modalOverlay.querySelector('#m-btn-save').onclick = function() {
            const title = modalOverlay.querySelector('#m-sc-title').value.trim();
            const url = modalOverlay.querySelector('#m-sc-url').value.trim();
            const type = typeSelect.value;
            let icon = iconSelect.value;
            if (icon === 'custom') {
                icon = customIconInput.value.trim();
            }
            if (type !== 'text' && (!icon || icon.trim() === '')) {
                // Fallback otomatis ke default OpenWrt logo jika icon tidak diisi
                icon = DEFAULT_FALLBACK_ICON;
            }
            const target = modalOverlay.querySelector('#m-sc-target').value;

            if (!title) {
                alert('Silakan masukkan judul atau teks label pintasan.');
                return;
            }
            if (!url) {
                alert('Silakan masukkan URL atau path tujuan.');
                return;
            }

            closeModal();
            onSaveCallback({
                id: item.id || ('sc-' + Date.now()),
                title,
                url,
                type,
                icon: type === 'text' ? '' : icon,
                target
            });
        };
    }

    // Init & Listeners
    document.addEventListener('DOMContentLoaded', function() {
        applyTheme(getSettings());
        removeOldHeaderButton();
        renderHeaderShortcuts();
        checkAndInjectSystemCustomizer();

        const targetNode = document.getElementById('maincontent') || document.body;
        if (targetNode) {
            const observer = new MutationObserver(function() {
                checkAndInjectSystemCustomizer();
                renderHeaderShortcuts();
            });
            observer.observe(targetNode, { childList: true, subtree: true });
        }
    });

    window.addEventListener('popstate', () => {
        checkAndInjectSystemCustomizer();
        renderHeaderShortcuts();
    });
    window.addEventListener('hashchange', () => {
        checkAndInjectSystemCustomizer();
        renderHeaderShortcuts();
    });
})();
