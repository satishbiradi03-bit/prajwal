/**
 * CurcumaMaster | Precision 1-Acre Turmeric Agronomy & Profitability Engine
 * ICAR-IISR Kozhikode & Karnataka Agricultural Universities Compliant Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initMobileNav();
  initBiophysicalSimulator();
  initVarietySelector();
  initSeedCalculator();
  initFertigationEngine();
  initCalendarTimeline();
  initIPDMGrid();
  initProfitSimulator();
  initPrintHandler();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('curcuma_theme') || 'theme-light';
  
  document.body.className = savedTheme;
  updateThemeIcon(savedTheme, icon);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('theme-dark');
    const newTheme = isDark ? 'theme-light' : 'theme-dark';
    document.body.className = newTheme;
    localStorage.setItem('curcuma_theme', newTheme);
    updateThemeIcon(newTheme, icon);
  });
}

function updateThemeIcon(theme, iconEl) {
  iconEl.textContent = theme === 'theme-dark' ? '☀️' : '🌙';
}

/* ==========================================================================
   2. Scroll Progress & Navigation
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  toggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. Section 1: Biophysical Reality Simulator (Clump Wt & Subterranean Density)
   ========================================================================== */
function initBiophysicalSimulator() {
  const slider = document.getElementById('bio-yield-slider');
  const yieldDisp = document.getElementById('bio-yield-display');
  const clumpWtDisp = document.getElementById('clump-wt-display');
  const clumpStatus = document.getElementById('clump-wt-status');
  const densityDisp = document.getElementById('density-display');
  const dryDisp = document.getElementById('bio-dry-display');
  const assessTitle = document.getElementById('bio-assessment');
  const assessDesc = document.getElementById('bio-assessment-desc');

  const ACRE_SQ_M = 4047;
  const STANDARD_PLANTS = 28000;

  function update() {
    const yieldKg = parseFloat(slider.value);
    const yieldTonnes = (yieldKg / 1000).toFixed(1);
    yieldDisp.textContent = `${yieldKg.toLocaleString()} kg (${yieldTonnes} t)`;

    // Required clump weight
    const clumpWt = (yieldKg / STANDARD_PLANTS).toFixed(2);
    clumpWtDisp.textContent = `${clumpWt} kg`;

    // Density per square meter
    const density = (yieldKg / ACRE_SQ_M).toFixed(2);
    densityDisp.textContent = `${density} kg/m²`;

    // Dry recovery at standard 19%
    const dryYieldQ = ((yieldKg * 0.19) / 100).toFixed(1);
    dryDisp.textContent = `${dryYieldQ} Quintals`;

    // Evaluation
    if (yieldKg <= 5000) {
      clumpStatus.textContent = '✓ Conventional Baseline (4–5 t)';
      clumpStatus.className = 'stat-verdict verdict-warn';
      assessTitle.textContent = 'Rain-Fed Baseline';
      assessTitle.className = 'stat-number text-orange';
      assessDesc.textContent = 'Typical low-input farmer yield without drip fertigation (0.14 kg clump wt).';
    } else if (yieldKg <= 9000) {
      clumpStatus.textContent = '✓ Moderate Farm Management';
      clumpStatus.className = 'stat-verdict verdict-pass';
      assessTitle.textContent = 'Commercial Standard';
      assessTitle.className = 'stat-number text-gold';
      assessDesc.textContent = 'Common under standard furrow irrigation and conventional NPK.';
    } else if (yieldKg <= 13000) {
      clumpStatus.textContent = '✓ Optimal Precision Target';
      clumpStatus.className = 'stat-verdict verdict-pass';
      assessTitle.textContent = 'Optimal Commercial';
      assessTitle.className = 'stat-number text-emerald';
      assessDesc.textContent = 'Standard expected yield with Broad Raised Bed (BBF) + Drip Fertigation.';
    } else if (yieldKg <= 16500) {
      clumpStatus.textContent = '★ Elite High-Yield Frontier';
      clumpStatus.className = 'stat-verdict verdict-pass';
      assessTitle.textContent = 'World-Class Frontier';
      assessTitle.className = 'stat-number text-green';
      assessDesc.textContent = 'Recorded in top trial plots with poly-mulch and ICAR-IISR cultivars.';
    } else {
      clumpStatus.textContent = '★ Upper Biological Ceiling';
      clumpStatus.className = 'stat-verdict verdict-warn';
      assessTitle.textContent = 'Maximum Potential';
      assessTitle.className = 'stat-number text-gold';
      assessDesc.textContent = 'Near the biophysical limit for a 1-acre C3 turmeric crop under ideal sunlight and care.';
    }
  }

  slider.addEventListener('input', update);
  update();
}

/* ==========================================================================
   4. Section 2: Cultivar Selection Matrix
   ========================================================================== */
