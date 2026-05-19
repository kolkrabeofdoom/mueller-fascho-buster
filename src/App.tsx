import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  BookOpen, 
  Sparkles, 
  Trash2, 
  History, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Building2, 
  X, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck,
  HelpCircle,
  MapPin
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  utmBrands, 
  utmPlants, 
  boycottReasons, 
  independentAlternatives, 
  checkUTMBrand, 
  checkUTMPlant
} from './data/utmDatabase';
import type { UTMPlant, Alternative } from './data/utmDatabase';
import './App.css';

interface ScanHistoryItem {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  imageUrl: string | null;
  status: 'hit' | 'hit-nestle' | 'free' | 'notfound';
  matchReason?: string;
  timestamp: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'scan' | 'explore' | 'political'>('scan');
  const [eanInput, setEanInput] = useState('');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualVetInput, setManualVetInput] = useState('');
  const [vetResult, setVetResult] = useState<{ match: UTMPlant | null; checked: boolean }>({ match: null, checked: false });
  const [activeResult, setActiveResult] = useState<ScanHistoryItem | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [activeFilters, setActiveFilters] = useState<{ muller: boolean; nestle: boolean }>(() => {
    const saved = localStorage.getItem('mfb_filters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return { muller: true, nestle: true };
  });

  const handleFilterToggle = (key: 'muller' | 'nestle') => {
    setActiveFilters(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('mfb_filters', JSON.stringify(next));
      return next;
    });
  };

  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "camera-reader";

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mfb_history');
    if (saved) {
      try {
        setScanHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse scan history", e);
      }
    }
  }, []);

  // Save history helper
  const saveHistory = (newHistory: ScanHistoryItem[]) => {
    setScanHistory(newHistory);
    localStorage.setItem('mfb_history', JSON.stringify(newHistory));
  };

  // Toggle Camera Scanning
  useEffect(() => {
    if (isScanning && activeTab === 'scan') {
      setCameraError(null);
      
      // Delay initialization slightly to ensure DOM element is ready
      const timer = setTimeout(() => {
        try {
          const html5Qrcode = new Html5Qrcode(scannerContainerId);
          scannerRef.current = html5Qrcode;

          html5Qrcode.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: (width, height) => {
                const min = Math.min(width, height);
                // Return square box suitable for EAN-13 barcodes
                return { width: Math.floor(min * 0.8), height: Math.floor(min * 0.5) };
              }
            },
            (decodedText) => {
              // Vibrate device if supported
              if (navigator.vibrate) navigator.vibrate(100);
              
              // Process barcode
              handleProductLookup(decodedText);
            },
            () => {
              // Ignore silent errors during scanning
            }
          ).then(() => {
            // Camera started successfully
          }).catch(err => {
            console.error("Camera start failed", err);
            setCameraError("Kamera konnte nicht gestartet werden. Bitte erlauben Sie Kamerazugriff in Ihren Browsereinstellungen.");
            setIsScanning(false);
          });
        } catch (e) {
          console.error("Scanner setup failed", e);
          setCameraError("Scanner-Initialisierung fehlgeschlagen.");
          setIsScanning(false);
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        stopScanning();
      };
    } else {
      stopScanning();
    }
  }, [isScanning, activeTab]);

  const stopScanning = () => {
    if (scannerRef.current) {
      if (scannerRef.current.isScanning) {
        scannerRef.current.stop().then(() => {
          console.log("Scanner stopped successfully");
        }).catch(err => {
          console.error("Error stopping scanner", err);
        });
      }
      scannerRef.current = null;
    }
  };

  const startScanningAction = () => {
    setIsScanning(true);
  };

  const stopScanningAction = () => {
    setIsScanning(false);
  };

  // Main evaluation engine
  const handleProductLookup = async (barcode: string) => {
    if (!barcode || barcode.trim() === '') return;
    const cleanBarcode = barcode.trim();
    
    // Stop scanning immediately upon hit
    setIsScanning(false);
    setLoading(true);
    setCameraError(null);

    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${cleanBarcode}`);
      let data;
      if (response.status === 404) {
        data = { status: 0 };
      } else if (!response.ok) {
        throw new Error("Netzwerkfehler bei OpenFoodFacts");
      } else {
        data = await response.json();
      }
      
      let historyItem: ScanHistoryItem;
      const timestamp = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

      if (data.status === 1 && data.product) {
        const product = data.product;
        const productName = product.product_name || product.product_name_de || product.product_name_en || "Unbekanntes Produkt";
        const brand = product.brands || "Unbekannte Marke";
        const imageUrl = product.image_front_url || product.image_url || product.image_thumb_url || null;
        
        // Match Engine: Step 1: Check Brands
        const matchedBrand = checkUTMBrand(brand);
        let isHit = false;
        let corporationHit: 'muller' | 'nestle' | null = null;
        let reason = "";

        if (matchedBrand) {
          if (matchedBrand.corporation === 'muller' && activeFilters.muller) {
            isHit = true;
            corporationHit = 'muller';
            reason = `Die Marke '${matchedBrand.name}' gehört zum Müller-Konzern.`;
          } else if (matchedBrand.corporation === 'nestle' && activeFilters.nestle) {
            isHit = true;
            corporationHit = 'nestle';
            reason = `Die Marke '${matchedBrand.name}' gehört zum Nestlé-Konzern.`;
          }
        }
        
        // Match Engine: Step 2: Check Packaging codes
        let matchedPlant: UTMPlant | null = null;
        let matchedPlantSource = "";
        
        if (!isHit) {
          // Check emb_codes array
          if (product.emb_codes) {
            const codes = product.emb_codes.split(',').map((c: string) => c.trim());
            for (const code of codes) {
              const p = checkUTMPlant(code);
              if (p && p.corporation === 'muller' && activeFilters.muller) {
                matchedPlant = p;
                matchedPlantSource = code;
                break;
              }
            }
          }
          
          // Check emb_codes_tags array
          if (!matchedPlant && product.emb_codes_tags) {
            const tags = Array.isArray(product.emb_codes_tags) ? product.emb_codes_tags : [product.emb_codes_tags];
            for (const tag of tags) {
              const p = checkUTMPlant(tag);
              if (p && p.corporation === 'muller' && activeFilters.muller) {
                matchedPlant = p;
                matchedPlantSource = tag;
                break;
              }
            }
          }

          if (matchedPlant) {
            isHit = true;
            corporationHit = 'muller';
            reason = `Wurde hergestellt im Müller-Werk in ${matchedPlant.city} (${matchedPlant.name}, Betriebsnummer ${matchedPlant.code}, abgeglichen über Code: ${matchedPlantSource}).`;
          }
        }

        historyItem = {
          id: Date.now().toString(),
          barcode: cleanBarcode,
          name: productName,
          brand,
          imageUrl,
          status: isHit ? (corporationHit === 'nestle' ? 'hit-nestle' : 'hit') : 'free',
          matchReason: reason,
          timestamp
        };
      } else {
        // Product not found in OpenFoodFacts
        historyItem = {
          id: Date.now().toString(),
          barcode: cleanBarcode,
          name: "Produkt nicht in Datenbank",
          brand: "Prüfe Betriebsnummer manuell!",
          imageUrl: null,
          status: 'notfound',
          matchReason: "Dieses Produkt wurde nicht bei OpenFoodFacts gefunden. Du kannst das Genusstauglichkeitskennzeichen (ovaler Stempel) manuell unten überprüfen.",
          timestamp
        };
      }

      // Add to history list, keep maximum of 25 items
      const updatedHistory = [historyItem, ...scanHistory.filter(h => h.barcode !== cleanBarcode)].slice(0, 25);
      saveHistory(updatedHistory);
      setActiveResult(historyItem);
      setEanInput('');
    } catch (error) {
      console.error("API Fetch error:", error);
      setCameraError("Fehler beim Abrufen der Produktdaten. Bitte Internetverbindung prüfen.");
    } finally {
      setLoading(false);
    }
  };

  // Manual Vet Code checker
  const handleVetLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualVetInput) return;
    const match = checkUTMPlant(manualVetInput);
    setVetResult({
      match,
      checked: true
    });
  };

  // Clear search history
  const clearHistory = () => {
    if (window.confirm("Möchtest du deinen Scan-Verlauf wirklich löschen?")) {
      saveHistory([]);
    }
  };

  // Remove single item from history
  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = scanHistory.filter(item => item.id !== id);
    saveHistory(updated);
  };

  // Recommendations generator depending on brands/categories
  const getAlternativesForProduct = (result: ScanHistoryItem): Alternative[] => {
    if (result.status !== 'hit' && result.status !== 'hit-nestle') return [];
    
    const brandLower = result.brand.toLowerCase();
    const nameLower = result.name.toLowerCase();
    
    let matchedCategory = 'milch'; // default fallback
    
    if (brandLower.includes('berief') || nameLower.includes('tofu') || nameLower.includes('soja') || nameLower.includes('soy')) {
      matchedCategory = 'tofu';
    } else if (brandLower.includes('loose') || brandLower.includes('quäse') || nameLower.includes('käse') || nameLower.includes('cheese')) {
      matchedCategory = 'kaese';
    } else if (brandLower.includes('homann') || brandLower.includes('nadler') || nameLower.includes('salat') || nameLower.includes('fisch') || nameLower.includes('sauce') || nameLower.includes('dressing')) {
      matchedCategory = 'saucen';
    } else if (nameLower.includes('joghurt') || nameLower.includes('yoghurt') || brandLower.includes('elinas') || brandLower.includes('lünebest')) {
      matchedCategory = 'joghurt';
    } else if (nameLower.includes('milchreis') || nameLower.includes('wackelpudding') || nameLower.includes('pudding') || nameLower.includes('dessert')) {
      matchedCategory = 'dessert';
    } else if (nameLower.includes('sahne') || nameLower.includes('butter') || nameLower.includes('schmand') || nameLower.includes('rahm')) {
      matchedCategory = 'butter';
    } else if (brandLower.includes('wagner') || nameLower.includes('pizza') || nameLower.includes('flammkuchen') || brandLower.includes('buitoni')) {
      matchedCategory = 'pizza';
    } else if (brandLower.includes('vittel') || brandLower.includes('pellegrino') || brandLower.includes('panna') || brandLower.includes('perrier') || nameLower.includes('wasser') || nameLower.includes('mineralwasser') || nameLower.includes('limonade')) {
      matchedCategory = 'wasser';
    } else if (brandLower.includes('kitkat') || brandLower.includes('smarties') || brandLower.includes('lion') || brandLower.includes('aftereight') || brandLower.includes('crossies') || brandLower.includes('choclait') || nameLower.includes('schokolade') || nameLower.includes('kakao') || nameLower.includes('nesquik') || nameLower.includes('riegel')) {
      matchedCategory = 'schokolade';
    } else if (brandLower.includes('maggi') || brandLower.includes('thomy') || nameLower.includes('brühe') || nameLower.includes('gewürz') || nameLower.includes('bouillon') || nameLower.includes('senf') || nameLower.includes('mayo')) {
      matchedCategory = 'saucen';
    }

    return independentAlternatives.filter(alt => alt.recommendedFor.includes(matchedCategory));
  };

  return (
    <div className="app-container">
      {/* HEADER SECTION */}
      <header className="app-header">
        <div className="brand-title">
          <h1>
            Müller-Fascho-Buster
            <span className="logo-badge">Beta</span>
          </h1>
        </div>
        
        <nav className="app-nav">
          <button 
            className={`nav-btn ${activeTab === 'scan' ? 'active' : ''}`}
            onClick={() => setActiveTab('scan')}
          >
            <Camera size={18} />
            <span>Scanner</span>
          </button>
          <button 
            className={`nav-btn ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            <Building2 size={18} />
            <span>Konzern-Struktur</span>
          </button>
          <button 
            className={`nav-btn ${activeTab === 'political' ? 'active' : ''}`}
            onClick={() => setActiveTab('political')}
          >
            <BookOpen size={18} />
            <span>Hintergrund</span>
          </button>
        </nav>
      </header>

      {/* MAIN VIEW */}
      <main className="app-main">
        
        {/* VIEW 1: SCANNER PAGE */}
        {activeTab === 'scan' && (
          <div className="scanner-grid">
            
            {/* Left Side: Scanner Controls and Viewport */}
            <div className="scanner-section">
              <div className="glass-card">
                <h2 className="section-title">
                  <Sparkles size={20} className="text-cyan" />
                  Nahrungsmittel scannen
                </h2>
                
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Scanne den Barcode (EAN) oder tippe ihn ein, um sofort zu prüfen, ob das Produkt zum Konzernumfeld der ausgewählten Konzerne gehört.
                </p>

                {/* Interactive Boycott-Filter Toggles */}
                <div className="filter-selector">
                  <div className="filter-selector-label">
                    <Building2 size={15} />
                    <span>Aktive Boykott-Filter:</span>
                  </div>
                  <div className="filter-toggles">
                    <button 
                      type="button"
                      className={`filter-toggle-btn muller ${activeFilters.muller ? 'active' : ''}`}
                      onClick={() => handleFilterToggle('muller')}
                    >
                      <span className="dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-danger)' }}></span>
                      Müller-Gruppe ({activeFilters.muller ? 'Aktiv' : 'Inaktiv'})
                    </button>
                    <button 
                      type="button"
                      className={`filter-toggle-btn nestle ${activeFilters.nestle ? 'active' : ''}`}
                      onClick={() => handleFilterToggle('nestle')}
                    >
                      <span className="dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-nestle)' }}></span>
                      Nestlé-Konzern ({activeFilters.nestle ? 'Aktiv' : 'Inaktiv'})
                    </button>
                  </div>
                </div>

                {/* Camera Viewport Container */}
                <div style={{ marginBottom: '1.5rem' }}>
                  {isScanning ? (
                    <div className="scanner-box scanning">
                      <div id={scannerContainerId}></div>
                      
                      {/* Premium HUD scanner frame overlay */}
                      <div className="scanner-overlay">
                        <div className="scanner-target-box">
                          <div className="scanner-laser"></div>
                          <div className="scanner-corner top-left"></div>
                          <div className="scanner-corner top-right"></div>
                          <div className="scanner-corner bottom-left"></div>
                          <div className="scanner-corner bottom-right"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="scanner-box" style={{ background: 'linear-gradient(135deg, hsl(220, 20%, 8%) 0%, hsl(220, 20%, 13%) 100%)' }}>
                      <Camera size={48} className="text-muted" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                      <button className="btn btn-primary" onClick={startScanningAction}>
                        <Camera size={18} />
                        Kamera starten & scannen
                      </button>
                    </div>
                  )}

                  {cameraError && (
                    <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'rgba(255, 68, 51, 0.1)', border: '1px solid rgba(255, 68, 51, 0.2)', color: 'var(--color-danger)', fontSize: '0.85rem' }}>
                      {cameraError}
                    </div>
                  )}

                  {isScanning && (
                    <div className="scanner-controls" style={{ marginTop: '1rem' }}>
                      <button className="btn btn-secondary" onClick={stopScanningAction}>
                        Barcode-Scanner stoppen
                      </button>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: 'var(--text-muted)' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }}></div>
                  <span style={{ padding: '0 1rem', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>Oder Barcode eingeben</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }}></div>
                </div>

                {/* Manual Barcode Input */}
                <div className="manual-input-box">
                  <label className="input-label">EAN-Barcode (13-stellige Zahl)</label>
                  <form onSubmit={(e) => { e.preventDefault(); handleProductLookup(eanInput); }} className="input-group">
                    <input 
                      type="text" 
                      className="text-input" 
                      placeholder="z.B. 4002631000124 (Müllermilch)"
                      value={eanInput}
                      onChange={(e) => setEanInput(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                    <button type="submit" className="btn btn-primary" disabled={loading || !eanInput}>
                      {loading ? <RefreshCw className="animate-spin" size={18} /> : <Search size={18} />}
                      Prüfen
                    </button>
                  </form>
                </div>
              </div>

              {/* Veterinary Code interactive Lookup Tool */}
              <div className="glass-card vet-lookup-card">
                <h3 className="section-title">
                  <ShieldCheck size={20} className="text-cyan" />
                  Stempel-Checker (Genusstauglichkeitskennzeichen)
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  Manche Eigenmarken von Discountern verschleiern den wahren Hersteller. Siehe auf der Rückseite nach dem <strong>ovalen EU-Identitätskennzeichen</strong> (z.B. <code>DE SN 016 EG</code>) und gib es hier direkt ein.
                </p>

                <form onSubmit={handleVetLookup} className="vet-lookup-input-box">
                  <input 
                    type="text" 
                    className="text-input" 
                    placeholder="z.B. DE SN 016 EG" 
                    value={manualVetInput}
                    onChange={(e) => {
                      setManualVetInput(e.target.value);
                      setVetResult({ match: null, checked: false });
                    }}
                  />
                  <button type="submit" className="btn btn-secondary">Überprüfen</button>
                </form>

                {vetResult.checked && (
                  <div className="vet-lookup-result">
                    {vetResult.match ? (
                      <div className="trigger-match-box">
                        <div className="trigger-title">
                          <AlertTriangle size={18} />
                          MÜLLER-KONZERN TREFFER!
                        </div>
                        <p className="trigger-text" style={{ fontSize: '0.85rem' }}>
                          Dieses Kennzeichen gehört zur Betriebsstätte: <br />
                          <strong>{vetResult.match.name}</strong> in {vetResult.match.city} ({vetResult.match.state}). <br />
                          <span style={{ fontSize: '0.8rem', opacity: 0.85, marginTop: '0.5rem', display: 'block' }}>
                            {vetResult.match.description}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div className="safe-info-box">
                        <div className="safe-title">
                          <CheckCircle size={18} />
                          Keine Müller-Betriebsstätte
                        </div>
                        <p className="safe-text" style={{ fontSize: '0.85rem' }}>
                          Das eingegebene Kennzeichen <strong>"{manualVetInput}"</strong> stimmt mit keiner bekannten Betriebsstätte der Müller-Gruppe überein.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Scan History */}
            <div className="history-section glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                <h2 className="section-title" style={{ border: 'none', padding: 0, margin: 0 }}>
                  <History size={20} className="text-cyan" />
                  Deine Scans
                </h2>
                {scanHistory.length > 0 && (
                  <button className="delete-btn" onClick={clearHistory} title="Verlauf löschen">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {scanHistory.length === 0 ? (
                <div className="empty-state">
                  <History size={40} style={{ opacity: 0.3 }} />
                  <p>Noch keine Scans durchgeführt.</p>
                  <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Scanne Produkte im Markt, um deine Einkaufsliste Müller-frei zu halten!</p>
                </div>
              ) : (
                <div className="history-list">
                  {scanHistory.map((item) => (
                    <div 
                      key={item.id} 
                      className="history-item" 
                      onClick={() => setActiveResult(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="history-info">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="product-img" style={{ width: '40px', height: '40px' }} />
                        ) : (
                          <div className="product-no-img" style={{ width: '40px', height: '40px' }}>
                            <HelpCircle size={16} />
                          </div>
                        )}
                        <div className="history-meta">
                          <div className="history-name">{item.name}</div>
                          <div className="history-code">{item.brand}</div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className={`indicator-pill ${item.status}`}>
                          {item.status === 'hit' ? 'Müller' : item.status === 'hit-nestle' ? 'Nestlé' : item.status === 'free' ? 'Frei' : 'Unbekannt'}
                        </span>
                        <button className="delete-btn" onClick={(e) => deleteHistoryItem(item.id, e)}>
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: EXPLORE CONCERN STRUCTURE */}
        {activeTab === 'explore' && (
          <div className="explore-grid">
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 className="section-title">
                <Building2 size={22} className="text-cyan" />
                Konzern-Strukturen & Marken
              </h2>
              
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Viele Marken von <strong>Theo Müller</strong> und <strong>Nestlé</strong> verbergen sich geschickt hinter ländlicher Idylle, historischen Logos oder regionaler Herkunft. Hier ist eine Übersicht über die boykottierten Konzerne:
              </p>

              <h3 style={{ fontSize: '1.15rem', color: '#ff4433', borderBottom: '1px solid rgba(255, 68, 51, 0.2)', paddingBottom: '0.5rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-danger)' }}></span>
                Unternehmensgruppe Theo Müller (UTM)
              </h3>
              <div className="brand-showcase">
                {Object.values(utmBrands).filter(brand => brand.corporation === 'muller').map((brand) => (
                  <div key={brand.id} className="brand-card">
                    <div className="brand-card-header">
                      <div className="brand-card-name">{brand.name}</div>
                      <span className="indicator-pill hit" style={{ fontSize: '0.65rem' }}>Müller</span>
                    </div>
                    <div className="brand-card-category">{brand.category}</div>
                    <div className="brand-card-desc">{brand.description}</div>
                    <div className="brand-card-relation">{brand.relation}</div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-nestle)', borderBottom: '1px solid rgba(0, 210, 255, 0.2)', paddingBottom: '0.5rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-nestle)' }}></span>
                Nestlé-Konzern
              </h3>
              <div className="brand-showcase">
                {Object.values(utmBrands).filter(brand => brand.corporation === 'nestle').map((brand) => (
                  <div key={brand.id} className="brand-card nestle-brand">
                    <div className="brand-card-header">
                      <div className="brand-card-name">{brand.name}</div>
                      <span className="indicator-pill hit-nestle" style={{ fontSize: '0.65rem' }}>Nestlé</span>
                    </div>
                    <div className="brand-card-category">{brand.category}</div>
                    <div className="brand-card-desc">{brand.description}</div>
                    <div className="brand-card-relation">{brand.relation}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 className="section-title">
                <MapPin size={20} className="text-cyan" />
                Müller Betriebsstätten
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Wenn ein Produkt als <strong>Handelsmarke</strong> (Eigenmarke z.B. bei Lidl, Aldi, Edeka, REWE) vertrieben wird, muss laut Gesetz ein Identitätskennzeichen aufgedruckt sein. Folgende Betriebsnummern verweisen direkt auf Müller-Molkereien:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.values(utmPlants).filter((v, i, a) => a.findIndex(t => t.code === v.code) === i).map((plant) => (
                  <div key={plant.code} className="plant-card">
                    <div className="plant-card-header">
                      <div className="plant-card-name">{plant.name}</div>
                      <span className="plant-card-code">{plant.code}</span>
                    </div>
                    <div className="plant-card-location">{plant.city}, {plant.state}</div>
                    <div className="plant-card-desc">{plant.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: POLITICAL BACKGROUND */}
        {activeTab === 'political' && (
          <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 className="section-title">
              <BookOpen size={22} className="text-cyan" />
              Hintergründe des Boykotts: Warum Müller & Nestlé meiden?
            </h2>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1rem' }}>
              Die Kritik an Theo Müller und dem Nestlé-Konzern hat sich über Jahrzehnte aufgebaut. Sie speist sich aus politischen Kontroversen, Steuervermeidungstaktiken, Ausbeutung von Ressourcen und marktbeherrschendem Druck auf globale Systeme.
            </p>

            <div className="controversy-list">
              <h3 style={{ fontSize: '1.25rem', color: '#ff4433', borderBottom: '1px solid rgba(255, 68, 51, 0.2)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-danger)' }}></span>
                Unternehmensgruppe Theo Müller Kontroversen
              </h3>
              {boycottReasons.filter(r => r.corporation === 'muller').map((reason, idx) => (
                <div key={idx} className="controversy-item">
                  <h4 className="controversy-title">
                    <AlertTriangle size={18} className="text-danger" />
                    {reason.title}
                  </h4>
                  <div className="controversy-summary">{reason.description}</div>
                  <p className="controversy-details">{reason.details}</p>
                </div>
              ))}

              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-nestle)', borderBottom: '1px solid rgba(0, 210, 255, 0.2)', paddingBottom: '0.5rem', marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-nestle)' }}></span>
                Nestlé-Konzern Kontroversen
              </h3>
              {boycottReasons.filter(r => r.corporation === 'nestle').map((reason, idx) => (
                <div key={idx} className="controversy-item nestle-controversy">
                  <h4 className="controversy-title">
                    <AlertTriangle size={18} style={{ color: 'var(--color-nestle)' }} />
                    {reason.title}
                  </h4>
                  <div className="controversy-summary">{reason.description}</div>
                  <p className="controversy-details">{reason.details}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Weiterführende, unabhängige Recherchen & Berichte:</h4>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
                <li>
                  <a href="https://www.tagesschau.de/inland/innenpolitik/afd-weidel-mueller-milch-100.html" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    Tagesschau: Theo Müller bestätigt Kontakte zu AfD-Spitze <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <a href="https://de.wikipedia.org/wiki/Unternehmensgruppe_Theo_M%C3%BCller#Kritik" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    Wikipedia: Detaillierte Kritik an der Müller-Unternehmensgruppe <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <a href="https://de.wikipedia.org/wiki/Nestl%C3%A9#Kritik_und_Kontroversen" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    Wikipedia: Nestlé Kritik und weltweite Kontroversen <ExternalLink size={12} />
                  </a>
                </li>
                <li>
                  <a href="https://www.spiegel.de/thema/nestle/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    Der Spiegel: Berichte & Recherchen zum Nestlé-Konzern <ExternalLink size={12} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* OVERLAY MODAL: DETAIL RESULT DISPLAY */}
      {activeResult && (
        <div className="result-backdrop" onClick={() => setActiveResult(null)}>
          <div className="result-card glass-card" style={{ padding: 0 }} onClick={(e) => e.stopPropagation()}>
            
            {/* Header dependent on status */}
            <div className={`result-header ${activeResult.status}`}>
              <button 
                style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                onClick={() => setActiveResult(null)}
              >
                <X size={20} />
              </button>

              <div className="result-icon-glow">
                {activeResult.status === 'hit' || activeResult.status === 'hit-nestle' ? <AlertTriangle size={28} /> : activeResult.status === 'free' ? <CheckCircle size={28} /> : <HelpCircle size={28} />}
              </div>

              <div className="result-title">
                {activeResult.status === 'hit' ? 'Achtung: Müller-Gruppe!' : activeResult.status === 'hit-nestle' ? 'Achtung: Nestlé-Konzern!' : activeResult.status === 'free' ? 'Super: Müller/Nestlé-Frei!' : 'Unbekanntes Produkt'}
              </div>

              <div className="result-subtitle">
                {activeResult.status === 'hit' ? 'Dieses Produkt steht in Verbindung zu Theo Müller.' : activeResult.status === 'hit-nestle' ? 'Dieses Produkt gehört zum Nestlé-Konzern.' : activeResult.status === 'free' ? 'Keine Verbindung zu Müller oder Nestlé gefunden.' : 'Prüfung unvollständig.'}
              </div>
            </div>

            {/* Modal Body */}
            <div className="result-body">
              
              {/* Product Info Block */}
              <div className="product-details">
                {activeResult.imageUrl ? (
                  <img src={activeResult.imageUrl} alt={activeResult.name} className="product-img" />
                ) : (
                  <div className="product-no-img">
                    <HelpCircle size={24} />
                  </div>
                )}
                <div className="product-meta">
                  <div className="product-name">{activeResult.name}</div>
                  <div className="product-brand">{activeResult.brand}</div>
                  <div className="product-barcode">EAN: {activeResult.barcode}</div>
                </div>
              </div>

              {/* Match Details / Explanation */}
              {(activeResult.status === 'hit' || activeResult.status === 'hit-nestle') && (
                <div className={`trigger-match-box ${activeResult.status}`}>
                  <div className="trigger-title">
                    <AlertTriangle size={16} />
                    Treffer-Begründung
                  </div>
                  <p className="trigger-text">
                    <strong>{activeResult.matchReason}</strong>
                  </p>
                </div>
              )}

              {activeResult.status === 'free' && (
                <div className="safe-info-box">
                  <div className="safe-title">
                    <CheckCircle size={16} />
                    Unbedenklich
                  </div>
                  <p className="safe-text">
                    Nach unseren Datenbank-Einträgen gehört weder die Marke noch das herstellende Werk zum Konzernumfeld der aktiven Boykott-Filter (Müller / Nestlé). Du kannst dieses Produkt beruhigt einkaufen!
                  </p>
                </div>
              )}

              {activeResult.status === 'notfound' && (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px dashed var(--border-subtle)', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <HelpCircle size={16} className="text-cyan" />
                    Produkt fehlt in OpenFoodFacts
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.45 }}>
                    Das Produkt wurde in der weltweiten Datenbank nicht gefunden. Du kannst es selbst visuell prüfen:
                    <br /><br />
                    Suche auf der Verpackung nach dem <strong>Genusstauglichkeitskennzeichen</strong> (ovales EU-Kürzel). Wenn dort eine der folgenden Betriebsnummern steht, handelt es sich um Müller-Ware:
                    <br />
                    <code style={{ color: 'var(--color-danger)', background: 'var(--color-danger-bg)', display: 'inline-block', padding: '0.2rem 0.4rem', borderRadius: '4px', marginTop: '0.5rem' }}>
                      DE BY 718 EG | DE SN 016 EG | DE BY 103 EG | DE NW 401 EG | DE BW 033 EG
                    </code>
                  </p>
                </div>
              )}

              {/* Alternatives grid (for hits only) */}
              {(activeResult.status === 'hit' || activeResult.status === 'hit-nestle') && (
                <div className="alternatives-container">
                  <h4 className="alt-title">
                    <Sparkles size={16} className="text-cyan" />
                    Empfohlene boykottfreie Alternativen:
                  </h4>
                  <div className="alt-grid">
                    {getAlternativesForProduct(activeResult).map((alt, idx) => (
                      <div key={idx} className="alt-card">
                        <div className="alt-card-header">
                          <div className="alt-name">{alt.name}</div>
                          <span className={`alt-badge ${alt.type}`}>
                            {alt.type === 'organic' ? 'Bio' : alt.type === 'regional' ? 'Regional' : alt.type === 'plant-based' ? 'Vegan' : 'Unabhängig'}
                          </span>
                        </div>
                        <p className="alt-desc">{alt.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="result-footer">
              <button className="btn btn-primary" onClick={() => setActiveResult(null)}>
                Schließen
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="app-footer">
        <p>
          Müller-Fascho-Buster — Für einen bewussten, demokratischen Konsum.
        </p>
        <p style={{ fontSize: '0.75rem' }}>
          Alle Daten stammen aus der kollaborativen Datenbank <a href="https://de.openfoodfacts.org" target="_blank" rel="noopener noreferrer">OpenFoodFacts</a> sowie öffentlich zugänglichen Betriebsinformationen.
        </p>
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.6 }}>
          Kein offizielles Angebot des Verbraucherschutzes. Made with <span className="app-footer-accent">♥</span> in Germany.
        </p>
      </footer>
    </div>
  );
}
