/**
 * CoinRadar - HilltopAds Comprehensive Integration Configuration
 * ==============================================================
 * This script handles all HilltopAds ad formats and zones:
 *  - Zone 1: Popunder / OnClick
 *  - Zone 2: In-Page Push (IPP) MultiTag
 *  - Zone 3: MultiTag Banner (728x90 Top Leaderboard & 300x250 Sidebar)
 *  - Zone 4: Video Slider MultiTag
 *  - Zone 5: Direct Link / SmartLink (attached to 'Trade Now', 'Claim Airdrop' buttons)
 *  - Zone 6: Video VAST (integrated with HTML5 market briefing video player)
 */

(function () {
  'use strict';

  // Global HilltopAds Configuration
  window.HILLTOPADS_CONFIG = {
    publisherId: 'HTA_PUBLISHER_ID_HERE', // Replace with your HilltopAds Publisher ID
    debugMode: true, // Set to false in production
    zones: {
      // Zone 1: Popunder / OnClick
      zone1_popunder: {
        zoneId: '1001234', // Replace with your Zone 1 ID
        enabled: true,
        scriptUrl: '//example-adnetwork.com/pop.js?zone=1001234',
        frequencyCapHours: 1, // Trigger popunder once per hour per user
        cookieName: 'cr_hta_pop_seen'
      },

      // Zone 2: In-Page Push (IPP) MultiTag
      zone2_ipp: {
        zoneId: '1002345', // Replace with your Zone 2 ID
        enabled: true,
        scriptUrl: '//example-adnetwork.com/ipp.js?zone=1002345',
        delayMs: 3500 // Show push after initial user engagement
      },

      // Zone 3: MultiTag Banners (Leaderboard 728x90 & Sidebar 300x250)
      zone3_leaderboard: {
        zoneId: '1003456', // Replace with your Zone 3 Leaderboard ID
        enabled: true,
        width: 728,
        height: 90,
        containerId: 'ad-zone-leaderboard',
        scriptUrl: '//example-adnetwork.com/banner.js?zone=1003456&size=728x90'
      },
      zone3_sidebar: {
        zoneId: '1003457', // Replace with your Zone 3 Sidebar ID
        enabled: true,
        width: 300,
        height: 250,
        containerId: 'ad-zone-sidebar-square',
        scriptUrl: '//example-adnetwork.com/banner.js?zone=1003457&size=300x250'
      },

      // Zone 4: Video Slider MultiTag
      zone4_videoSlider: {
        zoneId: '1004567', // Replace with your Zone 4 ID
        enabled: true,
        containerId: 'ad-zone-video-slider',
        scriptUrl: '//example-adnetwork.com/slider.js?zone=1004567',
        autoSlideInMs: 4000
      },

      // Zone 5: Direct Link / SmartLink
      zone5_directLink: {
        zoneId: '1005678', // Replace with your Zone 5 ID
        enabled: true,
        // High-converting crypto smartlink endpoint
        smartLinkUrl: 'https://hilltopads.com/smartlink/?zoneid=1005678&subid1=coinradar&subid2=crypto_portal',
        targetWindow: '_blank',
        fallbackUrls: {
          trade: 'https://hilltopads.com/smartlink/?zoneid=1005678&intent=trade',
          airdrop: 'https://hilltopads.com/smartlink/?zoneid=1005678&intent=airdrop',
          general: 'https://hilltopads.com/smartlink/?zoneid=1005678&intent=general'
        }
      },

      // Zone 6: Video VAST
      zone6_videoVast: {
        zoneId: '1006789', // Replace with your Zone 6 ID
        enabled: true,
        vastTagUrl: 'https://hilltopads.com/vast/?zoneid=1006789&content_page_url=' + encodeURIComponent(window.location.href),
        skipOffsetSec: 5,
        adTimeoutMs: 8000
      }
    }
  };

  const CFG = window.HILLTOPADS_CONFIG;

  function log(msg, data) {
    if (CFG.debugMode) {
      console.log(`[CoinRadar / HilltopAds] ${msg}`, data || '');
    }
  }

  // ==========================================
  // ZONE 1: Popunder / OnClick Handler
  // ==========================================
  function initPopunder() {
    const zone = CFG.zones.zone1_popunder;
    if (!zone.enabled) return;

    // Check frequency cap
    function hasSeenPopunder() {
      try {
        const lastSeen = localStorage.getItem(zone.cookieName);
        if (!lastSeen) return false;
        const diffMs = Date.now() - parseInt(lastSeen, 10);
        return diffMs < zone.frequencyCapHours * 60 * 60 * 1000;
      } catch (e) {
        return false;
      }
    }

    function markPopunderSeen() {
      try {
        localStorage.setItem(zone.cookieName, Date.now().toString());
      } catch (e) { }
    }

    log('Zone 1 (Popunder/OnClick) initialized. Ready for user click trigger.');

    const clickTrigger = function (e) {
      // Don't fire if clicking directly on a Zone 5 SmartLink button
      if (e.target.closest('.smartlink-trigger') || e.target.closest('button.btn-trade')) {
        return;
      }

      if (hasSeenPopunder()) {
        log('Popunder frequency capped.');
        return;
      }

      markPopunderSeen();
      log('Popunder triggered by user click.');

      // In production, execute the HilltopAds Popunder Tag:
      /*
      (function(s, u, z, p) {
        s.src = u;
        s.setAttribute('data-zone', z);
        document.head.appendChild(s);
      })(document.createElement('script'), zone.scriptUrl, zone.zoneId);
      */

      // Simulated popunder notification banner / popup for demonstration
      showAdToast('HilltopAds Zone 1 (Popunder/OnClick) simulated trigger.');
      window.removeEventListener('click', clickTrigger);
    };

    window.addEventListener('click', clickTrigger, { once: false });
  }

  // ==========================================
  // ZONE 2: In-Page Push (IPP) MultiTag
  // ==========================================
  function initInPagePush() {
    const zone = CFG.zones.zone2_ipp;
    if (!zone.enabled) return;

    log('Zone 2 (In-Page Push) scheduled in ' + zone.delayMs + 'ms');

    setTimeout(() => {
      // Production Script Injection Placeholder:
      /*
      const ippScript = document.createElement('script');
      ippScript.async = true;
      ippScript.src = zone.scriptUrl;
      ippScript.setAttribute('data-cfasync', 'false');
      document.body.appendChild(ippScript);
      */

      // Live visual container injection for seamless UI preview
      renderInPagePushUI();
    }, zone.delayMs);
  }

  function renderInPagePushUI() {
    if (document.getElementById('hta-ipp-container')) return;

    const ippEl = document.createElement('div');
    ippEl.id = 'hta-ipp-container';
    ippEl.className = 'hta-ipp-card slide-in-up';
    ippEl.innerHTML = `
      <div class="ipp-header">
        <span class="ipp-tag">HilltopAds MultiTag • Zone 2</span>
        <button class="ipp-close" id="ipp-close-btn" title="Dismiss">&times;</button>
      </div>
      <div class="ipp-body">
        <div class="ipp-icon-glow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        </div>
        <div class="ipp-content">
          <h4>🔥 Whale Movement Detected</h4>
          <p>Binance inflow +2,400 BTC ($162M). Review institutional buy walls before weekly close.</p>
        </div>
      </div>
      <div class="ipp-actions">
        <a href="${CFG.zones.zone5_directLink.smartLinkUrl}&intent=ipp_alert" target="_blank" class="btn-ipp-cta smartlink-trigger">
          View Alpha Signal &rarr;
        </a>
      </div>
    `;

    document.body.appendChild(ippEl);

    document.getElementById('ipp-close-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      ippEl.classList.add('slide-out-down');
      setTimeout(() => ippEl.remove(), 400);
      log('Zone 2 IPP dismissed by user');
    });

    log('Zone 2 (In-Page Push) rendered into view.');
  }

  // ==========================================
  // ZONE 3: MultiTag Banners (728x90 & 300x250)
  // ==========================================
  function initBanners() {
    const lbZone = CFG.zones.zone3_leaderboard;
    const sbZone = CFG.zones.zone3_sidebar;

    // Leaderboard (728x90)
    const lbContainer = document.getElementById(lbZone.containerId);
    if (lbContainer && lbZone.enabled) {
      log('Zone 3 Leaderboard slot prepared', lbZone.zoneId);
      // Production tag snippet placeholder:
      /*
      const s = document.createElement('script');
      s.src = lbZone.scriptUrl;
      s.async = true;
      lbContainer.appendChild(s);
      */
    }

    // Sidebar Banner (300x250)
    const sbContainer = document.getElementById(sbZone.containerId);
    if (sbContainer && sbZone.enabled) {
      log('Zone 3 Sidebar slot prepared', sbZone.zoneId);
      /*
      const s = document.createElement('script');
      s.src = sbZone.scriptUrl;
      s.async = true;
      sbContainer.appendChild(s);
      */
    }
  }

  // ==========================================
  // ZONE 4: Video Slider MultiTag
  // ==========================================
  function initVideoSlider() {
    const zone = CFG.zones.zone4_videoSlider;
    if (!zone.enabled) return;

    const sliderContainer = document.getElementById(zone.containerId);
    if (!sliderContainer) return;

    log('Zone 4 (Video Slider) scheduled in ' + zone.autoSlideInMs + 'ms');

    setTimeout(() => {
      sliderContainer.classList.add('active');
      log('Zone 4 Video Slider opened');

      // Bind close button
      const closeBtn = sliderContainer.querySelector('.video-slider-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          sliderContainer.classList.remove('active');
          log('Zone 4 Video Slider closed');
        });
      }
    }, zone.autoSlideInMs);
  }

  // ==========================================
  // ZONE 5: Direct Link / SmartLink
  // ==========================================
  function initDirectLinks() {
    const zone = CFG.zones.zone5_directLink;
    if (!zone.enabled) return;

    // Select all buttons designated for smartlinks
    const smartLinkButtons = document.querySelectorAll(
      '.btn-trade, .btn-claim-airdrop, .smartlink-trigger, [data-ad-zone="zone5"]'
    );

    smartLinkButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const intent = btn.getAttribute('data-intent') || 'trade';
        const url = zone.fallbackUrls[intent] || zone.smartLinkUrl;

        log('Zone 5 Direct Link triggered. Intent: ' + intent + ' -> ' + url);

        // Open HilltopAds SmartLink in new tab / window
        if (btn.tagName === 'A' && !btn.getAttribute('href')) {
          btn.setAttribute('href', url);
          btn.setAttribute('target', zone.targetWindow);
          btn.setAttribute('rel', 'noopener noreferrer');
        } else if (btn.tagName === 'BUTTON') {
          window.open(url, zone.targetWindow, 'noopener,noreferrer');
        }
      });
    });

    log(`Zone 5 Direct Links attached to ${smartLinkButtons.length} interactive buttons.`);
  }

  // ==========================================
  // ZONE 6: Video VAST Integration with HTML5 Player
  // ==========================================
  function initVideoVAST() {
    const zone = CFG.zones.zone6_videoVast;
    if (!zone.enabled) return;

    const videoEl = document.getElementById('market-briefing-player');
    const adOverlay = document.getElementById('vast-ad-overlay');
    const skipBtn = document.getElementById('vast-skip-btn');
    const timerText = document.getElementById('vast-timer-count');
    const playTriggerBtn = document.getElementById('vast-play-btn');

    if (!videoEl || !adOverlay) {
      log('Zone 6 Video elements not found, skipping VAST player attach');
      return;
    }

    log('Zone 6 (Video VAST) initialized for video player.');

    let adPlayed = false;
    let countdownInterval = null;
    let secondsLeft = zone.skipOffsetSec;

    function startVASTPreRoll() {
      if (adPlayed) {
        playMainVideo();
        return;
      }

      log('Requesting HilltopAds VAST Tag: ' + zone.vastTagUrl);
      adOverlay.classList.remove('hidden');
      videoEl.pause();
      secondsLeft = zone.skipOffsetSec;
      timerText.textContent = secondsLeft;
      skipBtn.disabled = true;
      skipBtn.classList.add('disabled');

      // Countdown for VAST preroll
      countdownInterval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft > 0) {
          timerText.textContent = secondsLeft;
        } else {
          clearInterval(countdownInterval);
          skipBtn.disabled = false;
          skipBtn.classList.remove('disabled');
          skipBtn.innerHTML = 'Skip Ad &rarr;';
        }
      }, 1000);
    }

    function playMainVideo() {
      adOverlay.classList.add('hidden');
      clearInterval(countdownInterval);
      adPlayed = true;
      videoEl.play().catch((err) => {
        log('Main video play caught:', err.message);
      });
      log('VAST completed or skipped. Main crypto briefing video now streaming.');
    }

    if (playTriggerBtn) {
      playTriggerBtn.addEventListener('click', () => {
        startVASTPreRoll();
      });
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        if (!skipBtn.disabled) {
          playMainVideo();
        }
      });
    }

    // Direct link click on the VAST ad banner inside video player
    const adBannerLink = adOverlay.querySelector('.vast-ad-content');
    if (adBannerLink) {
      adBannerLink.addEventListener('click', () => {
        const smartUrl = CFG.zones.zone5_directLink.smartLinkUrl + '&intent=vast_click';
        window.open(smartUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  // Visual toast notification helper for debugging
  function showAdToast(text) {
    if (!CFG.debugMode) return;
    const toast = document.createElement('div');
    toast.className = 'hta-debug-toast';
    toast.innerHTML = `<span>⚡</span> <span>${text}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // Initialize all HilltopAds ad zones on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    log('DOM loaded, initializing HilltopAds multi-format ad network integration.');
    initPopunder();
    initInPagePush();
    initBanners();
    initVideoSlider();
    initDirectLinks();
    initVideoVAST();
  });

})();