const VARIETY_DATA = {
  pragati: {
    name: 'IISR Pragati',
    badge: 'Short Duration • High Curcumin • ICAR-IISR Certified',
    duration: '180 Days (Early Maturing)',
    curcumin: '5.02%',
    oleoresin: '8.9%',
    dryRecovery: '17.5% – 18.5%',
    potentialYield: '12 – 14 Tonnes/Acre (Fresh)',
    rotTolerance: 'High (Escapes late-season root-rot pressure)',
    marketDemand: 'Premium Pharma & Export Powder',
    description: 'Developed by ICAR-IISR Kozhikode through clonal selection from open-pollinated progeny. Excellent choice for Karnataka as it vacates the land by December, protecting the farmer against late moisture stress and secondary Pythium flare-ups.',
    pros: [
      'Early harvest allows double-cropping with pulses/vegetables',
      'High curcumin (>5%) commands ₹1,000/q mandi premium',
      'Compact clump architecture fits BBF 3-row planting'
    ],
    cons: [
      'Slightly lower dry recovery percentage than Alleppey Supreme',
      'Requires strict early basal phosphorus for root anchoring'
    ]
  },
  prabha: {
    name: 'IISR Prabha',
    badge: 'Pharma Grade • Very High Curcumin • ICAR-IISR',
    duration: '195 Days (Medium-Early)',
    curcumin: '6.52% (Industry Benchmark)',
    oleoresin: '15.0%',
    dryRecovery: '19.0% – 20.0%',
    potentialYield: '13 – 15 Tonnes/Acre (Fresh)',
    rotTolerance: 'Moderate',
    marketDemand: 'Direct Industrial Extraction (Synthite / Arjuna)',
    description: 'An elite selection possessing an extraordinary 6.52% curcumin content and 15% oleoresin. Heavy primary fingers make this the premier choice for contract farming with oleoresin extractors who pay direct quality-based incentives.',
    pros: [
      'Highest curcumin percentage among commercially released varieties',
      'Thick, bold primary fingers with intense orange-red core',
      'Very strong demand from international nutraceutical buyers'
    ],
    cons: [
      'Requires proactive Trichoderma drenching at tillering stage',
      'Sensitive to water stagnation exceeding 6 hours'
    ]
  },
  supreme: {
    name: 'IISR Alleppey Supreme',
    badge: 'Heavy Clump Weight • High Biomass • ICAR-IISR',
    duration: '210 Days (Medium Duration)',
    curcumin: '5.50%',
    oleoresin: '16.0%',
    dryRecovery: '20.0% – 21.5% (Superior Dry Yield)',
    potentialYield: '14 – 16 Tonnes/Acre (Fresh)',
    rotTolerance: 'Moderate to High',
    marketDemand: 'Commercial APMC Dry Finger Benchmark',
    description: 'A vigorous, broad-leaved cultivar with phenomenal tillering capacity. If your goal is maximum cured dry tonnage for bulk sale in mandis like Erode, Nizamabad, or Sangli, Alleppey Supreme consistently sets the benchmark.',
    pros: [
      'Highest dry recovery rate (up to 21.5% when cured)',
      'Heavy root-clump mass with uniform, plump secondary fingers',
      'High drought resilience once established'
    ],
    cons: [
      'Requires full 7-month cycle; needs supplemental late irrigation',
      'Susceptible to leaf blotch if October has heavy cloudy rains'
    ]
  },
  salem: {
    name: 'Salem / Erode Local Selection',
    badge: 'Traditional Commercial • Long Duration',
    duration: '240 – 270 Days (Long Duration)',
    curcumin: '3.20% – 3.80%',
    oleoresin: '9.5% – 10.5%',
    dryRecovery: '18.0% – 19.5%',
    potentialYield: '11 – 13 Tonnes/Acre (Fresh)',
    rotTolerance: 'Low to Moderate',
    marketDemand: 'Traditional Mandi Commodity Trade',
    description: 'The historic farmer selection widely grown across Tamil Nadu and southern Karnataka. Known for elongated, bright yellow fingers that cure into attractive dry spice, though it demands a full 8–9 months in the field and carries lower curcumin.',
    pros: [
      'Universally recognized appearance in South Indian APMCs',
      'Plentiful, cheap seed rhizome availability locally'
    ],
    cons: [
      'Long duration increases irrigation and labor overheads',
      'Significantly lower curcumin content (under 4.0%)',
      'Higher vulnerability to late-season shoot borer infestations'
    ]
  }
};

function initVarietySelector() {
  const container = document.getElementById('variety-card');
  const tabs = document.querySelectorAll('.variety-tab');

  function renderVariety(key) {
    const v = VARIETY_DATA[key];
    container.innerHTML = `
      <div class="variety-detail-grid">
        <div class="variety-specs-col">
          <div class="spec-line"><span>Maturity Duration:</span> <strong>${v.duration}</strong></div>
          <div class="spec-line"><span>Curcumin Percentage:</span> <strong class="text-gold font-bold">${v.curcumin}</strong></div>
          <div class="spec-line"><span>Oleoresin Content:</span> <strong>${v.oleoresin}</strong></div>
          <div class="spec-line"><span>Dry Recovery Rate:</span> <strong class="text-green">${v.dryRecovery}</strong></div>
          <div class="spec-line"><span>Acre Yield Potential:</span> <strong class="text-emerald">${v.potentialYield}</strong></div>
          <div class="spec-line"><span>Rot Tolerance:</span> <strong>${v.rotTolerance}</strong></div>
          <div class="spec-line"><span>Best Market Outlet:</span> <strong>${v.marketDemand}</strong></div>
        </div>

        <div class="variety-narrative-col">
          <span class="variety-badge-tag">${v.badge}</span>
          <h3>${v.name}</h3>
          <p class="variety-desc">${v.description}</p>

          <div class="variety-pros-cons">
            <div class="pro-box">
              <strong>Key Agronomic Strengths:</strong>
              <ul>${v.pros.map(p => `<li>${p}</li>`).join('')}</ul>
            </div>
            <div class="con-box">
              <strong>Management Trade-Offs:</strong>
              <ul>${v.cons.map(c => `<li>${c}</li>`).join('')}</ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderVariety(tab.dataset.variety);
    });
  });

  // Default initial render
  renderVariety('pragati');
}

/* ==========================================================================
   5. Section 3: Seed Rhizome Calculator
   ========================================================================== */
function initSeedCalculator() {
  const seedSelect = document.getElementById('seed-type-select');
  const spacingSelect = document.getElementById('spacing-select');
  const priceInput = document.getElementById('seed-rate-price');

  const kgDisp = document.getElementById('seed-total-kg');
  const bagsDisp = document.getElementById('seed-bags');
  const costDisp = document.getElementById('seed-total-cost');

  function calculate() {
    let plantPopulation = 28500;
    if (spacingSelect.value === 'high') plantPopulation = 32000;
    if (spacingSelect.value === 'wide') plantPopulation = 22000;

    // Average sett weight in grams
    let settWeight = 30; // grams
    if (seedSelect.value === 'mother') settWeight = 38;
    if (seedSelect.value === 'finger') settWeight = 26;
    if (seedSelect.value === 'mix') settWeight = 32;

    // Add 8% buffer for sorting, damaged buds, and handling losses
    const rawSeedKg = Math.round((plantPopulation * settWeight) / 1000);
    const totalSeedKg = Math.round(rawSeedKg * 1.08);
    const quintals = (totalSeedKg / 100).toFixed(2);
    const bags = Math.ceil(totalSeedKg / 50);

    const price = parseFloat(priceInput.value) || 45;
    const totalCost = totalSeedKg * price;

    kgDisp.textContent = `${totalSeedKg.toLocaleString()} kg (${quintals} q)`;
    bagsDisp.textContent = `${bags} Bags (50 kg each)`;
    costDisp.textContent = `₹${totalCost.toLocaleString('en-IN')}`;
  }

  seedSelect.addEventListener('change', calculate);
  spacingSelect.addEventListener('change', calculate);
  priceInput.addEventListener('input', calculate);
  calculate();
}

/* ==========================================================================
   6. Section 4: Precision Drip & Fertigation Engine
   ========================================================================== */
const FERT_DATA = {
  1: {
    title: 'Stage 1: Establishment & Rooting (0–30 DAP)',
    waterRequirement: '4,500 – 6,000 Litres / Day (0.5 – 0.75 hrs run time)',
    schedule: [
      { salt: 'Humic Acid (98% soluble)', weeklyDose: '500 mL / week', totalDose: '1.0 Litre', purpose: 'Root elongation and lateral feeder root multiplication.' },
      { salt: 'Synthetic NPK via drip', weeklyDose: '0.0 kg (None)', totalDose: '0.0 kg', purpose: 'Zero chemical salts; avoids burning delicate nascent feeder roots.' }
    ],
    notes: 'During this stage, sprouts live off nutrient reserves stored in the mother/finger sett. Over-fertigation here causes salt injury. Ensure initial primary mulching is applied to maintain 24–28°C soil root-zone temperature.'
  },
  2: {
    title: 'Stage 2: Early Vegetative & Primary Tillering (31–60 DAP)',
    waterRequirement: '8,000 – 10,000 Litres / Day (1.0 – 1.2 hrs run time)',
    schedule: [
      { salt: 'Neem-coated Urea', weeklyDose: '6.0 kg / week', totalDose: '24.0 kg', purpose: 'Drives rapid vegetative canopy expansion and leaf blade growth.' },
      { salt: 'Water-Soluble 19:19:19', weeklyDose: '5.0 kg / week', totalDose: '20.0 kg', purpose: 'Balanced cellular development and tiller initiation.' }
    ],
    notes: 'Split weekly quotas into two runs (e.g., Tuesday and Friday). Never dump the entire weekly dose in one single injection. Conduct second mulching and shallow manual weeding around 45 DAP.'
  },
  3: {
    title: 'Stage 3: Peak Tillering & Canopy Closure (61–90 DAP)',
    waterRequirement: '10,000 – 12,000 Litres / Day (1.2 – 1.5 hrs run time)',
    schedule: [
      { salt: 'Neem-coated Urea', weeklyDose: '8.0 kg / week', totalDose: '32.0 kg', purpose: 'Supports maximum leaf area index (target LAI = 4.5).' },
      { salt: 'Mono-Ammonium Phosphate (12:61:00)', weeklyDose: '3.5 kg / week', totalDose: '14.0 kg', purpose: 'Dense rooting and underground node formation.' },
      { salt: 'Magnesium Sulphate (MgSO4)', weeklyDose: '2.5 kg / week', totalDose: '10.0 kg', purpose: 'Activates chlorophyll synthesis; prevents interveinal yellowing.' }
    ],
    notes: 'Coincides with the first earthing-up operation. Drench root zones with Trichoderma-enriched slurry at 60 DAP to prevent soft rot. Avoid excess chemical nitrogen if cloudy monsoon conditions prevail.'
  },
  4: {
    title: 'Stage 4: Rhizome Initiation & Early Bulking (91–135 DAP)',
    waterRequirement: '12,000 – 15,000 Litres / Day (Run drip during rainless breaks)',
    schedule: [
      { salt: 'Potassium Nitrate (13:00:45)', weeklyDose: '6.0 kg / week', totalDose: '36.0 kg', purpose: 'High potassium drives primary finger cell elongation.' },
      { salt: 'Mono-Potassium Phosphate (0:52:34)', weeklyDose: '4.0 kg / week', totalDose: '24.0 kg', purpose: 'Starch synthesis and rhizome node branching.' },
      { salt: 'Calcium Nitrate', weeklyDose: '3.0 kg / week', totalDose: '18.0 kg', purpose: 'Strengthens rhizome cell walls and skin toughness.' }
    ],
    notes: 'CRITICAL RULE: Never mix Calcium Nitrate in the same fertigation tank with Phosphates or Sulphates (forms insoluble Gypsum precipitate). Apply Calcium Nitrate on separate irrigation days.'
  },
  5: {
    title: 'Stage 5: Active Rhizome Bulking & Starch Fill (136–180 DAP)',
    waterRequirement: '14,000 – 16,000 Litres / Day (1.5 – 2.0 hrs run time)',
    schedule: [
      { salt: 'Sulphate of Potash (0:0:50 - SOP)', weeklyDose: '8.0 kg / week', totalDose: '48.0 kg', purpose: 'Maximizes finger girth, weight, and curcumin concentration.' },
      { salt: 'Neem-coated Urea', weeklyDose: '2.5 kg / week', totalDose: '15.0 kg', purpose: 'Prevents premature leaf canopy yellowing and collapse.' }
    ],
    notes: 'This is the yield-defining phase. Post-monsoon Karnataka sunshine triggers active photosynthesis. Maintain steady soil moisture; erratic drying and soaking during this phase causes split or deformed fingers.'
  },
  6: {
    title: 'Stage 6: Maturation & Field Curing (181–210 DAP)',
    waterRequirement: '5,000 – 7,000 Litres on alternate days (Tapering)',
    schedule: [
      { salt: 'Sulphate of Potash (0:0:50 - SOP)', weeklyDose: '4.0 kg / week', totalDose: '16.0 kg', purpose: 'Hardens finger epidermis and drives starch density.' },
      { salt: 'Nitrogen & Phosphorus', weeklyDose: '0.0 kg (Strictly zero)', totalDose: '0.0 kg', purpose: 'Allows natural plant senescence and leaf nutrient translocation.' }
    ],
    notes: 'Completely cut off all irrigation 15–20 days prior to targeted harvest date. This allows rhizomes to firm up underground, reducing skin peeling during washing and mechanical digger lifting.'
  }
};

function initFertigationEngine() {
  const tabs = document.querySelectorAll('.fert-tab-btn');
  const detailsView = document.getElementById('fert-details-view');

  function renderStage(stageId) {
    const data = FERT_DATA[stageId];
    detailsView.innerHTML = `
      <div class="fert-table-card">
        <h4 style="margin-bottom: 8px; font-size: 16px;">${data.title}</h4>
        <p style="font-size: 13px; color: var(--gold-600); font-weight: 600; margin-bottom: 14px;">
          💧 Drip Water Requirement: ${data.waterRequirement}
        </p>
        <table class="fert-schedule-tbl">
          <thead>
            <tr>
              <th>Fertigation Salt</th>
              <th>Weekly Dose</th>
              <th>Stage Total</th>
              <th>Agronomic Purpose</th>
            </tr>
          </thead>
          <tbody>
            ${data.schedule.map(s => `
              <tr>
                <td><strong>${s.salt}</strong></td>
                <td>${s.weeklyDose}</td>
                <td><strong>${s.totalDose}</strong></td>
                <td><small>${s.purpose}</small></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="fert-notes-card">
        <h4>Agronomic Field Directives</h4>
        <p style="font-size: 13.5px; line-height: 1.6;">${data.notes}</p>
        <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); font-size: 12.5px;">
          <strong>Fertigation Operating Checklist:</strong>
          <ul style="padding-left: 16px; margin-top: 6px;">
            <li>Always run clean water for 15 minutes before injecting fertilizer.</li>
            <li>Inject fertilizer solution steadily over 30–45 minutes.</li>
            <li>Flush laterals with clean water for 15 minutes post-injection to prevent emitter salt clogging.</li>
          </ul>
        </div>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderStage(tab.dataset.stage);
    });
  });

  renderStage('1');
}

/* ==========================================================================
   7. Section 5: Month-by-Month Calendar
   ========================================================================== */
const CALENDAR_EVENTS = [
  { month: 'April', phase: 'planting', dap: 'Day -45 to -15', title: 'Pre-Monsoon Land Preparation', desc: 'Deep summer ploughing (30 cm depth). Sow Sunnhemp @ 15 kg/acre for green manure. Incorporate biochar if soil is compacted.', inputs: 'Sunnhemp seed 15 kg' },
  { month: 'May', phase: 'planting', dap: 'Day -15 to 0', title: 'Bed Formation & Seed Sourcing', desc: 'Incorporate 45-day green manure. Form Broad Raised Beds (120 cm width, 30 cm height). Lay 2 drip laterals per bed. Source certified seed.', inputs: '10 t FYM, 250 kg Neem Cake, 150 kg SSP, 25 kg MOP' },
  { month: 'June', phase: 'planting', dap: 'DAP 0 – 30', title: 'Planting & 1st Mulching (Prime Window)', desc: 'Execute seed treatment with Ridomil Gold / Trichoderma. Plant setts at 35 x 20 cm grid, 4–5 cm deep. Apply 4–5 tonnes green leaf mulch immediately.', inputs: '850–900 kg Seed Rhizomes, 4.5 t Green Foliage' },
  { month: 'July', phase: 'vegetative', dap: 'DAP 31 – 60', title: 'Weeding, Gap-Filling & 2nd Mulching', desc: 'Inspect sprout emergence; gap-fill missing spots with pre-sprouted nursery setts. Hand weeding along bed edges. Apply 2nd mulch (2.5 t/acre).', inputs: '24 kg Urea + 20 kg 19:19:19 via Drip, 2.5 t Mulch' },
  { month: 'August', phase: 'vegetative', dap: 'DAP 61 – 90', title: '1st Earthing Up & Soft-Rot Guard', desc: 'Pull loose soil from furrows onto bed tops to cover expanding root crowns. Prophylactic drenching with Trichoderma or Ridomil Gold.', inputs: '32 kg Urea + 14 kg MAP + 10 kg MgSO4, Trichoderma drench' },
  { month: 'September', phase: 'vegetative', dap: 'DAP 91 – 120', title: 'Shoot Borer Scouting & Foliar Micro-Spray', desc: 'Monitor leaf whorls for frass and bore holes. Apply ICAR-IISR Turmeric Special foliar spray (5 g/L). Spray Spinosad 45 SC if borer exceeds 2%.', inputs: 'Turmeric Special 2 kg foliar + 36 kg KNO3 via drip' },
  { month: 'October', phase: 'bulking', dap: 'DAP 121 – 150', title: '2nd Earthing Up & Bulking Nutrition', desc: 'Final earthing up to prevent greening of secondary fingers. High potassium fertigation to accelerate subterranean bulking. Clear drainage channels.', inputs: '24 kg MKP (0:52:34) + 18 kg Calcium Nitrate' },
  { month: 'November', phase: 'bulking', dap: 'DAP 151 – 180', title: 'Leaf Spot Protection & Starch Bulking', desc: 'Protect green canopy from Taphrina leaf blotch using Azoxystrobin + Difenoconazole spray. Inject SOP 0:0:50 via drip system.', inputs: '48 kg SOP (0:0:50) + 15 kg Urea, Azoxystrobin spray' },
  { month: 'December', phase: 'bulking', dap: 'DAP 181 – 210', title: 'Irrigation Tapering & Skin Hardening', desc: 'Taper drip irrigation run-time by 50%. Apply final SOP dose to harden rhizome skin. Halt all nitrogenous fertilizers.', inputs: '16 kg SOP (0:0:50) via drip' },
  { month: 'January', phase: 'harvest', dap: 'DAP 211 – 240', title: 'Water Termination & Senescence', desc: 'Stop all irrigation completely 15–20 days prior to harvest. Canopy will turn golden yellow, collapse, and lodge naturally over the beds.', inputs: 'Zero inputs; allow soil to dry naturally' },
  { month: 'February', phase: 'harvest', dap: 'Harvest & Curing', title: 'Lifting, Steam Curing & Sun Drying', desc: 'Dig rhizomes using tractor-operated lifter or manual spading. Separate mothers from fingers. Steam-cook in IISR boiler for 45–60 mins; sun dry on tarps.', inputs: 'Steam boiler fuel, drying tarpaulins, gunny bags' }
];

function initCalendarTimeline() {
  const container = document.getElementById('calendar-timeline');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderEvents(filter) {
    const filtered = filter === 'all' 
      ? CALENDAR_EVENTS 
      : CALENDAR_EVENTS.filter(e => e.phase === filter);

    container.innerHTML = filtered.map(e => `
      <div class="calendar-month-item">
        <div class="cal-month-col">
          <span class="cal-month-title">${e.month}</span>
          <span class="cal-dap">${e.dap}</span>
        </div>
        <div class="cal-activity-col">
          <h4>${e.title}</h4>
          <p>${e.desc}</p>
        </div>
        <div class="cal-inputs-col">
          <strong>Key Inputs Required:</strong>
          <span>${e.inputs}</span>
        </div>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEvents(btn.dataset.filter);
    });
  });

  renderEvents('all');
}

/* ==========================================================================
   8. Section 6: IPDM Diagnostic Cards
   ========================================================================== */
const IPDM_DATA = [
  {
    name: 'Rhizome Rot / Soft Rot',
    latin: 'Pythium aphanidermatum & Ralstonia solanacearum',
    severity: 'critical',
    badgeClass: 'badge-rot',
    badgeText: 'Highest Yield Killer (Fatal)',
    symptoms: 'Lower leaf margins turn yellow and collapse. Pseudostem base becomes soft, water-soaked, and decays with an offensive putrid odor. Clumps pull out effortlessly.',
    prevention: 'Raised beds with unobstructed drainage furrows. Never plant on waterlogged land. Pre-treat seed with Metalaxyl-M or Trichoderma.',
    biological: 'Soil drenching with Trichoderma harzianum @ 5 kg/acre enriched in 200 kg farmyard manure.',
    chemical: 'Drench affected beds with Metalaxyl-M 4% + Mancozeb 64% (Ridomil Gold) @ 2.5 g/L water (PHI: 45 days).'
  },
  {
    name: 'Shoot Borer',
    latin: 'Conogethes punctiferalis (Lepidoptera)',
    severity: 'major',
    badgeClass: 'badge-borer',
    badgeText: 'Primary Insect Pest',
    symptoms: 'Caterpillar bores into central pseudostem. Central shoot withers and dries into a classic "dead heart". Frass (caterpillar droppings) visible at bore entrance holes.',
    prevention: 'Scout weekly from July to October. Cut and incinerate bore-infested shoots before larva exits to pupate.',
    biological: 'Foliar spray with Bacillus thuringiensis (Bt) @ 2 g/L or Azadirachtin 10,000 ppm @ 2 mL/L.',
    chemical: 'Targeted spray into leaf axils with Spinosad 45 SC @ 0.3 mL/L or Chlorantraniliprole 18.5 SC @ 0.3 mL/L (PHI: 20 days).'
  },
  {
    name: 'Leaf Blotch & Leaf Spot',
    latin: 'Taphrina maculans & Colletotrichum capsici',
    severity: 'moderate',
    badgeClass: 'badge-leaf',
    badgeText: 'Foliar Blight',
    symptoms: 'Small yellow-brown circular spots that coalesce into dark necrotic patches across upper leaf surfaces during monsoon spells, causing premature drying of the foliage.',
    prevention: 'Avoid excessive nitrogen fertilisation. Ensure proper bed spacing (35 x 20 cm) for air circulation.',
    biological: 'Pseudomonas fluorescens @ 10 g/L or 1% Bordeaux mixture spray at early onset.',
    chemical: 'Spray Azoxystrobin 18.2% + Difenoconazole 11.4 SC @ 1.0 mL/L or Propiconazole 25 EC @ 1 mL/L (PHI: 25 days).'
  },
  {
    name: 'Root-Knot Nematodes',
    latin: 'Meloidogyne incognita',
    severity: 'major',
    badgeClass: 'badge-rot',
    badgeText: 'Subterranean Parasite',
    symptoms: 'Stunted plant growth, yellowing foliage, swollen root galls, cracked finger epidermis providing entry portals for lethal Pythium spores.',
    prevention: 'Rotate with African marigold (Tagetes). Incorporate Neem Cake @ 250 kg/acre basally.',
    biological: 'Inoculate beds with Paecilomyces lilacinus @ 2 kg/acre mixed in moist vermicompost.',
    chemical: 'Soil spot drenching with Fluopyram 34.48 SC @ 2 mL/L if severe galling is confirmed.'
  },
  {
    name: 'Rhizome Scale',
    latin: 'Aspidiella hartii',
    severity: 'moderate',
    badgeClass: 'badge-borer',
    badgeText: 'Storage & Sett Pest',
    symptoms: 'Minute circular grey scales encrusting rhizomes. Sucks cell sap, causing seed rhizomes to shrivel and eye buds to fail germination in field beds.',
    prevention: 'Discard scaly seed lots. Clean and whitewash storage seed pits before stocking.',
    biological: 'Dipping seed setts in 2% Pongamia / Neem oil emulsion.',
    chemical: 'Pre-storage seed dip in Quinalphos 25 EC @ 2 mL/L for 30 minutes; shade dry 24 hours.'
  },
  {
    name: 'Monsoon Waterlogging Asphyxiation',
    latin: 'Abiotic Physiological Disorder',
    severity: 'critical',
    badgeClass: 'badge-rot',
    badgeText: 'Zero Oxygen Event',
    symptoms: 'Soil saturation >6 hours causes root hairs to die from oxygen starvation. Entire canopy wilts despite saturated soil, mimicking root rot.',
    prevention: 'Broad Raised Beds (BBF) + dedicated perimeter discharge trenches (45 cm depth).',
    biological: 'Restore beneficial rhizosphere biology with liquid humic acid + Trichoderma once drained.',
    chemical: 'Deploy dewatering trench pumps immediately if downpours exceed drainage capacity.'
  }
];

function initIPDMGrid() {
  const container = document.getElementById('ipdm-grid');
  container.innerHTML = IPDM_DATA.map(item => `
    <div class="ipdm-card ${item.severity}">
      <span class="ipdm-badge ${item.badgeClass}">${item.badgeText}</span>
      <h3>${item.name}</h3>
      <p class="latin-name">${item.latin}</p>
      <p class="ipdm-symptoms"><strong>Diagnostic Clues:</strong> ${item.symptoms}</p>
      <div class="ipdm-actions">
        <div><strong>Cultural / Prevention:</strong> ${item.prevention}</div>
        <div><strong>Bio-Control:</strong> ${item.biological}</div>
        <div><strong>Approved Chemical:</strong> ${item.chemical}</div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   9. Section 7: Profitability & Budget Simulator
   ========================================================================== */
function initProfitSimulator() {
  const yieldSlider = document.getElementById('sim-yield');
  const recoverySlider = document.getElementById('sim-recovery');
  const dryPriceSlider = document.getElementById('sim-dry-price');
  const freshPriceSlider = document.getElementById('sim-fresh-price');
  const costSlider = document.getElementById('sim-cost');

  const dispYield = document.getElementById('disp-sim-yield');
  const dispRecovery = document.getElementById('disp-sim-recovery');
  const dispDryPrice = document.getElementById('disp-sim-dry-price');
  const dispFreshPrice = document.getElementById('disp-sim-fresh-price');
  const dispCost = document.getElementById('disp-sim-cost');

  // Outputs
  const resDryYield = document.getElementById('res-dry-yield');
  const resDryGross = document.getElementById('res-dry-gross');
  const resDryCost = document.getElementById('res-dry-cost');
  const resDryNet = document.getElementById('res-dry-net');
  const resDryBcr = document.getElementById('res-dry-bcr');
  const resDryBreak = document.getElementById('res-dry-breakeven');

  const resFreshSold = document.getElementById('res-fresh-sold');
  const resFreshGross = document.getElementById('res-fresh-gross');
  const resFreshCost = document.getElementById('res-fresh-cost');
  const resFreshNet = document.getElementById('res-fresh-net');
  const resFreshBcr = document.getElementById('res-fresh-bcr');
  const resFreshBreak = document.getElementById('res-fresh-breakeven');

  const resVaGain = document.getElementById('res-va-gain');
  const resBlendedNet = document.getElementById('res-blended-net');

  // Cost breakdown toggle
  const toggleCostBtn = document.getElementById('toggle-cost-breakdown');
  const costTable = document.getElementById('cost-breakdown-table');

  toggleCostBtn.addEventListener('click', () => {
    const isHidden = costTable.style.display === 'none';
    costTable.style.display = isHidden ? 'block' : 'none';
    toggleCostBtn.textContent = isHidden ? 'Hide Itemized Cost Breakdown ▴' : 'View Itemized Cost Breakdown ▾';
  });

  function calculateProfit() {
    const freshTonnes = parseFloat(yieldSlider.value);
    const freshKg = freshTonnes * 1000;
    const recoveryPct = parseFloat(recoverySlider.value);
    const dryPricePerQ = parseFloat(dryPriceSlider.value);
    const freshPricePerKg = parseFloat(freshPriceSlider.value);
    const totalDryCost = parseFloat(costSlider.value);

    // Update display labels
    dispYield.textContent = `${freshTonnes.toFixed(1)} t (${(freshTonnes * 10).toFixed(0)} q)`;
    dispRecovery.textContent = `${recoveryPct.toFixed(1)}%`;
    dispDryPrice.textContent = `₹${dryPricePerQ.toLocaleString('en-IN')}/q`;
    dispFreshPrice.textContent = `₹${freshPricePerKg}/kg`;
    dispCost.textContent = `₹${totalDryCost.toLocaleString('en-IN')}`;

    // 1. Dry Model Calculations
    const dryKg = freshKg * (recoveryPct / 100);
    const dryQuintals = dryKg / 100;
    const dryGrossRevenue = dryQuintals * dryPricePerQ;
    const dryNetProfit = dryGrossRevenue - totalDryCost;
    const dryBcr = (dryGrossRevenue / totalDryCost).toFixed(2);
    const dryBreakEvenQ = (totalDryCost / dryPricePerQ).toFixed(1);

    resDryYield.textContent = `${dryQuintals.toFixed(1)} Quintals (${Math.round(dryKg).toLocaleString()} kg)`;
    resDryGross.textContent = `₹${Math.round(dryGrossRevenue).toLocaleString('en-IN')}`;
    resDryCost.textContent = `₹${Math.round(totalDryCost).toLocaleString('en-IN')}`;
    resDryNet.textContent = `₹${Math.round(dryNetProfit).toLocaleString('en-IN')}`;
    resDryNet.className = dryNetProfit >= 0 ? 'text-emerald font-xl' : 'text-danger font-xl';
    resDryBcr.textContent = dryBcr;
    resDryBreak.textContent = `${dryBreakEvenQ} q`;

    // 2. Fresh Model Calculations (saves approx ₹16,000 on boiling/curing/drying labor)
    const freshProductionCost = Math.max(90000, totalDryCost - 16000);
    const freshGrossRevenue = freshKg * freshPricePerKg;
    const freshNetProfit = freshGrossRevenue - freshProductionCost;
    const freshBcr = (freshGrossRevenue / freshProductionCost).toFixed(2);
    const freshBreakEvenTonnes = ((freshProductionCost / freshPricePerKg) / 1000).toFixed(1);

    resFreshSold.textContent = `${freshKg.toLocaleString()} kg (${freshTonnes.toFixed(1)} t)`;
    resFreshGross.textContent = `₹${Math.round(freshGrossRevenue).toLocaleString('en-IN')}`;
    resFreshCost.textContent = `₹${Math.round(freshProductionCost).toLocaleString('en-IN')}`;
    resFreshNet.textContent = `₹${Math.round(freshNetProfit).toLocaleString('en-IN')}`;
    resFreshNet.className = freshNetProfit >= 0 ? 'text-gold font-xl' : 'text-danger font-xl';
    resFreshBcr.textContent = freshBcr;
    resFreshBreak.textContent = `${freshBreakEvenTonnes} t`;

    // 3. Value-Addition Potential (Milling 20% of dry crop into powder @ ₹350/kg retail)
    const vaKg = dryKg * 0.20;
    const powderGross = vaKg * 350; // ₹350/kg
    const powderMillingPackaging = vaKg * 30; // ₹30/kg for milling & pouch
    const normalDryValueForVaPortion = (vaKg / 100) * dryPricePerQ;
    const vaNetGain = powderGross - powderMillingPackaging - normalDryValueForVaPortion;
    const blendedNet = dryNetProfit + vaNetGain;

    resVaGain.textContent = `+ ₹${Math.round(vaNetGain).toLocaleString('en-IN')}`;
    resBlendedNet.textContent = `₹${Math.round(blendedNet).toLocaleString('en-IN')}`;
  }

  yieldSlider.addEventListener('input', calculateProfit);
  recoverySlider.addEventListener('input', calculateProfit);
  dryPriceSlider.addEventListener('input', calculateProfit);
  freshPriceSlider.addEventListener('input', calculateProfit);
  costSlider.addEventListener('input', calculateProfit);

  calculateProfit();
}

/* ==========================================================================
   10. Print / Blueprint Export
   ========================================================================== */
function initPrintHandler() {
  const printBtn = document.getElementById('print-plan-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
